/**
 * ============================================
 * CONTROLLER - PRODUTOS
 * ============================================
 * Gerenciamento completo de produtos
 * ============================================
 */

const { query } = require('../config/db');

/**
 * Listar todos os produtos
 * GET /api/produtos
 */
const listarProdutos = async (req, res) => {
  try {
    const { categoria_id, search, limit = 100, offset = 0 } = req.query;
    
    let sql = `
      SELECT 
        id,
        nome,
        descricao,
        preco,
        estoque,
        categoria_id,
        custo,
        imagem,
        created_at
      FROM produtos
      WHERE 1=1
    `;
    
    const params = [];
    
    // Filtro por categoria
    if (categoria_id) {
      sql += ' AND categoria_id = ?';
      params.push(parseInt(categoria_id));
    }
    
    // Busca por nome ou descrição
    if (search) {
      sql += ' AND (nome LIKE ? OR descricao LIKE ?)';
      params.push(`%${search}%`, `%${search}%`);
    }
    
    sql += ` ORDER BY created_at DESC LIMIT ${parseInt(limit)} OFFSET ${parseInt(offset)}`;
    
    const produtos = await query(sql, params);
    
    // Contar total de produtos
    const [{ total }] = await query('SELECT COUNT(*) as total FROM produtos');
    
    return res.status(200).json({
      success: true,
      data: produtos,
      pagination: {
        total,
        limit: parseInt(limit),
        offset: parseInt(offset),
        returned: produtos.length,
      },
    });
  } catch (error) {
    console.error('Erro ao listar produtos:', error);
    return res.status(500).json({
      success: false,
      message: 'Erro ao listar produtos',
      error: error.message,
    });
  }
};

/**
 * Buscar produto por ID
 * GET /api/produtos/:id
 */
const buscarProduto = async (req, res) => {
  try {
    const { id } = req.params;
    
    const sql = `
      SELECT 
        id,
        nome,
        descricao,
        preco,
        estoque,
        categoria_id,
        custo,
        imagem,
        created_at
      FROM produtos
      WHERE id = ?
    `;
    
    const produtos = await query(sql, [id]);
    
    if (produtos.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Produto não encontrado',
      });
    }
    
    return res.status(200).json({
      success: true,
      data: produtos[0],
    });
  } catch (error) {
    console.error('Erro ao buscar produto:', error);
    return res.status(500).json({
      success: false,
      message: 'Erro ao buscar produto',
      error: error.message,
    });
  }
};

/**
 * Criar novo produto
 * POST /api/produtos
 */
const criarProduto = async (req, res) => {
  try {
    const {
      nome,
      descricao,
      preco,
      estoque = 0,
      categoria_id,
      custo = 0,
      imagem = null,
    } = req.body;
    
    // Validações
    if (!nome || !preco) {
      return res.status(400).json({
        success: false,
        message: 'Nome e preço são obrigatórios',
      });
    }
    
    if (preco < 0 || custo < 0 || estoque < 0) {
      return res.status(400).json({
        success: false,
        message: 'Valores negativos não são permitidos',
      });
    }
    
    const sql = `
      INSERT INTO produtos (
        nome, descricao, preco, estoque, categoria_id, custo, imagem
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    
    const result = await query(sql, [
      nome,
      descricao || null,
      parseFloat(preco),
      parseInt(estoque),
      categoria_id || null,
      parseFloat(custo),
      imagem,
    ]);
    
    return res.status(201).json({
      success: true,
      message: 'Produto criado com sucesso',
      data: {
        id: result.insertId,
        nome,
        preco,
        estoque,
      },
    });
  } catch (error) {
    console.error('Erro ao criar produto:', error);
    return res.status(500).json({
      success: false,
      message: 'Erro ao criar produto',
      error: error.message,
    });
  }
};

/**
 * Atualizar produto
 * PUT /api/produtos/:id
 */
const atualizarProduto = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      nome,
      descricao,
      preco,
      estoque,
      categoria_id,
      custo,
      imagem,
    } = req.body;
    
    // Verificar se produto existe
    const produtoExiste = await query('SELECT id FROM produtos WHERE id = ?', [id]);
    
    if (produtoExiste.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Produto não encontrado',
      });
    }
    
    // Validações
    if (preco !== undefined && preco < 0) {
      return res.status(400).json({
        success: false,
        message: 'Preço não pode ser negativo',
      });
    }
    
    if (estoque !== undefined && estoque < 0) {
      return res.status(400).json({
        success: false,
        message: 'Estoque não pode ser negativo',
      });
    }
    
    // Construir query dinâmica
    const campos = [];
    const valores = [];
    
    if (nome !== undefined) {
      campos.push('nome = ?');
      valores.push(nome);
    }
    if (descricao !== undefined) {
      campos.push('descricao = ?');
      valores.push(descricao);
    }
    if (preco !== undefined) {
      campos.push('preco = ?');
      valores.push(parseFloat(preco));
    }
    if (estoque !== undefined) {
      campos.push('estoque = ?');
      valores.push(parseInt(estoque));
    }
    if (categoria_id !== undefined) {
      campos.push('categoria_id = ?');
      valores.push(categoria_id);
    }
    if (custo !== undefined) {
      campos.push('custo = ?');
      valores.push(parseFloat(custo));
    }
    if (imagem !== undefined) {
      campos.push('imagem = ?');
      valores.push(imagem);
    }
    
    if (campos.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Nenhum campo para atualizar',
      });
    }
    
    valores.push(id);
    
    const sql = `UPDATE produtos SET ${campos.join(', ')} WHERE id = ?`;
    
    await query(sql, valores);
    
    return res.status(200).json({
      success: true,
      message: 'Produto atualizado com sucesso',
    });
  } catch (error) {
    console.error('Erro ao atualizar produto:', error);
    return res.status(500).json({
      success: false,
      message: 'Erro ao atualizar produto',
      error: error.message,
    });
  }
};

/**
 * Remover produto
 * DELETE /api/produtos/:id
 */
const removerProduto = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Verificar se produto existe
    const produtoExiste = await query('SELECT id FROM produtos WHERE id = ?', [id]);
    
    if (produtoExiste.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Produto não encontrado',
      });
    }
    
    // Verificar se produto tem pedidos
    const temPedidos = await query(
      'SELECT id FROM pedidos WHERE produto_id = ? LIMIT 1',
      [id]
    );
    
    if (temPedidos.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Não é possível remover produto com pedidos associados',
      });
    }
    
    await query('DELETE FROM produtos WHERE id = ?', [id]);
    
    return res.status(200).json({
      success: true,
      message: 'Produto removido com sucesso',
    });
  } catch (error) {
    console.error('Erro ao remover produto:', error);
    return res.status(500).json({
      success: false,
      message: 'Erro ao remover produto',
      error: error.message,
    });
  }
};

module.exports = {
  listarProdutos,
  buscarProduto,
  criarProduto,
  atualizarProduto,
  removerProduto,
};
