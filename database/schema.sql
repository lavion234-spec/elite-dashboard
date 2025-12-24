-- ============================================
-- DATABASE SCHEMA - DASHBOARD ADMINISTRATIVO
-- ============================================
-- Versão: 1.0.0
-- Compatibilidade: MySQL 8.0+
-- Charset: UTF8MB4 (suporte completo Unicode + Emojis)
-- Normalização: 3FN (Terceira Forma Normal)
-- Autor: Desenvolvedor Sênior de Banco de Dados
-- Data: Dezembro 2024
-- ============================================

-- Remover banco se existir (CUIDADO EM PRODUÇÃO!)
DROP DATABASE IF EXISTS dashboard_admin;

-- Criar banco com charset UTF8MB4
CREATE DATABASE dashboard_admin
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

-- Usar o banco criado
USE dashboard_admin;

-- ============================================
-- TABELA: roles
-- Descrição: Papéis e níveis de acesso
-- ============================================
CREATE TABLE roles (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT,
    permissions JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_roles_name (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABELA: users
-- Descrição: Usuários do sistema (administradores, editores, etc)
-- ============================================
CREATE TABLE users (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    avatar VARCHAR(500),
    status ENUM('active', 'inactive', 'suspended') DEFAULT 'active',
    last_login TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_users_email (email),
    INDEX idx_users_status (status),
    INDEX idx_users_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABELA: user_roles
-- Descrição: Relacionamento N:N entre users e roles
-- ============================================
CREATE TABLE user_roles (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NOT NULL,
    role_id INT UNSIGNED NOT NULL,
    assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY fk_user_roles_user (user_id) 
        REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY fk_user_roles_role (role_id) 
        REFERENCES roles(id) ON DELETE CASCADE,
    
    UNIQUE KEY unique_user_role (user_id, role_id),
    INDEX idx_user_roles_user (user_id),
    INDEX idx_user_roles_role (role_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABELA: customers
-- Descrição: Clientes que realizam pedidos
-- ============================================
CREATE TABLE customers (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    phone VARCHAR(20),
    address TEXT,
    city VARCHAR(100),
    state VARCHAR(50),
    zip_code VARCHAR(20),
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_customers_email (email),
    INDEX idx_customers_status (status),
    INDEX idx_customers_city (city),
    INDEX idx_customers_state (state)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABELA: products
-- Descrição: Catálogo de produtos
-- ============================================
CREATE TABLE products (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    sku VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    stock_quantity INT NOT NULL DEFAULT 0,
    category VARCHAR(100),
    image_url VARCHAR(500),
    status ENUM('active', 'inactive', 'out_of_stock') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_products_sku (sku),
    INDEX idx_products_category (category),
    INDEX idx_products_status (status),
    INDEX idx_products_price (price),
    INDEX idx_products_stock (stock_quantity)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABELA: orders
-- Descrição: Pedidos realizados por clientes
-- ============================================
CREATE TABLE orders (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    order_number VARCHAR(50) NOT NULL UNIQUE,
    customer_id BIGINT UNSIGNED NOT NULL,
    user_id BIGINT UNSIGNED,
    total_amount DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    discount_amount DECIMAL(10, 2) DEFAULT 0.00,
    final_amount DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    status ENUM('pending', 'processing', 'completed', 'cancelled') DEFAULT 'pending',
    payment_status ENUM('pending', 'paid', 'failed', 'refunded') DEFAULT 'pending',
    payment_method VARCHAR(50),
    notes TEXT,
    ordered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY fk_orders_customer (customer_id) 
        REFERENCES customers(id) ON DELETE CASCADE,
    FOREIGN KEY fk_orders_user (user_id) 
        REFERENCES users(id) ON DELETE SET NULL,
    
    INDEX idx_orders_number (order_number),
    INDEX idx_orders_customer (customer_id),
    INDEX idx_orders_user (user_id),
    INDEX idx_orders_status (status),
    INDEX idx_orders_payment_status (payment_status),
    INDEX idx_orders_ordered_at (ordered_at),
    INDEX idx_orders_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABELA: order_items
-- Descrição: Itens individuais de cada pedido
-- ============================================
CREATE TABLE order_items (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    order_id BIGINT UNSIGNED NOT NULL,
    product_id BIGINT UNSIGNED NOT NULL,
    product_name VARCHAR(200) NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    unit_price DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    subtotal DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY fk_order_items_order (order_id) 
        REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY fk_order_items_product (product_id) 
        REFERENCES products(id) ON DELETE RESTRICT,
    
    INDEX idx_order_items_order (order_id),
    INDEX idx_order_items_product (product_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABELA: metrics
-- Descrição: Métricas e KPIs para dashboards
-- ============================================
CREATE TABLE metrics (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    metric_type VARCHAR(50) NOT NULL,
    metric_name VARCHAR(100) NOT NULL,
    metric_value DECIMAL(15, 2) NOT NULL DEFAULT 0.00,
    reference_id BIGINT UNSIGNED,
    reference_type VARCHAR(50),
    metric_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_metrics_type (metric_type),
    INDEX idx_metrics_date (metric_date),
    INDEX idx_metrics_reference (reference_type, reference_id),
    INDEX idx_metrics_type_date (metric_type, metric_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABELA: logs
-- Descrição: Logs de auditoria e eventos do sistema
-- ============================================
CREATE TABLE logs (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED,
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(50),
    entity_id BIGINT UNSIGNED,
    description TEXT,
    metadata JSON,
    ip_address VARCHAR(45),
    user_agent VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY fk_logs_user (user_id) 
        REFERENCES users(id) ON DELETE SET NULL,
    
    INDEX idx_logs_user (user_id),
    INDEX idx_logs_action (action),
    INDEX idx_logs_entity (entity_type, entity_id),
    INDEX idx_logs_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABELA: sessions
-- Descrição: Sessões ativas de usuários
-- ============================================
CREATE TABLE sessions (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NOT NULL,
    session_token VARCHAR(255) NOT NULL UNIQUE,
    ip_address VARCHAR(45),
    user_agent VARCHAR(500),
    expires_at TIMESTAMP NOT NULL,
    last_activity TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY fk_sessions_user (user_id) 
        REFERENCES users(id) ON DELETE CASCADE,
    
    INDEX idx_sessions_token (session_token),
    INDEX idx_sessions_user (user_id),
    INDEX idx_sessions_expires (expires_at),
    INDEX idx_sessions_activity (last_activity)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- VIEWS ÚTEIS
-- ============================================

-- View: Pedidos com informações completas
CREATE OR REPLACE VIEW vw_orders_complete AS
SELECT 
    o.id,
    o.order_number,
    o.status,
    o.payment_status,
    o.final_amount,
    o.ordered_at,
    c.name AS customer_name,
    c.email AS customer_email,
    c.phone AS customer_phone,
    u.name AS processed_by,
    COUNT(oi.id) AS total_items,
    o.created_at,
    o.updated_at
FROM orders o
LEFT JOIN customers c ON o.customer_id = c.id
LEFT JOIN users u ON o.user_id = u.id
LEFT JOIN order_items oi ON o.id = oi.order_id
GROUP BY o.id;

-- View: Produtos com estoque baixo
CREATE OR REPLACE VIEW vw_low_stock_products AS
SELECT 
    id,
    name,
    sku,
    category,
    stock_quantity,
    price,
    status
FROM products
WHERE stock_quantity < 10 AND status = 'active'
ORDER BY stock_quantity ASC;

-- View: Métricas diárias resumidas
CREATE OR REPLACE VIEW vw_daily_metrics AS
SELECT 
    metric_date,
    SUM(CASE WHEN metric_type = 'daily_revenue' THEN metric_value ELSE 0 END) AS total_revenue,
    SUM(CASE WHEN metric_type = 'order_count' THEN metric_value ELSE 0 END) AS total_orders,
    SUM(CASE WHEN metric_type = 'user_count' THEN metric_value ELSE 0 END) AS total_users
FROM metrics
GROUP BY metric_date
ORDER BY metric_date DESC;

-- View: Top 10 produtos mais vendidos
CREATE OR REPLACE VIEW vw_top_products AS
SELECT 
    p.id,
    p.name,
    p.sku,
    p.category,
    p.price,
    SUM(oi.quantity) AS total_sold,
    SUM(oi.subtotal) AS total_revenue
FROM products p
INNER JOIN order_items oi ON p.id = oi.product_id
GROUP BY p.id
ORDER BY total_sold DESC
LIMIT 10;

-- View: Usuários com suas roles
CREATE OR REPLACE VIEW vw_users_with_roles AS
SELECT 
    u.id,
    u.name,
    u.email,
    u.status,
    u.last_login,
    GROUP_CONCAT(r.name ORDER BY r.name SEPARATOR ', ') AS roles,
    u.created_at
FROM users u
LEFT JOIN user_roles ur ON u.id = ur.user_id
LEFT JOIN roles r ON ur.role_id = r.id
GROUP BY u.id;

-- ============================================
-- STORED PROCEDURES
-- ============================================

-- Procedure: Criar novo pedido com itens
DELIMITER //

CREATE PROCEDURE sp_create_order(
    IN p_customer_id BIGINT,
    IN p_user_id BIGINT,
    IN p_payment_method VARCHAR(50),
    IN p_items JSON
)
BEGIN
    DECLARE v_order_id BIGINT;
    DECLARE v_order_number VARCHAR(50);
    DECLARE v_total_amount DECIMAL(10,2) DEFAULT 0.00;
    DECLARE v_item_index INT DEFAULT 0;
    DECLARE v_items_count INT;
    
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;
    
    START TRANSACTION;
    
    -- Gerar número do pedido
    SET v_order_number = CONCAT('ORD-', LPAD(FLOOR(RAND() * 999999), 6, '0'));
    
    -- Criar pedido
    INSERT INTO orders (
        order_number, 
        customer_id, 
        user_id, 
        payment_method, 
        status, 
        payment_status
    ) VALUES (
        v_order_number, 
        p_customer_id, 
        p_user_id, 
        p_payment_method, 
        'pending', 
        'pending'
    );
    
    SET v_order_id = LAST_INSERT_ID();
    
    -- Processar itens
    SET v_items_count = JSON_LENGTH(p_items);
    
    WHILE v_item_index < v_items_count DO
        INSERT INTO order_items (
            order_id, 
            product_id, 
            product_name, 
            quantity, 
            unit_price, 
            subtotal
        )
        SELECT 
            v_order_id,
            p.id,
            p.name,
            JSON_UNQUOTE(JSON_EXTRACT(p_items, CONCAT('$[', v_item_index, '].quantity'))),
            p.price,
            p.price * JSON_UNQUOTE(JSON_EXTRACT(p_items, CONCAT('$[', v_item_index, '].quantity')))
        FROM products p
        WHERE p.id = JSON_UNQUOTE(JSON_EXTRACT(p_items, CONCAT('$[', v_item_index, '].product_id')));
        
        SET v_item_index = v_item_index + 1;
    END WHILE;
    
    -- Calcular total
    SELECT SUM(subtotal) INTO v_total_amount
    FROM order_items
    WHERE order_id = v_order_id;
    
    -- Atualizar pedido com total
    UPDATE orders
    SET total_amount = v_total_amount,
        final_amount = v_total_amount
    WHERE id = v_order_id;
    
    COMMIT;
    
    SELECT v_order_id AS order_id, v_order_number AS order_number;
END //

DELIMITER ;

-- ============================================
-- TRIGGERS
-- ============================================

-- Trigger: Atualizar estoque após inserir item no pedido
DELIMITER //

CREATE TRIGGER trg_order_items_after_insert
AFTER INSERT ON order_items
FOR EACH ROW
BEGIN
    UPDATE products
    SET stock_quantity = stock_quantity - NEW.quantity
    WHERE id = NEW.product_id;
    
    -- Atualizar status se estoque zerou
    UPDATE products
    SET status = 'out_of_stock'
    WHERE id = NEW.product_id AND stock_quantity <= 0;
END //

DELIMITER ;

-- Trigger: Registrar log após update em pedido
DELIMITER //

CREATE TRIGGER trg_orders_after_update
AFTER UPDATE ON orders
FOR EACH ROW
BEGIN
    IF OLD.status != NEW.status THEN
        INSERT INTO logs (
            user_id,
            action,
            entity_type,
            entity_id,
            description,
            metadata
        ) VALUES (
            NEW.user_id,
            'order.status_changed',
            'order',
            NEW.id,
            CONCAT('Status alterado de ', OLD.status, ' para ', NEW.status),
            JSON_OBJECT(
                'old_status', OLD.status,
                'new_status', NEW.status,
                'order_number', NEW.order_number
            )
        );
    END IF;
END //

DELIMITER ;

-- Trigger: Atualizar data de conclusão quando pedido for completado
DELIMITER //

CREATE TRIGGER trg_orders_before_update_completion
BEFORE UPDATE ON orders
FOR EACH ROW
BEGIN
    IF NEW.status = 'completed' AND OLD.status != 'completed' THEN
        SET NEW.completed_at = CURRENT_TIMESTAMP;
    END IF;
END //

DELIMITER ;

-- ============================================
-- ÍNDICES COMPOSTOS ADICIONAIS (PERFORMANCE)
-- ============================================

-- Índice composto para busca de pedidos por cliente e data
CREATE INDEX idx_orders_customer_date 
ON orders(customer_id, ordered_at DESC);

-- Índice composto para métricas por tipo e data
CREATE INDEX idx_metrics_type_date_value 
ON metrics(metric_type, metric_date DESC, metric_value);

-- Índice composto para logs por usuário e ação
CREATE INDEX idx_logs_user_action_date 
ON logs(user_id, action, created_at DESC);

-- ============================================
-- COMENTÁRIOS NAS TABELAS
-- ============================================

ALTER TABLE roles COMMENT = 'Papéis e permissões do sistema';
ALTER TABLE users COMMENT = 'Usuários do sistema administrativo';
ALTER TABLE user_roles COMMENT = 'Relacionamento N:N entre usuários e papéis';
ALTER TABLE customers COMMENT = 'Clientes que realizam pedidos';
ALTER TABLE products COMMENT = 'Catálogo de produtos disponíveis';
ALTER TABLE orders COMMENT = 'Pedidos realizados pelos clientes';
ALTER TABLE order_items COMMENT = 'Itens individuais de cada pedido';
ALTER TABLE metrics COMMENT = 'Métricas e KPIs para dashboards';
ALTER TABLE logs COMMENT = 'Logs de auditoria e eventos do sistema';
ALTER TABLE sessions COMMENT = 'Sessões ativas de usuários logados';

-- ============================================
-- MENSAGEM FINAL
-- ============================================

SELECT 
    '✅ Schema criado com sucesso!' AS status,
    'Execute o arquivo seed.sql para popular o banco com dados iniciais' AS proximo_passo;
