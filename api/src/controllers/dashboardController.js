/**
 * ============================================
 * CONTROLLER - DASHBOARD (KPIs)
 * ============================================
 * Métricas e indicadores para o dashboard
 * ============================================
 */

const { query } = require('../config/db');

/**
 * Obter KPIs completos do dashboard
 * GET /api/dashboard
 */
const obterDashboard = async (req, res) => {
  try {
    // 1. Total de Vendas (soma de todos os pedidos)
    const [{ total_vendas }] = await query(`
      SELECT COALESCE(SUM(preco_total), 0) as total_vendas
      FROM pedidos
    `);
    
    // 2. Total de Gastos (custo × quantidade de todos os pedidos)
    const [{ total_gastos }] = await query(`
      SELECT COALESCE(SUM(pr.custo * p.quantidade), 0) as total_gastos
      FROM pedidos p
      INNER JOIN produtos pr ON p.produto_id = pr.id
    `);
    
    // 3. Total de Lucro (vendas - gastos)
    const total_lucro = parseFloat(total_vendas) - parseFloat(total_gastos);
    
    // 4. Top 5 produtos mais vendidos
    const top_produtos = await query(`
      SELECT 
        pr.id,
        pr.nome,
        pr.preco,
        pr.categoria_id,
        SUM(p.quantidade) as quantidade_vendida,
        SUM(p.preco_total) as valor_total,
        COUNT(p.id) as total_pedidos
      FROM produtos pr
      INNER JOIN pedidos p ON pr.id = p.produto_id
      GROUP BY pr.id
      ORDER BY quantidade_vendida DESC
      LIMIT 5
    `);
    
    // 5. Total de pedidos
    const [{ total_pedidos }] = await query(`
      SELECT COUNT(*) as total_pedidos FROM pedidos
    `);
    
    // 6. Total de vendedores
    const [{ total_vendedores }] = await query(`
      SELECT COUNT(*) as total_vendedores FROM vendedores
    `);
    
    // 7. Total de produtos cadastrados
    const [{ total_produtos }] = await query(`
      SELECT COUNT(*) as total_produtos FROM produtos
    `);
    
    // 8. Produtos com estoque baixo (< 10)
    const [{ produtos_estoque_baixo }] = await query(`
      SELECT COUNT(*) as produtos_estoque_baixo
      FROM produtos
      WHERE estoque < 10
    `);
    
    // 9. Valor total em estoque
    const [{ valor_estoque }] = await query(`
      SELECT COALESCE(SUM(preco * estoque), 0) as valor_estoque
      FROM produtos
    `);
    
    // 10. Ticket médio (valor médio por pedido)
    const [{ ticket_medio }] = await query(`
      SELECT COALESCE(AVG(preco_total), 0) as ticket_medio
      FROM pedidos
    `);
    
    // 11. Vendas dos últimos 7 dias
    const vendas_ultimos_7_dias = await query(`
      SELECT 
        DATE(created_at) as data,
        COUNT(*) as total_pedidos,
        SUM(preco_total) as valor_total
      FROM pedidos
      WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
      GROUP BY DATE(created_at)
      ORDER BY data DESC
    `);
    
    // 12. Top 5 vendedores
    const top_vendedores = await query(`
      SELECT 
        v.id,
        v.nome,
        v.email,
        COUNT(p.id) as total_vendas,
        SUM(p.preco_total) as valor_total
      FROM vendedores v
      LEFT JOIN pedidos p ON v.id = p.vendedor_id
      GROUP BY v.id
      ORDER BY valor_total DESC
      LIMIT 5
    `);
    
    return res.status(200).json({
      success: true,
      data: {
        resumo: {
          total_vendas: parseFloat(total_vendas).toFixed(2),
          total_gastos: parseFloat(total_gastos).toFixed(2),
          total_lucro: total_lucro.toFixed(2),
          margem_lucro: total_vendas > 0 
            ? ((total_lucro / parseFloat(total_vendas)) * 100).toFixed(2)
            : '0.00',
          ticket_medio: parseFloat(ticket_medio).toFixed(2),
        },
        contadores: {
          total_pedidos: parseInt(total_pedidos),
          total_vendedores: parseInt(total_vendedores),
          total_produtos: parseInt(total_produtos),
          produtos_estoque_baixo: parseInt(produtos_estoque_baixo),
        },
        estoque: {
          valor_total: parseFloat(valor_estoque).toFixed(2),
          produtos_estoque_baixo: parseInt(produtos_estoque_baixo),
        },
        top_produtos: top_produtos.map(p => ({
          id: p.id,
          nome: p.nome,
          preco: parseFloat(p.preco).toFixed(2),
          categoria_id: p.categoria_id,
          quantidade_vendida: parseInt(p.quantidade_vendida),
          valor_total: parseFloat(p.valor_total).toFixed(2),
          total_pedidos: parseInt(p.total_pedidos),
        })),
        top_vendedores: top_vendedores.map(v => ({
          id: v.id,
          nome: v.nome,
          email: v.email,
          total_vendas: parseInt(v.total_vendas),
          valor_total: parseFloat(v.valor_total || 0).toFixed(2),
        })),
        vendas_ultimos_7_dias: vendas_ultimos_7_dias.map(v => ({
          data: v.data,
          total_pedidos: parseInt(v.total_pedidos),
          valor_total: parseFloat(v.valor_total).toFixed(2),
        })),
      },
    });
  } catch (error) {
    console.error('Erro ao obter dashboard:', error);
    return res.status(500).json({
      success: false,
      message: 'Erro ao obter dados do dashboard',
      error: error.message,
    });
  }
};

/**
 * Obter estatísticas por período
 * GET /api/dashboard/estatisticas
 */
const obterEstatisticas = async (req, res) => {
  try {
    const { periodo = '30' } = req.query; // Dias
    
    const diasPeriodo = parseInt(periodo);
    
    // Vendas por dia no período
    const vendasPorDia = await query(`
      SELECT 
        DATE(created_at) as data,
        COUNT(*) as total_pedidos,
        SUM(quantidade) as total_quantidade,
        SUM(preco_total) as valor_total
      FROM pedidos
      WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL ? DAY)
      GROUP BY DATE(created_at)
      ORDER BY data ASC
    `, [diasPeriodo]);
    
    // Comparação com período anterior
    const [comparacao] = await query(`
      SELECT 
        SUM(CASE WHEN created_at >= DATE_SUB(CURDATE(), INTERVAL ? DAY) 
            THEN preco_total ELSE 0 END) as vendas_periodo_atual,
        SUM(CASE WHEN created_at >= DATE_SUB(CURDATE(), INTERVAL ? DAY) 
            AND created_at < DATE_SUB(CURDATE(), INTERVAL ? DAY)
            THEN preco_total ELSE 0 END) as vendas_periodo_anterior
      FROM pedidos
    `, [diasPeriodo, diasPeriodo * 2, diasPeriodo]);
    
    const crescimento = comparacao.vendas_periodo_anterior > 0
      ? ((comparacao.vendas_periodo_atual - comparacao.vendas_periodo_anterior) / 
         comparacao.vendas_periodo_anterior * 100).toFixed(2)
      : '0.00';
    
    // Produtos mais lucrativos
    const produtosLucrativos = await query(`
      SELECT 
        pr.id,
        pr.nome,
        pr.preco,
        pr.custo,
        SUM(p.quantidade) as quantidade_vendida,
        SUM(p.preco_total) as receita_total,
        SUM(pr.custo * p.quantidade) as custo_total,
        (SUM(p.preco_total) - SUM(pr.custo * p.quantidade)) as lucro_total
      FROM produtos pr
      INNER JOIN pedidos p ON pr.id = p.produto_id
      WHERE p.created_at >= DATE_SUB(CURDATE(), INTERVAL ? DAY)
      GROUP BY pr.id
      ORDER BY lucro_total DESC
      LIMIT 10
    `, [diasPeriodo]);
    
    return res.status(200).json({
      success: true,
      data: {
        periodo: {
          dias: diasPeriodo,
          inicio: vendasPorDia.length > 0 ? vendasPorDia[0].data : null,
          fim: vendasPorDia.length > 0 ? vendasPorDia[vendasPorDia.length - 1].data : null,
        },
        comparacao: {
          vendas_periodo_atual: parseFloat(comparacao.vendas_periodo_atual || 0).toFixed(2),
          vendas_periodo_anterior: parseFloat(comparacao.vendas_periodo_anterior || 0).toFixed(2),
          crescimento: crescimento,
        },
        vendas_por_dia: vendasPorDia.map(v => ({
          data: v.data,
          total_pedidos: parseInt(v.total_pedidos),
          total_quantidade: parseInt(v.total_quantidade),
          valor_total: parseFloat(v.valor_total).toFixed(2),
        })),
        produtos_lucrativos: produtosLucrativos.map(p => ({
          id: p.id,
          nome: p.nome,
          preco: parseFloat(p.preco).toFixed(2),
          custo: parseFloat(p.custo).toFixed(2),
          quantidade_vendida: parseInt(p.quantidade_vendida),
          receita_total: parseFloat(p.receita_total).toFixed(2),
          custo_total: parseFloat(p.custo_total).toFixed(2),
          lucro_total: parseFloat(p.lucro_total).toFixed(2),
          margem_lucro: ((parseFloat(p.lucro_total) / parseFloat(p.receita_total)) * 100).toFixed(2),
        })),
      },
    });
  } catch (error) {
    console.error('Erro ao obter estatísticas:', error);
    return res.status(500).json({
      success: false,
      message: 'Erro ao obter estatísticas',
      error: error.message,
    });
  }
};

module.exports = {
  obterDashboard,
  obterEstatisticas,
};
