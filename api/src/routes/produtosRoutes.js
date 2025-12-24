/**
 * ============================================
 * ROTAS - PRODUTOS
 * ============================================
 */

const express = require('express');
const router = express.Router();
const {
  listarProdutos,
  buscarProduto,
  criarProduto,
  atualizarProduto,
  removerProduto,
} = require('../controllers/produtosController');

// GET /api/produtos - Listar todos os produtos
router.get('/', listarProdutos);

// GET /api/produtos/:id - Buscar produto por ID
router.get('/:id', buscarProduto);

// POST /api/produtos - Criar novo produto
router.post('/', criarProduto);

// PUT /api/produtos/:id - Atualizar produto
router.put('/:id', atualizarProduto);

// DELETE /api/produtos/:id - Remover produto
router.delete('/:id', removerProduto);

module.exports = router;
