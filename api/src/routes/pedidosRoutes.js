/**
 * ============================================
 * ROTAS - PEDIDOS
 * ============================================
 */

const express = require('express');
const router = express.Router();
const {
  listarPedidos,
  buscarPedido,
  criarPedido,
  atualizarPedido,
  removerPedido,
} = require('../controllers/pedidosController');

// GET /api/pedidos - Listar todos os pedidos
router.get('/', listarPedidos);

// GET /api/pedidos/:id - Buscar pedido por ID
router.get('/:id', buscarPedido);

// POST /api/pedidos - Criar novo pedido (atualiza estoque automaticamente)
router.post('/', criarPedido);

// PUT /api/pedidos/:id - Atualizar pedido
router.put('/:id', atualizarPedido);

// DELETE /api/pedidos/:id - Remover pedido (restaura estoque)
router.delete('/:id', removerPedido);

module.exports = router;
