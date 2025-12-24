/**
 * ============================================
 * CONTROLLER - PEDIDOS
 * ============================================
 * Gerenciamento completo de pedidos
 * Atualização automática de estoque
 * ============================================
 */

const { query, pool } = require('../config/db');

/**
 * Listar todos os pedidos
 * GET /api/pedidos
 */
const listarPedidos = async (req, res) => {
  try {
    const { produto_id, vendedor_id, limit = 100, offset = 0 } = req.query;
    
    let sql = `
      SELECT 
        p.id,
        p.produto_id,
        p.vendedor_id,
        p.quantidade,
        p.preco_total,
        p.created_at,
        pr.nome as produto_nome,
        pr.preco as produto_preco,
        v.nome as vendedor_nome,
        v.email as vendedor_email
      FROM pedidos p
      INNER JOIN produtos pr ON p.produto_id = pr.id
      INNER JOIN vendedores v ON p.vendedor_id = v.id
      WHERE 1=1
    `;
    
    const params = [];
    
    // Filtro por produto
    if (produto_id) {
      sql += ' AND p.produto_id = ?';
      params.push(produto_id);
    }
    
    // Filtro por vendedor
    if (vendedor_id) {
      sql += ' AND p.vendedor_id = ?';
      params.push(vendedor_id);
    }
    
    sql += ' ORDER BY p.created_at DESC LIMIT ? OFFSET ?';
    params.push(parseInt(limit), parseInt(offset));
    
    const pedidos = await query(sql, params);
    
    // Contar total de pedidos
    const [{ total }] = await query('SELECT COUNT(*) as total FROM pedidos');
    
    return res.status(200).json({
      success: true,
      data: pedidos,
      pagination: {
        total,
        limit: parseInt(limit),
        offset: parseInt(offset),
        returned: pedidos.length,
      },
    });
  } catch (error) {
    console.error('Erro ao listar pedidos:', error);
    return res.status(500).json({
      success: false,
      message: 'Erro ao listar pedidos',
      error: error.message,
    });
  }
};

/**
 * Buscar pedido por ID
 * GET /api/pedidos/:id
 */
const buscarPedido = async (req, res) => {
  try {
    const { id } = req.params;
    
    const sql = `
      SELECT 
        p.id,
        p.produto_id,
        p.vendedor_id,
        p.quantidade,
        p.preco_total,
        p.created_at,
        pr.nome as produto_nome,
        pr.preco as produto_preco,
        pr.custo as produto_custo,
        pr.estoque as produto_estoque,
        v.nome as vendedor_nome,
        v.email as vendedor_email,
        v.telefone as vendedor_telefone
      FROM pedidos p
      INNER JOIN produtos pr ON p.produto_id = pr.id
      INNER JOIN vendedores v ON p.vendedor_id = v.id
      WHERE p.id = ?
    `;
    
    const pedidos = await query(sql, [id]);
    
    if (pedidos.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Pedido não encontrado',
      });
    }
    
    return res.status(200).json({
      success: true,
      data: pedidos[0],
    });
  } catch (error) {
    console.error('Erro ao buscar pedido:', error);
    return res.status(500).json({
      success: false,
      message: 'Erro ao buscar pedido',
      error: error.message,
    });
  }
};

/**
 * Criar novo pedido
 * POST /api/pedidos
 * Atualiza o estoque automaticamente
 */
const criarPedido = async (req, res) => {
  const connection = await pool.getConnection();
  
  try {
    await connection.beginTransaction();
    
    const { produto_id, vendedor_id, quantidade } = req.body;
    
    // Validações
    if (!produto_id || !vendedor_id || !quantidade) {
      await connection.rollback();
      return res.status(400).json({
        success: false,
        message: 'produto_id, vendedor_id e quantidade são obrigatórios',
      });
    }
    
    if (quantidade <= 0) {
      await connection.rollback();
      return res.status(400).json({
        success: false,
        message: 'Quantidade deve ser maior que zero',
      });
    }
    
    // Verificar se produto existe e buscar dados
    const [produtos] = await connection.execute(
      'SELECT id, nome, preco, estoque FROM produtos WHERE id = ?',
      [produto_id]
    );
    
    if (produtos.length === 0) {
      await connection.rollback();
      return res.status(404).json({
        success: false,
        message: 'Produto não encontrado',
      });
    }
    
    const produto = produtos[0];
    
    // Verificar se vendedor existe
    const [vendedores] = await connection.execute(
      'SELECT id, nome FROM vendedores WHERE id = ?',
      [vendedor_id]
    );
    
    if (vendedores.length === 0) {
      await connection.rollback();
      return res.status(404).json({
        success: false,
        message: 'Vendedor não encontrado',
      });
    }
    
    // Verificar estoque disponível
    if (produto.estoque < quantidade) {
      await connection.rollback();
      return res.status(400).json({
        success: false,
        message: `Estoque insuficiente. Disponível: ${produto.estoque}`,
        estoque_disponivel: produto.estoque,
      });
    }
    
    // Calcular preço total
    const preco_total = parseFloat(produto.preco) * parseInt(quantidade);
    
    // Criar pedido
    const [resultPedido] = await connection.execute(
      `INSERT INTO pedidos (produto_id, vendedor_id, quantidade, preco_total)
       VALUES (?, ?, ?, ?)`,
      [produto_id, vendedor_id, parseInt(quantidade), preco_total]
    );
    
    // Atualizar estoque do produto
    const novoEstoque = produto.estoque - quantidade;
    await connection.execute(
      'UPDATE produtos SET estoque = ? WHERE id = ?',
      [novoEstoque, produto_id]
    );
    
    await connection.commit();
    
    return res.status(201).json({
      success: true,
      message: 'Pedido criado com sucesso',
      data: {
        id: resultPedido.insertId,
        produto_id,
        produto_nome: produto.nome,
        vendedor_id,
        vendedor_nome: vendedores[0].nome,
        quantidade: parseInt(quantidade),
        preco_unitario: parseFloat(produto.preco),
        preco_total,
        estoque_anterior: produto.estoque,
        estoque_atual: novoEstoque,
      },
    });
  } catch (error) {
    await connection.rollback();
    console.error('Erro ao criar pedido:', error);
    return res.status(500).json({
      success: false,
      message: 'Erro ao criar pedido',
      error: error.message,
    });
  } finally {
    connection.release();
  }
};

/**
 * Atualizar pedido
 * PUT /api/pedidos/:id
 */
const atualizarPedido = async (req, res) => {
  const connection = await pool.getConnection();
  
  try {
    await connection.beginTransaction();
    
    const { id } = req.params;
    const { quantidade } = req.body;
    
    if (!quantidade || quantidade <= 0) {
      await connection.rollback();
      return res.status(400).json({
        success: false,
        message: 'Quantidade inválida',
      });
    }
    
    // Buscar pedido atual
    const [pedidos] = await connection.execute(
      `SELECT p.id, p.produto_id, p.quantidade, pr.preco, pr.estoque
       FROM pedidos p
       INNER JOIN produtos pr ON p.produto_id = pr.id
       WHERE p.id = ?`,
      [id]
    );
    
    if (pedidos.length === 0) {
      await connection.rollback();
      return res.status(404).json({
        success: false,
        message: 'Pedido não encontrado',
      });
    }
    
    const pedido = pedidos[0];
    const quantidadeAnterior = pedido.quantidade;
    const diferenca = quantidade - quantidadeAnterior;
    
    // Verificar estoque se aumentar quantidade
    if (diferenca > 0 && pedido.estoque < diferenca) {
      await connection.rollback();
      return res.status(400).json({
        success: false,
        message: `Estoque insuficiente. Disponível: ${pedido.estoque}`,
      });
    }
    
    // Atualizar pedido
    const novoPrecoTotal = parseFloat(pedido.preco) * parseInt(quantidade);
    await connection.execute(
      'UPDATE pedidos SET quantidade = ?, preco_total = ? WHERE id = ?',
      [parseInt(quantidade), novoPrecoTotal, id]
    );
    
    // Atualizar estoque
    const novoEstoque = pedido.estoque - diferenca;
    await connection.execute(
      'UPDATE produtos SET estoque = ? WHERE id = ?',
      [novoEstoque, pedido.produto_id]
    );
    
    await connection.commit();
    
    return res.status(200).json({
      success: true,
      message: 'Pedido atualizado com sucesso',
      data: {
        id,
        quantidade_anterior: quantidadeAnterior,
        quantidade_nova: parseInt(quantidade),
        preco_total: novoPrecoTotal,
        estoque_atualizado: novoEstoque,
      },
    });
  } catch (error) {
    await connection.rollback();
    console.error('Erro ao atualizar pedido:', error);
    return res.status(500).json({
      success: false,
      message: 'Erro ao atualizar pedido',
      error: error.message,
    });
  } finally {
    connection.release();
  }
};

/**
 * Remover pedido
 * DELETE /api/pedidos/:id
 * Restaura o estoque
 */
const removerPedido = async (req, res) => {
  const connection = await pool.getConnection();
  
  try {
    await connection.beginTransaction();
    
    const { id } = req.params;
    
    // Buscar pedido
    const [pedidos] = await connection.execute(
      'SELECT id, produto_id, quantidade FROM pedidos WHERE id = ?',
      [id]
    );
    
    if (pedidos.length === 0) {
      await connection.rollback();
      return res.status(404).json({
        success: false,
        message: 'Pedido não encontrado',
      });
    }
    
    const pedido = pedidos[0];
    
    // Restaurar estoque
    await connection.execute(
      'UPDATE produtos SET estoque = estoque + ? WHERE id = ?',
      [pedido.quantidade, pedido.produto_id]
    );
    
    // Deletar pedido
    await connection.execute('DELETE FROM pedidos WHERE id = ?', [id]);
    
    await connection.commit();
    
    return res.status(200).json({
      success: true,
      message: 'Pedido removido com sucesso',
      data: {
        estoque_restaurado: pedido.quantidade,
      },
    });
  } catch (error) {
    await connection.rollback();
    console.error('Erro ao remover pedido:', error);
    return res.status(500).json({
      success: false,
      message: 'Erro ao remover pedido',
      error: error.message,
    });
  } finally {
    connection.release();
  }
};

module.exports = {
  listarPedidos,
  buscarPedido,
  criarPedido,
  atualizarPedido,
  removerPedido,
};
