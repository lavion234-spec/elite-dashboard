-- ============================================
-- DATABASE SCHEMA - API DASHBOARD
-- ============================================
-- Versão: 1.0.0
-- Compatibilidade: MySQL 8.0+
-- Data: Dezembro 2024
-- ============================================

-- Remover banco se existir (CUIDADO EM PRODUÇÃO!)
DROP DATABASE IF EXISTS dashboard_api;

-- Criar banco com charset UTF8MB4
CREATE DATABASE dashboard_api
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

-- Usar o banco criado
USE dashboard_api;

-- ============================================
-- TABELA: produtos
-- Descrição: Catálogo de produtos
-- ============================================
CREATE TABLE produtos (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(200) NOT NULL,
    descricao TEXT,
    preco DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    estoque INT NOT NULL DEFAULT 0,
    categoria_id INT UNSIGNED,
    custo DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    imagem VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_produtos_nome (nome),
    INDEX idx_produtos_categoria (categoria_id),
    INDEX idx_produtos_preco (preco),
    INDEX idx_produtos_estoque (estoque)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABELA: vendedores
-- Descrição: Vendedores do sistema
-- ============================================
CREATE TABLE vendedores (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    telefone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_vendedores_email (email),
    INDEX idx_vendedores_nome (nome)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABELA: pedidos
-- Descrição: Pedidos realizados
-- ============================================
CREATE TABLE pedidos (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    produto_id INT UNSIGNED NOT NULL,
    vendedor_id INT UNSIGNED NOT NULL,
    quantidade INT NOT NULL DEFAULT 1,
    preco_total DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY fk_pedidos_produto (produto_id) 
        REFERENCES produtos(id) ON DELETE RESTRICT,
    FOREIGN KEY fk_pedidos_vendedor (vendedor_id) 
        REFERENCES vendedores(id) ON DELETE RESTRICT,
    
    INDEX idx_pedidos_produto (produto_id),
    INDEX idx_pedidos_vendedor (vendedor_id),
    INDEX idx_pedidos_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- INSERTS DE EXEMPLO
-- ============================================

-- Inserir vendedores
INSERT INTO vendedores (nome, email, telefone) VALUES
('João Silva', 'joao.silva@email.com', '(11) 98765-4321'),
('Maria Santos', 'maria.santos@email.com', '(21) 97654-3210'),
('Pedro Oliveira', 'pedro.oliveira@email.com', '(31) 96543-2109'),
('Ana Costa', 'ana.costa@email.com', '(41) 95432-1098'),
('Carlos Souza', 'carlos.souza@email.com', '(51) 94321-0987');

-- Inserir produtos
INSERT INTO produtos (nome, descricao, preco, estoque, categoria_id, custo, imagem) VALUES
('Notebook Dell Inspiron 15', 'Notebook Dell i7, 16GB RAM, 512GB SSD', 4299.99, 25, 1, 3200.00, 'https://via.placeholder.com/300x300?text=Notebook+Dell'),
('Mouse Logitech MX Master 3', 'Mouse sem fio de precisão', 549.90, 50, 2, 380.00, 'https://via.placeholder.com/300x300?text=Mouse+Logitech'),
('Teclado Mecânico HyperX', 'Teclado gamer RGB', 899.00, 30, 2, 620.00, 'https://via.placeholder.com/300x300?text=Teclado+HyperX'),
('Monitor LG UltraWide 29"', 'Monitor 29" Full HD IPS', 1299.99, 15, 1, 950.00, 'https://via.placeholder.com/300x300?text=Monitor+LG'),
('Cadeira Gamer DXRacer', 'Cadeira ergonômica gamer', 1799.90, 12, 3, 1200.00, 'https://via.placeholder.com/300x300?text=Cadeira+DXRacer'),
('Webcam Logitech C920', 'Webcam Full HD 1080p', 459.99, 40, 2, 320.00, 'https://via.placeholder.com/300x300?text=Webcam+Logitech'),
('Headset HyperX Cloud II', 'Headset gamer 7.1', 699.00, 35, 2, 480.00, 'https://via.placeholder.com/300x300?text=Headset+HyperX'),
('SSD Samsung 1TB', 'SSD 1TB SATA III', 599.90, 60, 4, 420.00, 'https://via.placeholder.com/300x300?text=SSD+Samsung'),
('Memória RAM Corsair 16GB', 'RAM DDR4 16GB 3200MHz', 389.99, 75, 4, 270.00, 'https://via.placeholder.com/300x300?text=RAM+Corsair'),
('Hub USB-C Anker 7 Portas', 'Hub USB-C com Power Delivery', 299.90, 45, 2, 200.00, 'https://via.placeholder.com/300x300?text=Hub+Anker');

-- Inserir pedidos de exemplo
INSERT INTO pedidos (produto_id, vendedor_id, quantidade, preco_total) VALUES
(1, 1, 2, 8599.98),    -- 2 Notebooks para João Silva
(2, 2, 5, 2749.50),    -- 5 Mouses para Maria Santos
(3, 1, 3, 2697.00),    -- 3 Teclados para João Silva
(4, 3, 1, 1299.99),    -- 1 Monitor para Pedro Oliveira
(5, 4, 2, 3599.80),    -- 2 Cadeiras para Ana Costa
(6, 2, 10, 4599.90),   -- 10 Webcams para Maria Santos
(7, 5, 4, 2796.00),    -- 4 Headsets para Carlos Souza
(8, 1, 8, 4799.20),    -- 8 SSDs para João Silva
(9, 3, 15, 5849.85),   -- 15 Memórias RAM para Pedro Oliveira
(10, 4, 6, 1799.40);   -- 6 Hubs para Ana Costa

-- ============================================
-- VIEWS ÚTEIS
-- ============================================

-- View: Produtos com lucro calculado
CREATE OR REPLACE VIEW vw_produtos_lucro AS
SELECT 
    id,
    nome,
    preco,
    custo,
    (preco - custo) as lucro_unitario,
    CASE 
        WHEN custo > 0 THEN ROUND(((preco - custo) / custo) * 100, 2)
        ELSE 0
    END as margem_lucro_percentual,
    estoque,
    (estoque * preco) as valor_estoque,
    categoria_id
FROM produtos;

-- View: Pedidos com informações completas
CREATE OR REPLACE VIEW vw_pedidos_completos AS
SELECT 
    p.id,
    p.quantidade,
    p.preco_total,
    p.created_at,
    pr.id as produto_id,
    pr.nome as produto_nome,
    pr.preco as produto_preco,
    pr.custo as produto_custo,
    v.id as vendedor_id,
    v.nome as vendedor_nome,
    v.email as vendedor_email,
    (p.preco_total - (pr.custo * p.quantidade)) as lucro_pedido
FROM pedidos p
INNER JOIN produtos pr ON p.produto_id = pr.id
INNER JOIN vendedores v ON p.vendedor_id = v.id;

-- View: Estatísticas por vendedor
CREATE OR REPLACE VIEW vw_estatisticas_vendedores AS
SELECT 
    v.id,
    v.nome,
    v.email,
    COUNT(p.id) as total_vendas,
    COALESCE(SUM(p.quantidade), 0) as total_itens_vendidos,
    COALESCE(SUM(p.preco_total), 0) as valor_total_vendas,
    COALESCE(AVG(p.preco_total), 0) as ticket_medio
FROM vendedores v
LEFT JOIN pedidos p ON v.id = p.vendedor_id
GROUP BY v.id;

-- View: Top produtos mais vendidos
CREATE OR REPLACE VIEW vw_top_produtos AS
SELECT 
    pr.id,
    pr.nome,
    pr.preco,
    pr.custo,
    SUM(p.quantidade) as quantidade_vendida,
    SUM(p.preco_total) as receita_total,
    SUM(pr.custo * p.quantidade) as custo_total,
    (SUM(p.preco_total) - SUM(pr.custo * p.quantidade)) as lucro_total,
    COUNT(p.id) as total_pedidos
FROM produtos pr
INNER JOIN pedidos p ON pr.id = p.produto_id
GROUP BY pr.id
ORDER BY quantidade_vendida DESC;

-- ============================================
-- TRIGGERS
-- ============================================

-- Trigger: Validar estoque antes de criar pedido
DELIMITER //

CREATE TRIGGER trg_pedidos_before_insert
BEFORE INSERT ON pedidos
FOR EACH ROW
BEGIN
    DECLARE v_estoque INT;
    
    SELECT estoque INTO v_estoque
    FROM produtos
    WHERE id = NEW.produto_id;
    
    IF v_estoque < NEW.quantidade THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Estoque insuficiente para realizar o pedido';
    END IF;
END //

DELIMITER ;

-- ============================================
-- STORED PROCEDURES
-- ============================================

-- Procedure: Criar pedido e atualizar estoque
DELIMITER //

CREATE PROCEDURE sp_criar_pedido(
    IN p_produto_id INT,
    IN p_vendedor_id INT,
    IN p_quantidade INT,
    OUT p_pedido_id INT,
    OUT p_preco_total DECIMAL(10,2)
)
BEGIN
    DECLARE v_preco DECIMAL(10,2);
    DECLARE v_estoque INT;
    
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;
    
    START TRANSACTION;
    
    -- Buscar preço e estoque do produto
    SELECT preco, estoque INTO v_preco, v_estoque
    FROM produtos
    WHERE id = p_produto_id
    FOR UPDATE;
    
    -- Validar estoque
    IF v_estoque < p_quantidade THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Estoque insuficiente';
    END IF;
    
    -- Calcular preço total
    SET p_preco_total = v_preco * p_quantidade;
    
    -- Criar pedido
    INSERT INTO pedidos (produto_id, vendedor_id, quantidade, preco_total)
    VALUES (p_produto_id, p_vendedor_id, p_quantidade, p_preco_total);
    
    SET p_pedido_id = LAST_INSERT_ID();
    
    -- Atualizar estoque
    UPDATE produtos
    SET estoque = estoque - p_quantidade
    WHERE id = p_produto_id;
    
    COMMIT;
END //

DELIMITER ;

-- ============================================
-- ÍNDICES ADICIONAIS PARA PERFORMANCE
-- ============================================

-- Índice composto para busca de pedidos por vendedor e data
CREATE INDEX idx_pedidos_vendedor_data 
ON pedidos(vendedor_id, created_at DESC);

-- Índice composto para busca de pedidos por produto e data
CREATE INDEX idx_pedidos_produto_data 
ON pedidos(produto_id, created_at DESC);

-- ============================================
-- COMENTÁRIOS NAS TABELAS
-- ============================================

ALTER TABLE produtos COMMENT = 'Catálogo de produtos do sistema';
ALTER TABLE vendedores COMMENT = 'Vendedores cadastrados';
ALTER TABLE pedidos COMMENT = 'Pedidos realizados (atualiza estoque)';

-- ============================================
-- MENSAGEM FINAL
-- ============================================

SELECT 
    '✅ Banco de dados criado com sucesso!' AS status,
    'dashboard_api' AS nome_banco,
    (SELECT COUNT(*) FROM produtos) AS total_produtos,
    (SELECT COUNT(*) FROM vendedores) AS total_vendedores,
    (SELECT COUNT(*) FROM pedidos) AS total_pedidos;

SELECT 
    '💰 RESUMO FINANCEIRO' AS info,
    CONCAT('R$ ', FORMAT(SUM(preco_total), 2, 'de_DE')) AS total_vendas,
    CONCAT('R$ ', FORMAT(SUM(pr.custo * p.quantidade), 2, 'de_DE')) AS total_custos,
    CONCAT('R$ ', FORMAT(SUM(preco_total) - SUM(pr.custo * p.quantidade), 2, 'de_DE')) AS lucro_total
FROM pedidos p
INNER JOIN produtos pr ON p.produto_id = pr.id;

SELECT '🚀 Inicie a API com: node src/server.js' AS proximo_passo;
