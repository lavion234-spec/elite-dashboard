/**
 * ============================================
 * ROTAS - DASHBOARD (KPIs)
 * ============================================
 */

const express = require('express');
const router = express.Router();
const {
  obterDashboard,
  obterEstatisticas,
} = require('../controllers/dashboardController');

// GET /api/dashboard - Obter todos os KPIs
router.get('/', obterDashboard);

// GET /api/dashboard/estatisticas - Obter estatísticas por período
router.get('/estatisticas', obterEstatisticas);

module.exports = router;
