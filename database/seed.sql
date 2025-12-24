-- ============================================
-- SEED DATA - DASHBOARD ADMINISTRATIVO
-- ============================================
-- Versão: 1.0.0
-- Descrição: Dados iniciais para desenvolvimento e testes
-- Data: Dezembro 2024
-- ============================================

USE dashboard_admin;

-- ============================================
-- LIMPAR DADOS EXISTENTES (se houver)
-- ============================================

SET FOREIGN_KEY_CHECKS = 0;

TRUNCATE TABLE sessions;
TRUNCATE TABLE logs;
TRUNCATE TABLE metrics;
TRUNCATE TABLE order_items;
TRUNCATE TABLE orders;
TRUNCATE TABLE products;
TRUNCATE TABLE customers;
TRUNCATE TABLE user_roles;
TRUNCATE TABLE users;
TRUNCATE TABLE roles;

SET FOREIGN_KEY_CHECKS = 1;

-- ============================================
-- 1. ROLES (Papéis do Sistema)
-- ============================================

INSERT INTO roles (name, description, permissions) VALUES
('Admin', 'Administrador com acesso total ao sistema', JSON_OBJECT(
    'users', JSON_ARRAY('create', 'read', 'update', 'delete'),
    'products', JSON_ARRAY('create', 'read', 'update', 'delete'),
    'orders', JSON_ARRAY('create', 'read', 'update', 'delete', 'cancel'),
    'customers', JSON_ARRAY('create', 'read', 'update', 'delete'),
    'reports', JSON_ARRAY('read', 'export'),
    'settings', JSON_ARRAY('read', 'update')
)),
('Editor', 'Editor com permissões de criação e edição', JSON_OBJECT(
    'users', JSON_ARRAY('read'),
    'products', JSON_ARRAY('create', 'read', 'update'),
    'orders', JSON_ARRAY('create', 'read', 'update'),
    'customers', JSON_ARRAY('create', 'read', 'update'),
    'reports', JSON_ARRAY('read')
)),
('Viewer', 'Visualizador com acesso somente leitura', JSON_OBJECT(
    'users', JSON_ARRAY('read'),
    'products', JSON_ARRAY('read'),
    'orders', JSON_ARRAY('read'),
    'customers', JSON_ARRAY('read'),
    'reports', JSON_ARRAY('read')
)),
('Vendedor', 'Vendedor com foco em pedidos e clientes', JSON_OBJECT(
    'products', JSON_ARRAY('read'),
    'orders', JSON_ARRAY('create', 'read', 'update'),
    'customers', JSON_ARRAY('create', 'read', 'update'),
    'reports', JSON_ARRAY('read')
));

-- ============================================
-- 2. USERS (Usuários do Sistema)
-- Senha padrão: "senha123" (hash bcrypt)
-- ============================================

INSERT INTO users (name, email, password, avatar, status, last_login) VALUES
('João Silva', 'joao@email.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'https://ui-avatars.com/api/?name=João+Silva&background=3b82f6&color=fff', 'active', '2024-12-24 08:30:00'),
('Maria Santos', 'maria@email.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'https://ui-avatars.com/api/?name=Maria+Santos&background=10b981&color=fff', 'active', '2024-12-24 09:15:00'),
('Pedro Oliveira', 'pedro@email.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'https://ui-avatars.com/api/?name=Pedro+Oliveira&background=f59e0b&color=fff', 'inactive', '2024-12-20 14:22:00'),
('Ana Costa', 'ana@email.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'https://ui-avatars.com/api/?name=Ana+Costa&background=ef4444&color=fff', 'active', '2024-12-24 07:45:00'),
('Carlos Souza', 'carlos@email.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'https://ui-avatars.com/api/?name=Carlos+Souza&background=8b5cf6&color=fff', 'active', '2024-12-24 10:00:00'),
('Fernanda Lima', 'fernanda@email.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'https://ui-avatars.com/api/?name=Fernanda+Lima&background=ec4899&color=fff', 'active', '2024-12-23 16:30:00'),
('Ricardo Mendes', 'ricardo@email.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'https://ui-avatars.com/api/?name=Ricardo+Mendes&background=06b6d4&color=fff', 'active', '2024-12-24 08:00:00'),
('Juliana Ferreira', 'juliana@email.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'https://ui-avatars.com/api/?name=Juliana+Ferreira&background=84cc16&color=fff', 'active', '2024-12-24 09:30:00'),
('Bruno Alves', 'bruno@email.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'https://ui-avatars.com/api/?name=Bruno+Alves&background=f97316&color=fff', 'suspended', NULL),
('Camila Rocha', 'camila@email.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'https://ui-avatars.com/api/?name=Camila+Rocha&background=14b8a6&color=fff', 'active', '2024-12-24 11:00:00');

-- ============================================
-- 3. USER_ROLES (Atribuição de Papéis)
-- ============================================

INSERT INTO user_roles (user_id, role_id) VALUES
(1, 1), -- João Silva: Admin
(2, 2), -- Maria Santos: Editor
(3, 3), -- Pedro Oliveira: Viewer
(4, 4), -- Ana Costa: Vendedor
(5, 2), -- Carlos Souza: Editor
(6, 4), -- Fernanda Lima: Vendedor
(7, 4), -- Ricardo Mendes: Vendedor
(8, 2), -- Juliana Ferreira: Editor
(9, 3), -- Bruno Alves: Viewer
(10, 4); -- Camila Rocha: Vendedor

-- ============================================
-- 4. CUSTOMERS (Clientes)
-- ============================================

INSERT INTO customers (name, email, phone, address, city, state, zip_code, status) VALUES
('Empresa Tech Solutions Ltda', 'contato@techsolutions.com', '(11) 98765-4321', 'Av. Paulista, 1000', 'São Paulo', 'SP', '01310-100', 'active'),
('Comércio Digital Brasil', 'vendas@digitalb.com.br', '(21) 97654-3210', 'Rua das Flores, 250', 'Rio de Janeiro', 'RJ', '20040-020', 'active'),
('Indústria Moderna S.A.', 'compras@moderna.ind.br', '(31) 96543-2109', 'Av. Contorno, 5500', 'Belo Horizonte', 'MG', '30110-090', 'active'),
('Serviços Premium', 'admin@premium.com.br', '(41) 95432-1098', 'Rua XV de Novembro, 800', 'Curitiba', 'PR', '80020-310', 'active'),
('Atacadista Nacional', 'pedidos@atacadista.com', '(51) 94321-0987', 'Av. Ipiranga, 3000', 'Porto Alegre', 'RS', '90160-093', 'active'),
('Distribuidora Sul', 'contato@distsul.com.br', '(47) 93210-9876', 'Rua Princesa Isabel, 1200', 'Florianópolis', 'SC', '88015-400', 'active'),
('Varejo Express', 'comercial@varejoexp.com', '(61) 92109-8765', 'SCS Quadra 2', 'Brasília', 'DF', '70302-907', 'active'),
('Logística Rápida', 'atendimento@lograpida.com', '(85) 91098-7654', 'Av. Santos Dumont, 2500', 'Fortaleza', 'CE', '60150-161', 'active'),
('E-commerce Plus', 'suporte@ecomplus.com.br', '(71) 90987-6543', 'Av. Tancredo Neves, 1500', 'Salvador', 'BA', '41820-021', 'inactive'),
('Mercado Online', 'contato@mercadoonline.com', '(81) 89876-5432', 'Av. Boa Viagem, 3000', 'Recife', 'PE', '51020-000', 'active');

-- ============================================
-- 5. PRODUCTS (Produtos)
-- ============================================

INSERT INTO products (name, sku, description, price, stock_quantity, category, image_url, status) VALUES
('Notebook Dell Inspiron 15', 'DELL-NB-001', 'Notebook Dell Inspiron 15, Intel i7, 16GB RAM, 512GB SSD', 4299.99, 25, 'Eletrônicos', 'https://via.placeholder.com/300x300?text=Notebook+Dell', 'active'),
('Mouse Logitech MX Master 3', 'LOG-MS-002', 'Mouse sem fio Logitech MX Master 3, precisão avançada', 549.90, 50, 'Acessórios', 'https://via.placeholder.com/300x300?text=Mouse+Logitech', 'active'),
('Teclado Mecânico HyperX', 'HYP-KB-003', 'Teclado mecânico gamer HyperX Alloy Origins, RGB', 899.00, 30, 'Acessórios', 'https://via.placeholder.com/300x300?text=Teclado+HyperX', 'active'),
('Monitor LG UltraWide 29"', 'LG-MON-004', 'Monitor LG 29" UltraWide Full HD IPS', 1299.99, 15, 'Eletrônicos', 'https://via.placeholder.com/300x300?text=Monitor+LG', 'active'),
('Cadeira Gamer DXRacer', 'DXR-CH-005', 'Cadeira gamer DXRacer ergonômica com apoio lombar', 1799.90, 12, 'Móveis', 'https://via.placeholder.com/300x300?text=Cadeira+DXRacer', 'active'),
('Webcam Logitech C920', 'LOG-WB-006', 'Webcam Full HD 1080p Logitech C920 Pro', 459.99, 40, 'Acessórios', 'https://via.placeholder.com/300x300?text=Webcam+Logitech', 'active'),
('Headset HyperX Cloud II', 'HYP-HS-007', 'Headset gamer HyperX Cloud II com som surround 7.1', 699.00, 35, 'Acessórios', 'https://via.placeholder.com/300x300?text=Headset+HyperX', 'active'),
('SSD Samsung 1TB', 'SAM-SSD-008', 'SSD Samsung 870 EVO 1TB SATA III', 599.90, 5, 'Componentes', 'https://via.placeholder.com/300x300?text=SSD+Samsung', 'active'),
('Memória RAM Corsair 16GB', 'COR-RAM-009', 'Memória RAM DDR4 16GB Corsair Vengeance 3200MHz', 389.99, 60, 'Componentes', 'https://via.placeholder.com/300x300?text=RAM+Corsair', 'active'),
('Hub USB-C Anker 7 Portas', 'ANK-HUB-010', 'Hub USB-C Anker 7 portas com Power Delivery', 299.90, 45, 'Acessórios', 'https://via.placeholder.com/300x300?text=Hub+Anker', 'active'),
('Mousepad Gamer Razer', 'RAZ-MP-011', 'Mousepad gamer Razer Goliathus Extended Chroma RGB', 349.99, 28, 'Acessórios', 'https://via.placeholder.com/300x300?text=Mousepad+Razer', 'active'),
('Fonte Corsair 750W', 'COR-PSU-012', 'Fonte Corsair RM750 750W 80 Plus Gold Modular', 799.90, 18, 'Componentes', 'https://via.placeholder.com/300x300?text=Fonte+Corsair', 'active'),
('Placa de Vídeo RTX 3060', 'NVI-GPU-013', 'Placa de Vídeo NVIDIA GeForce RTX 3060 12GB', 2499.99, 8, 'Componentes', 'https://via.placeholder.com/300x300?text=RTX+3060', 'active'),
('Cooler CPU Cooler Master', 'CM-FAN-014', 'Cooler para CPU Cooler Master Hyper 212 RGB', 249.90, 22, 'Componentes', 'https://via.placeholder.com/300x300?text=Cooler+Master', 'active'),
('Gabinete NZXT H510', 'NZT-CASE-015', 'Gabinete NZXT H510 Mid Tower com painel de vidro', 649.99, 14, 'Componentes', 'https://via.placeholder.com/300x300?text=Gabinete+NZXT', 'active');

-- ============================================
-- 6. ORDERS (Pedidos)
-- ============================================

INSERT INTO orders (order_number, customer_id, user_id, total_amount, discount_amount, final_amount, status, payment_status, payment_method, ordered_at) VALUES
('ORD-000001', 1, 1, 5199.89, 100.00, 5099.89, 'completed', 'paid', 'Cartão de Crédito', '2024-12-01 10:30:00'),
('ORD-000002', 2, 4, 1949.89, 50.00, 1899.89, 'completed', 'paid', 'PIX', '2024-12-02 14:15:00'),
('ORD-000003', 3, 6, 3599.87, 0.00, 3599.87, 'processing', 'paid', 'Boleto', '2024-12-03 09:45:00'),
('ORD-000004', 4, 7, 899.00, 0.00, 899.00, 'completed', 'paid', 'PIX', '2024-12-04 16:20:00'),
('ORD-000005', 5, 4, 7499.95, 200.00, 7299.95, 'completed', 'paid', 'Cartão de Crédito', '2024-12-05 11:00:00'),
('ORD-000006', 6, 10, 1059.88, 0.00, 1059.88, 'pending', 'pending', 'Boleto', '2024-12-06 13:30:00'),
('ORD-000007', 7, 6, 4599.97, 100.00, 4499.97, 'completed', 'paid', 'PIX', '2024-12-07 08:45:00'),
('ORD-000008', 8, 7, 2349.79, 0.00, 2349.79, 'cancelled', 'refunded', 'Cartão de Crédito', '2024-12-08 15:10:00'),
('ORD-000009', 9, 4, 1698.99, 50.00, 1648.99, 'processing', 'paid', 'PIX', '2024-12-09 10:25:00'),
('ORD-000010', 10, 10, 5849.86, 150.00, 5699.86, 'completed', 'paid', 'Cartão de Crédito', '2024-12-10 14:50:00'),
('ORD-000011', 1, 1, 2199.97, 0.00, 2199.97, 'completed', 'paid', 'PIX', '2024-12-15 09:30:00'),
('ORD-000012', 3, 6, 1799.90, 0.00, 1799.90, 'pending', 'pending', 'Boleto', '2024-12-20 11:15:00'),
('ORD-000013', 5, 7, 3899.88, 100.00, 3799.88, 'processing', 'paid', 'Cartão de Crédito', '2024-12-22 16:00:00'),
('ORD-000014', 2, 4, 1449.89, 0.00, 1449.89, 'completed', 'paid', 'PIX', '2024-12-23 10:45:00'),
('ORD-000015', 4, 10, 999.90, 0.00, 999.90, 'pending', 'pending', 'Boleto', '2024-12-24 08:30:00');

-- ============================================
-- 7. ORDER_ITEMS (Itens dos Pedidos)
-- ============================================

-- Pedido 1
INSERT INTO order_items (order_id, product_id, product_name, quantity, unit_price, subtotal) VALUES
(1, 1, 'Notebook Dell Inspiron 15', 1, 4299.99, 4299.99),
(1, 2, 'Mouse Logitech MX Master 3', 1, 549.90, 549.90),
(1, 10, 'Hub USB-C Anker 7 Portas', 1, 299.90, 299.90);

-- Pedido 2
INSERT INTO order_items (order_id, product_id, product_name, quantity, unit_price, subtotal) VALUES
(2, 4, 'Monitor LG UltraWide 29"', 1, 1299.99, 1299.99),
(2, 11, 'Mousepad Gamer Razer', 2, 349.99, 699.98);

-- Pedido 3
INSERT INTO order_items (order_id, product_id, product_name, quantity, unit_price, subtotal) VALUES
(3, 3, 'Teclado Mecânico HyperX', 2, 899.00, 1798.00),
(3, 5, 'Cadeira Gamer DXRacer', 1, 1799.90, 1799.90);

-- Pedido 4
INSERT INTO order_items (order_id, product_id, product_name, quantity, unit_price, subtotal) VALUES
(4, 3, 'Teclado Mecânico HyperX', 1, 899.00, 899.00);

-- Pedido 5
INSERT INTO order_items (order_id, product_id, product_name, quantity, unit_price, subtotal) VALUES
(5, 1, 'Notebook Dell Inspiron 15', 1, 4299.99, 4299.99),
(5, 13, 'Placa de Vídeo RTX 3060', 1, 2499.99, 2499.99),
(5, 7, 'Headset HyperX Cloud II', 1, 699.00, 699.00);

-- Pedido 6
INSERT INTO order_items (order_id, product_id, product_name, quantity, unit_price, subtotal) VALUES
(6, 6, 'Webcam Logitech C920', 2, 459.99, 919.98),
(6, 14, 'Cooler CPU Cooler Master', 1, 249.90, 249.90);

-- Pedido 7
INSERT INTO order_items (order_id, product_id, product_name, quantity, unit_price, subtotal) VALUES
(7, 1, 'Notebook Dell Inspiron 15', 1, 4299.99, 4299.99),
(7, 10, 'Hub USB-C Anker 7 Portas', 1, 299.90, 299.90);

-- Pedido 8
INSERT INTO order_items (order_id, product_id, product_name, quantity, unit_price, subtotal) VALUES
(8, 13, 'Placa de Vídeo RTX 3060', 1, 2499.99, 2499.99);

-- Pedido 9
INSERT INTO order_items (order_id, product_id, product_name, quantity, unit_price, subtotal) VALUES
(9, 4, 'Monitor LG UltraWide 29"', 1, 1299.99, 1299.99),
(9, 10, 'Hub USB-C Anker 7 Portas', 1, 299.90, 299.90);

-- Pedido 10
INSERT INTO order_items (order_id, product_id, product_name, quantity, unit_price, subtotal) VALUES
(10, 1, 'Notebook Dell Inspiron 15', 1, 4299.99, 4299.99),
(10, 2, 'Mouse Logitech MX Master 3', 1, 549.90, 549.90),
(10, 3, 'Teclado Mecânico HyperX', 1, 899.00, 899.00);

-- Pedido 11
INSERT INTO order_items (order_id, product_id, product_name, quantity, unit_price, subtotal) VALUES
(11, 7, 'Headset HyperX Cloud II', 2, 699.00, 1398.00),
(11, 12, 'Fonte Corsair 750W', 1, 799.90, 799.90);

-- Pedido 12
INSERT INTO order_items (order_id, product_id, product_name, quantity, unit_price, subtotal) VALUES
(12, 5, 'Cadeira Gamer DXRacer', 1, 1799.90, 1799.90);

-- Pedido 13
INSERT INTO order_items (order_id, product_id, product_name, quantity, unit_price, subtotal) VALUES
(13, 13, 'Placa de Vídeo RTX 3060', 1, 2499.99, 2499.99),
(13, 9, 'Memória RAM Corsair 16GB', 3, 389.99, 1169.97),
(13, 14, 'Cooler CPU Cooler Master', 1, 249.90, 249.90);

-- Pedido 14
INSERT INTO order_items (order_id, product_id, product_name, quantity, unit_price, subtotal) VALUES
(14, 4, 'Monitor LG UltraWide 29"', 1, 1299.99, 1299.99),
(14, 14, 'Cooler CPU Cooler Master', 1, 249.90, 249.90);

-- Pedido 15
INSERT INTO order_items (order_id, product_id, product_name, quantity, unit_price, subtotal) VALUES
(15, 8, 'SSD Samsung 1TB', 1, 599.90, 599.90),
(15, 10, 'Hub USB-C Anker 7 Portas', 1, 299.90, 299.90);

-- ============================================
-- 8. METRICS (Métricas para Dashboard)
-- ============================================

-- Métricas dos últimos 30 dias
INSERT INTO metrics (metric_type, metric_name, metric_value, reference_id, reference_type, metric_date) VALUES
-- Receita diária
('daily_revenue', 'Receita do Dia', 5099.89, 1, 'order', '2024-12-01'),
('daily_revenue', 'Receita do Dia', 1899.89, 2, 'order', '2024-12-02'),
('daily_revenue', 'Receita do Dia', 3599.87, 3, 'order', '2024-12-03'),
('daily_revenue', 'Receita do Dia', 899.00, 4, 'order', '2024-12-04'),
('daily_revenue', 'Receita do Dia', 7299.95, 5, 'order', '2024-12-05'),
('daily_revenue', 'Receita do Dia', 0.00, NULL, NULL, '2024-12-06'),
('daily_revenue', 'Receita do Dia', 4499.97, 7, 'order', '2024-12-07'),
('daily_revenue', 'Receita do Dia', 0.00, NULL, NULL, '2024-12-08'),
('daily_revenue', 'Receita do Dia', 1648.99, 9, 'order', '2024-12-09'),
('daily_revenue', 'Receita do Dia', 5699.86, 10, 'order', '2024-12-10'),

-- Contagem de pedidos
('order_count', 'Total de Pedidos', 1, 1, 'order', '2024-12-01'),
('order_count', 'Total de Pedidos', 1, 2, 'order', '2024-12-02'),
('order_count', 'Total de Pedidos', 1, 3, 'order', '2024-12-03'),
('order_count', 'Total de Pedidos', 1, 4, 'order', '2024-12-04'),
('order_count', 'Total de Pedidos', 1, 5, 'order', '2024-12-05'),
('order_count', 'Total de Pedidos', 0, NULL, NULL, '2024-12-06'),
('order_count', 'Total de Pedidos', 1, 7, 'order', '2024-12-07'),
('order_count', 'Total de Pedidos', 0, NULL, NULL, '2024-12-08'),
('order_count', 'Total de Pedidos', 1, 9, 'order', '2024-12-09'),
('order_count', 'Total de Pedidos', 1, 10, 'order', '2024-12-10'),

-- Contagem de usuários ativos
('user_count', 'Usuários Ativos', 8, NULL, 'users', '2024-12-01'),
('user_count', 'Usuários Ativos', 8, NULL, 'users', '2024-12-10'),
('user_count', 'Usuários Ativos', 8, NULL, 'users', '2024-12-20'),

-- Visualizações de produtos (simulado)
('product_views', 'Visualizações', 150, 1, 'product', '2024-12-01'),
('product_views', 'Visualizações', 89, 2, 'product', '2024-12-01'),
('product_views', 'Visualizações', 120, 3, 'product', '2024-12-01'),
('product_views', 'Visualizações', 95, 4, 'product', '2024-12-01'),
('product_views', 'Visualizações', 78, 5, 'product', '2024-12-01'),

-- Taxa de conversão (%)
('conversion_rate', 'Taxa de Conversão', 3.5, NULL, NULL, '2024-12-01'),
('conversion_rate', 'Taxa de Conversão', 4.2, NULL, NULL, '2024-12-05'),
('conversion_rate', 'Taxa de Conversão', 3.8, NULL, NULL, '2024-12-10'),

-- Ticket médio
('avg_ticket', 'Ticket Médio', 3564.94, NULL, 'orders', '2024-12-01'),
('avg_ticket', 'Ticket Médio', 3749.86, NULL, 'orders', '2024-12-10');

-- ============================================
-- 9. LOGS (Logs de Auditoria)
-- ============================================

INSERT INTO logs (user_id, action, entity_type, entity_id, description, metadata, ip_address, user_agent) VALUES
(1, 'user.login', 'user', 1, 'Usuário realizou login no sistema', JSON_OBJECT('success', true), '192.168.1.100', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'),
(1, 'order.create', 'order', 1, 'Novo pedido criado', JSON_OBJECT('order_number', 'ORD-000001', 'total', 5099.89), '192.168.1.100', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'),
(4, 'user.login', 'user', 4, 'Usuário realizou login no sistema', JSON_OBJECT('success', true), '192.168.1.101', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)'),
(4, 'order.create', 'order', 2, 'Novo pedido criado', JSON_OBJECT('order_number', 'ORD-000002', 'total', 1899.89), '192.168.1.101', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)'),
(6, 'order.create', 'order', 3, 'Novo pedido criado', JSON_OBJECT('order_number', 'ORD-000003', 'total', 3599.87), '192.168.1.102', 'Mozilla/5.0 (X11; Linux x86_64)'),
(1, 'order.update', 'order', 1, 'Status do pedido alterado', JSON_OBJECT('old_status', 'pending', 'new_status', 'completed'), '192.168.1.100', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'),
(2, 'product.update', 'product', 8, 'Produto atualizado', JSON_OBJECT('field', 'stock_quantity', 'old_value', 10, 'new_value', 5), '192.168.1.103', 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X)'),
(1, 'user.create', 'user', 10, 'Novo usuário criado no sistema', JSON_OBJECT('name', 'Camila Rocha', 'role', 'Vendedor'), '192.168.1.100', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'),
(4, 'order.update', 'order', 4, 'Status do pedido alterado', JSON_OBJECT('old_status', 'pending', 'new_status', 'completed'), '192.168.1.101', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)'),
(1, 'user.update', 'user', 9, 'Usuário suspenso', JSON_OBJECT('old_status', 'active', 'new_status', 'suspended', 'reason', 'Violação de política'), '192.168.1.100', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'),
(2, 'product.create', 'product', 15, 'Novo produto adicionado', JSON_OBJECT('name', 'Gabinete NZXT H510', 'price', 649.99), '192.168.1.103', 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X)'),
(5, 'order.cancel', 'order', 8, 'Pedido cancelado pelo vendedor', JSON_OBJECT('order_number', 'ORD-000008', 'reason', 'Produto indisponível'), '192.168.1.104', 'Mozilla/5.0 (iPad; CPU OS 14_6 like Mac OS X)'),
(1, 'settings.update', 'system', NULL, 'Configurações do sistema atualizadas', JSON_OBJECT('section', 'notifications', 'enabled', true), '192.168.1.100', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'),
(4, 'customer.create', 'customer', 10, 'Novo cliente cadastrado', JSON_OBJECT('name', 'Mercado Online', 'email', 'contato@mercadoonline.com'), '192.168.1.101', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)'),
(7, 'order.create', 'order', 7, 'Novo pedido criado', JSON_OBJECT('order_number', 'ORD-000007', 'total', 4499.97), '192.168.1.105', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)');

-- ============================================
-- 10. SESSIONS (Sessões Ativas)
-- ============================================

INSERT INTO sessions (user_id, session_token, ip_address, user_agent, expires_at) VALUES
(1, 'sess_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6', '192.168.1.100', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', DATE_ADD(NOW(), INTERVAL 24 HOUR)),
(2, 'sess_b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7', '192.168.1.103', 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X)', DATE_ADD(NOW(), INTERVAL 24 HOUR)),
(4, 'sess_c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8', '192.168.1.101', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)', DATE_ADD(NOW(), INTERVAL 24 HOUR)),
(5, 'sess_d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9', '192.168.1.106', 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64)', DATE_ADD(NOW(), INTERVAL 24 HOUR)),
(7, 'sess_e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0', '192.168.1.105', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)', DATE_ADD(NOW(), INTERVAL 24 HOUR)),
(10, 'sess_f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1', '192.168.1.107', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)', DATE_ADD(NOW(), INTERVAL 24 HOUR));

-- ============================================
-- MENSAGEM FINAL
-- ============================================

SELECT 
    '✅ Dados inseridos com sucesso!' AS status,
    COUNT(*) AS total_usuarios FROM users
UNION ALL
SELECT 
    'Total de Clientes' AS status,
    COUNT(*) FROM customers
UNION ALL
SELECT 
    'Total de Produtos' AS status,
    COUNT(*) FROM products
UNION ALL
SELECT 
    'Total de Pedidos' AS status,
    COUNT(*) FROM orders
UNION ALL
SELECT 
    'Total de Métricas' AS status,
    COUNT(*) FROM metrics
UNION ALL
SELECT 
    'Total de Logs' AS status,
    COUNT(*) FROM logs;

-- Exibir resumo financeiro
SELECT 
    '💰 RESUMO FINANCEIRO' AS tipo,
    CONCAT('R$ ', FORMAT(SUM(final_amount), 2, 'de_DE')) AS valor
FROM orders
WHERE status = 'completed' AND payment_status = 'paid';

-- Exibir top 3 produtos mais vendidos
SELECT 
    '🏆 TOP 3 PRODUTOS MAIS VENDIDOS' AS ranking,
    p.name AS produto,
    SUM(oi.quantity) AS quantidade_vendida
FROM products p
INNER JOIN order_items oi ON p.id = oi.product_id
GROUP BY p.id
ORDER BY quantidade_vendida DESC
LIMIT 3;
