/**
 * ============================================
 * SERVIDOR EXPRESS - API REST
 * ============================================
 * Dashboard Administrativo
 * Node.js + Express + MySQL
 * ============================================
 */

// Carregar variáveis de ambiente PRIMEIRO
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { testConnection } = require('./config/db');

// Importar rotas
const produtosRoutes = require('./routes/produtosRoutes');
const vendedoresRoutes = require('./routes/vendedoresRoutes');
const pedidosRoutes = require('./routes/pedidosRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

// Criar aplicação Express
const app = express();

// Porta do servidor
const PORT = process.env.PORT || 3000;

// ============================================
// MIDDLEWARES
// ============================================

// CORS - Liberar acesso de qualquer origem
app.use(cors());

// Parse JSON no body das requisições
app.use(express.json());

// Parse URL-encoded
app.use(express.urlencoded({ extended: true }));

// Log de requisições
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.path}`);
  next();
});

// ============================================
// ROTAS
// ============================================

// Rota raiz - Informações da API
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'API Dashboard Administrativo',
    version: '1.0.0',
    endpoints: {
      produtos: '/api/produtos',
      vendedores: '/api/vendedores',
      pedidos: '/api/pedidos',
      dashboard: '/api/dashboard',
      health: '/health',
    },
    documentation: '/api/docs',
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({
    success: true,
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Rotas da API
app.use('/api/produtos', produtosRoutes);
app.use('/api/vendedores', vendedoresRoutes);
app.use('/api/pedidos', pedidosRoutes);
app.use('/api/dashboard', dashboardRoutes);

// ============================================
// TRATAMENTO DE ERROS
// ============================================

// Rota não encontrada (404)
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Rota não encontrada',
    path: req.path,
    method: req.method,
  });
});

// Erro genérico (500)
app.use((error, req, res, next) => {
  console.error('❌ Erro não tratado:', error);
  res.status(500).json({
    success: false,
    message: 'Erro interno do servidor',
    error: process.env.NODE_ENV === 'production' ? undefined : error.message,
  });
});

// ============================================
// INICIAR SERVIDOR
// ============================================

const startServer = async () => {
  try {
    // Testar conexão com banco de dados
    console.log('\n🔄 Testando conexão com banco de dados...');
    const dbConnected = await testConnection();
    
    if (!dbConnected) {
      console.error('\n❌ Não foi possível conectar ao banco de dados');
      console.error('   A API será iniciada, mas algumas funcionalidades não funcionarão\n');
    }
    
    // Iniciar servidor
    app.listen(PORT, () => {
      console.log('\n' + '='.repeat(50));
      console.log('🚀 Servidor API iniciado com sucesso!');
      console.log('='.repeat(50));
      console.log(`📡 URL: http://localhost:${PORT}`);
      console.log(`📊 Dashboard: http://localhost:${PORT}/api/dashboard`);
      console.log(`🏥 Health Check: http://localhost:${PORT}/health`);
      console.log('='.repeat(50));
      console.log('\n📋 Endpoints disponíveis:');
      console.log('   • GET    /api/produtos');
      console.log('   • POST   /api/produtos');
      console.log('   • PUT    /api/produtos/:id');
      console.log('   • DELETE /api/produtos/:id');
      console.log('');
      console.log('   • GET    /api/vendedores');
      console.log('   • POST   /api/vendedores');
      console.log('   • PUT    /api/vendedores/:id');
      console.log('   • DELETE /api/vendedores/:id');
      console.log('');
      console.log('   • GET    /api/pedidos');
      console.log('   • POST   /api/pedidos');
      console.log('   • PUT    /api/pedidos/:id');
      console.log('   • DELETE /api/pedidos/:id');
      console.log('');
      console.log('   • GET    /api/dashboard');
      console.log('   • GET    /api/dashboard/estatisticas');
      console.log('\n' + '='.repeat(50) + '\n');
      console.log('💡 Pressione CTRL+C para parar o servidor\n');
    });
  } catch (error) {
    console.error('\n❌ Erro ao iniciar servidor:', error);
    process.exit(1);
  }
};

// Iniciar
startServer();

// Tratamento de encerramento gracioso
process.on('SIGINT', () => {
  console.log('\n\n🛑 Encerrando servidor...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n\n🛑 Encerrando servidor...');
  process.exit(0);
});

module.exports = app;
