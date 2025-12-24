/**
 * ============================================
 * ROTAS - VENDEDORES
 * ============================================
 */

const express = require('express');
const router = express.Router();
const {
  listarVendedores,
  buscarVendedor,
  criarVendedor,
  atualizarVendedor,
  removerVendedor,
} = require('../controllers/vendedoresController');

// GET /api/vendedores - Listar todos os vendedores
router.get('/', listarVendedores);

// GET /api/vendedores/:id - Buscar vendedor por ID
router.get('/:id', buscarVendedor);

// POST /api/vendedores - Criar novo vendedor
router.post('/', criarVendedor);

// PUT /api/vendedores/:id - Atualizar vendedor
router.put('/:id', atualizarVendedor);

// DELETE /api/vendedores/:id - Remover vendedor
router.delete('/:id', removerVendedor);

module.exports = router;
