/**
 * ============================================
 * CONFIGURAÇÃO DO BANCO DE DADOS - MySQL
 * ============================================
 * Conexão com MySQL usando mysql2/promise
 * Pool de conexões para melhor performance
 * ============================================
 */

const mysql = require('mysql2/promise');

// Configuração do Pool de Conexões
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'dashboard_api',
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

/**
 * Testa a conexão com o banco de dados
 */
const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Conectado ao MySQL com sucesso!');
    console.log(`📊 Banco de dados: ${process.env.DB_NAME || 'dashboard_api'}`);
    connection.release();
    return true;
  } catch (error) {
    console.error('❌ Erro ao conectar ao MySQL:');
    console.error(`   ${error.message}`);
    console.error('\n💡 Verifique:');
    console.error('   1. Se o MySQL está rodando');
    console.error('   2. Se as credenciais estão corretas');
    console.error('   3. Se o banco de dados existe');
    return false;
  }
};

/**
 * Executa uma query no banco de dados
 * @param {string} sql - Query SQL
 * @param {Array} params - Parâmetros da query
 * @returns {Promise<Array>} Resultado da query
 */
const query = async (sql, params = []) => {
  try {
    const [results] = await pool.execute(sql, params);
    return results;
  } catch (error) {
    console.error('❌ Erro na query:', error.message);
    throw error;
  }
};

module.exports = {
  pool,
  query,
  testConnection,
};
