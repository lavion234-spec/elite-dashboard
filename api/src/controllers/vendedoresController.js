/**
 * ============================================
 * CONTROLLER - VENDEDORES
 * ============================================
 * Gerenciamento completo de vendedores
 * ============================================
 */

const { query } = require('../config/db');

/**
 * Listar todos os vendedores
 * GET /api/vendedores
 */
const listarVendedores = async (req, res) => {
  try {
    const { search, limit = 100, offset = 0 } = req.query;
    
    let sql = `
      SELECT 
        id,
        nome,
        email,
        telefone,
        created_at
      FROM vendedores
      WHERE 1=1
    `;
    
    const params = [];
    
    // Busca por nome ou email
    if (search) {
      sql += ' AND (nome LIKE ? OR email LIKE ?)';
      params.push(`%${search}%`, `%${search}%`);
    }
    
    sql += ' ORDER BY nome ASC LIMIT ? OFFSET ?';
    params.push(parseInt(limit), parseInt(offset));
    
    const vendedores = await query(sql, params);
    
    // Contar total de vendedores
    const [{ total }] = await query('SELECT COUNT(*) as total FROM vendedores');
    
    return res.status(200).json({
      success: true,
      data: vendedores,
      pagination: {
        total,
        limit: parseInt(limit),
        offset: parseInt(offset),
        returned: vendedores.length,
      },
    });
  } catch (error) {
    console.error('Erro ao listar vendedores:', error);
    return res.status(500).json({
      success: false,
      message: 'Erro ao listar vendedores',
      error: error.message,
    });
  }
};

/**
 * Buscar vendedor por ID
 * GET /api/vendedores/:id
 */
const buscarVendedor = async (req, res) => {
  try {
    const { id } = req.params;
    
    const sql = `
      SELECT 
        v.id,
        v.nome,
        v.email,
        v.telefone,
        v.created_at,
        COUNT(p.id) as total_vendas,
        COALESCE(SUM(p.preco_total), 0) as valor_total_vendas
      FROM vendedores v
      LEFT JOIN pedidos p ON v.id = p.vendedor_id
      WHERE v.id = ?
      GROUP BY v.id
    `;
    
    const vendedores = await query(sql, [id]);
    
    if (vendedores.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Vendedor não encontrado',
      });
    }
    
    return res.status(200).json({
      success: true,
      data: vendedores[0],
    });
  } catch (error) {
    console.error('Erro ao buscar vendedor:', error);
    return res.status(500).json({
      success: false,
      message: 'Erro ao buscar vendedor',
      error: error.message,
    });
  }
};

/**
 * Criar novo vendedor
 * POST /api/vendedores
 */
const criarVendedor = async (req, res) => {
  try {
    const { nome, email, telefone } = req.body;
    
    // Validações
    if (!nome || !email) {
      return res.status(400).json({
        success: false,
        message: 'Nome e email são obrigatórios',
      });
    }
    
    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Email inválido',
      });
    }
    
    // Verificar se email já existe
    const emailExiste = await query(
      'SELECT id FROM vendedores WHERE email = ?',
      [email]
    );
    
    if (emailExiste.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Email já cadastrado',
      });
    }
    
    const sql = `
      INSERT INTO vendedores (nome, email, telefone)
      VALUES (?, ?, ?)
    `;
    
    const result = await query(sql, [nome, email, telefone || null]);
    
    return res.status(201).json({
      success: true,
      message: 'Vendedor criado com sucesso',
      data: {
        id: result.insertId,
        nome,
        email,
        telefone,
      },
    });
  } catch (error) {
    console.error('Erro ao criar vendedor:', error);
    return res.status(500).json({
      success: false,
      message: 'Erro ao criar vendedor',
      error: error.message,
    });
  }
};

/**
 * Atualizar vendedor
 * PUT /api/vendedores/:id
 */
const atualizarVendedor = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, email, telefone } = req.body;
    
    // Verificar se vendedor existe
    const vendedorExiste = await query(
      'SELECT id FROM vendedores WHERE id = ?',
      [id]
    );
    
    if (vendedorExiste.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Vendedor não encontrado',
      });
    }
    
    // Validar email se fornecido
    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          success: false,
          message: 'Email inválido',
        });
      }
      
      // Verificar se email já existe em outro vendedor
      const emailExiste = await query(
        'SELECT id FROM vendedores WHERE email = ? AND id != ?',
        [email, id]
      );
      
      if (emailExiste.length > 0) {
        return res.status(400).json({
          success: false,
          message: 'Email já cadastrado para outro vendedor',
        });
      }
    }
    
    // Construir query dinâmica
    const campos = [];
    const valores = [];
    
    if (nome !== undefined) {
      campos.push('nome = ?');
      valores.push(nome);
    }
    if (email !== undefined) {
      campos.push('email = ?');
      valores.push(email);
    }
    if (telefone !== undefined) {
      campos.push('telefone = ?');
      valores.push(telefone);
    }
    
    if (campos.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Nenhum campo para atualizar',
      });
    }
    
    valores.push(id);
    
    const sql = `UPDATE vendedores SET ${campos.join(', ')} WHERE id = ?`;
    
    await query(sql, valores);
    
    return res.status(200).json({
      success: true,
      message: 'Vendedor atualizado com sucesso',
    });
  } catch (error) {
    console.error('Erro ao atualizar vendedor:', error);
    return res.status(500).json({
      success: false,
      message: 'Erro ao atualizar vendedor',
      error: error.message,
    });
  }
};

/**
 * Remover vendedor
 * DELETE /api/vendedores/:id
 */
const removerVendedor = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Verificar se vendedor existe
    const vendedorExiste = await query(
      'SELECT id FROM vendedores WHERE id = ?',
      [id]
    );
    
    if (vendedorExiste.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Vendedor não encontrado',
      });
    }
    
    // Verificar se vendedor tem pedidos
    const temPedidos = await query(
      'SELECT id FROM pedidos WHERE vendedor_id = ? LIMIT 1',
      [id]
    );
    
    if (temPedidos.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Não é possível remover vendedor com pedidos associados',
      });
    }
    
    await query('DELETE FROM vendedores WHERE id = ?', [id]);
    
    return res.status(200).json({
      success: true,
      message: 'Vendedor removido com sucesso',
    });
  } catch (error) {
    console.error('Erro ao remover vendedor:', error);
    return res.status(500).json({
      success: false,
      message: 'Erro ao remover vendedor',
      error: error.message,
    });
  }
};

module.exports = {
  listarVendedores,
  buscarVendedor,
  criarVendedor,
  atualizarVendedor,
  removerVendedor,
};
