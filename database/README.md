# 🗄️ Banco de Dados - Dashboard Administrativo

![MySQL](https://img.shields.io/badge/MySQL-8.0%2B-blue)
![Normalização](https://img.shields.io/badge/Normaliza%C3%A7%C3%A3o-3FN-green)
![Status](https://img.shields.io/badge/Status-Pronto-success)

---

## 📋 Índice

1. [Visão Geral](#-visão-geral)
2. [Instalação e Configuração](#-instalação-e-configuração)
3. [Estrutura do Banco](#-estrutura-do-banco)
4. [Tabelas Principais](#-tabelas-principais)
5. [Relacionamentos](#-relacionamentos)
6. [Views e Procedures](#-views-e-procedures)
7. [Queries Úteis](#-queries-úteis)
8. [Manutenção e Backup](#-manutenção-e-backup)
9. [Melhorias Futuras](#-melhorias-futuras)
10. [Troubleshooting](#-troubleshooting)

---

## 🎯 Visão Geral

Este banco de dados MySQL foi projetado profissionalmente para suportar um **Dashboard Administrativo** completo e escalável.

### ✨ Características

- ✅ **MySQL 8.0+** compatível
- ✅ **Normalização 3FN** completa
- ✅ **UTF8MB4** com suporte a emojis
- ✅ **Índices otimizados** para performance
- ✅ **Foreign Keys** com integridade referencial
- ✅ **Triggers** automáticos
- ✅ **Views** pré-configuradas
- ✅ **Stored Procedures** profissionais
- ✅ **Timestamps** automáticos
- ✅ **Logs de auditoria** completos

### 📊 Tabelas Implementadas

| Tabela | Descrição | Registros (Seed) |
|--------|-----------|------------------|
| `roles` | Papéis e permissões | 4 |
| `users` | Usuários do sistema | 10 |
| `user_roles` | Relação usuário-papel | 10 |
| `customers` | Clientes | 10 |
| `products` | Produtos | 15 |
| `orders` | Pedidos | 15 |
| `order_items` | Itens dos pedidos | 30+ |
| `metrics` | Métricas/KPIs | 30+ |
| `logs` | Logs de auditoria | 15+ |
| `sessions` | Sessões ativas | 6 |

**Total: 10 tabelas + 5 views + 1 procedure + 3 triggers**

---

## 🚀 Instalação e Configuração

### Pré-requisitos

- MySQL 8.0 ou superior
- Cliente MySQL (MySQL Workbench, DBeaver, phpMyAdmin, etc.)
- Acesso root ou privilégios de CREATE DATABASE

### Passo 1: Criar o Schema

Execute o arquivo `schema.sql` para criar toda a estrutura:

```bash
# Via linha de comando
mysql -u root -p < database/schema.sql

# Ou no MySQL Workbench
# File > Open SQL Script > Selecione schema.sql > Execute
```

**O que será criado:**
- ✅ Banco de dados `dashboard_admin`
- ✅ Todas as 10 tabelas
- ✅ Índices e foreign keys
- ✅ 5 views úteis
- ✅ 1 stored procedure
- ✅ 3 triggers automáticos

### Passo 2: Popular com Dados

Execute o arquivo `seed.sql` para inserir dados de exemplo:

```bash
# Via linha de comando
mysql -u root -p < database/seed.sql

# Ou no MySQL Workbench
# File > Open SQL Script > Selecione seed.sql > Execute
```

**Dados inseridos:**
- ✅ 4 papéis (Admin, Editor, Viewer, Vendedor)
- ✅ 10 usuários com diferentes permissões
- ✅ 10 clientes brasileiros
- ✅ 15 produtos de tecnologia
- ✅ 15 pedidos completos
- ✅ 30+ itens de pedido
- ✅ 30+ métricas para gráficos
- ✅ 15+ logs de auditoria
- ✅ 6 sessões ativas

### Passo 3: Verificar a Instalação

```sql
-- Verificar se o banco foi criado
SHOW DATABASES LIKE 'dashboard_admin';

-- Selecionar o banco
USE dashboard_admin;

-- Listar todas as tabelas
SHOW TABLES;

-- Contar registros
SELECT 'users' AS tabela, COUNT(*) AS total FROM users
UNION ALL
SELECT 'products', COUNT(*) FROM products
UNION ALL
SELECT 'orders', COUNT(*) FROM orders;
```

---

## 🏗️ Estrutura do Banco

### Diagrama ER

Veja o diagrama completo no arquivo [`DIAGRAMA.md`](./DIAGRAMA.md) com:
- Diagrama Mermaid interativo
- Modelo conceitual
- Relacionamentos detalhados
- Documentação de cada tabela

### Arquitetura

```
dashboard_admin/
│
├── Autenticação & Autorização
│   ├── users (usuários do sistema)
│   ├── roles (papéis/permissões)
│   └── user_roles (N:N relationship)
│
├── Gestão de Clientes & Vendas
│   ├── customers (clientes)
│   ├── products (catálogo de produtos)
│   ├── orders (pedidos)
│   └── order_items (itens dos pedidos)
│
├── Analytics & Métricas
│   └── metrics (KPIs e métricas)
│
└── Auditoria & Sessões
    ├── logs (logs de auditoria)
    └── sessions (sessões ativas)
```

---

## 📊 Tabelas Principais

### 1️⃣ **users** - Usuários do Sistema

Armazena os usuários que podem acessar o dashboard.

```sql
CREATE TABLE users (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    avatar VARCHAR(500),
    status ENUM('active', 'inactive', 'suspended'),
    last_login TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

**Campos principais:**
- `email`: Único, usado para login
- `password`: Hash bcrypt (nunca texto plano!)
- `status`: active, inactive, suspended
- `last_login`: Útil para relatórios de atividade

**Índices:**
- PRIMARY KEY (`id`)
- UNIQUE KEY (`email`)
- INDEX (`status`)

---

### 2️⃣ **roles** - Papéis e Permissões

Define os níveis de acesso no sistema.

```sql
CREATE TABLE roles (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT,
    permissions JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

**Papéis incluídos:**
- **Admin**: Acesso total (CRUD em tudo)
- **Editor**: Criar e editar (sem deletar)
- **Viewer**: Apenas visualização
- **Vendedor**: Foco em pedidos e clientes

**Permissões (JSON):**
```json
{
  "users": ["create", "read", "update", "delete"],
  "products": ["create", "read", "update", "delete"],
  "orders": ["create", "read", "update", "cancel"],
  "customers": ["create", "read", "update", "delete"],
  "reports": ["read", "export"],
  "settings": ["read", "update"]
}
```

---

### 3️⃣ **products** - Catálogo de Produtos

```sql
CREATE TABLE products (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    sku VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    stock_quantity INT NOT NULL DEFAULT 0,
    category VARCHAR(100),
    image_url VARCHAR(500),
    status ENUM('active', 'inactive', 'out_of_stock'),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

**Features:**
- SKU único para cada produto
- Controle de estoque automático (via trigger)
- Status muda para `out_of_stock` quando estoque = 0
- Categorização flexível

---

### 4️⃣ **orders** - Pedidos

```sql
CREATE TABLE orders (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    order_number VARCHAR(50) NOT NULL UNIQUE,
    customer_id BIGINT UNSIGNED NOT NULL,
    user_id BIGINT UNSIGNED,
    total_amount DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    discount_amount DECIMAL(10, 2) DEFAULT 0.00,
    final_amount DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    status ENUM('pending', 'processing', 'completed', 'cancelled'),
    payment_status ENUM('pending', 'paid', 'failed', 'refunded'),
    payment_method VARCHAR(50),
    notes TEXT,
    ordered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

**Status do Pedido:**
- `pending`: Aguardando processamento
- `processing`: Em processamento
- `completed`: Concluído ✅
- `cancelled`: Cancelado ❌

**Status de Pagamento:**
- `pending`: Aguardando pagamento
- `paid`: Pago ✅
- `failed`: Falha no pagamento ❌
- `refunded`: Reembolsado

---

### 5️⃣ **metrics** - Métricas e KPIs

Armazena dados para os gráficos do dashboard.

```sql
CREATE TABLE metrics (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    metric_type VARCHAR(50) NOT NULL,
    metric_name VARCHAR(100) NOT NULL,
    metric_value DECIMAL(15, 2) NOT NULL DEFAULT 0.00,
    reference_id BIGINT UNSIGNED,
    reference_type VARCHAR(50),
    metric_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Tipos de Métricas:**
- `daily_revenue`: Receita diária
- `monthly_revenue`: Receita mensal
- `order_count`: Contagem de pedidos
- `user_count`: Usuários ativos
- `product_views`: Visualizações de produtos
- `conversion_rate`: Taxa de conversão (%)
- `avg_ticket`: Ticket médio

**Exemplo de uso:**
```sql
-- Receita dos últimos 30 dias
SELECT metric_date, SUM(metric_value) as revenue
FROM metrics
WHERE metric_type = 'daily_revenue'
  AND metric_date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
GROUP BY metric_date
ORDER BY metric_date;
```

---

### 6️⃣ **logs** - Logs de Auditoria

Registra todas as ações importantes no sistema.

```sql
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
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Ações comuns:**
- `user.login` / `user.logout`
- `user.create` / `user.update` / `user.delete`
- `order.create` / `order.update` / `order.cancel`
- `product.create` / `product.update` / `product.delete`
- `settings.update`

**Exemplo de log:**
```json
{
  "action": "order.status_changed",
  "entity_type": "order",
  "entity_id": 123,
  "description": "Status alterado de pending para completed",
  "metadata": {
    "old_status": "pending",
    "new_status": "completed",
    "order_number": "ORD-000123"
  }
}
```

---

## 🔗 Relacionamentos

### Diagrama Simplificado

```
users ──1:N──> orders
users ──N:N──> roles (via user_roles)
users ──1:N──> sessions
users ──1:N──> logs

customers ──1:N──> orders

orders ──1:N──> order_items
products ──1:N──> order_items
```

### Detalhes dos Relacionamentos

| Relação | Tipo | Descrição | ON DELETE |
|---------|------|-----------|-----------|
| `users` → `user_roles` | 1:N | Um usuário tem múltiplos papéis | CASCADE |
| `roles` → `user_roles` | 1:N | Um papel para múltiplos usuários | CASCADE |
| `customers` → `orders` | 1:N | Cliente faz múltiplos pedidos | CASCADE |
| `users` → `orders` | 1:N | Vendedor processa pedidos | SET NULL |
| `orders` → `order_items` | 1:N | Pedido tem múltiplos itens | CASCADE |
| `products` → `order_items` | 1:N | Produto em múltiplos pedidos | RESTRICT |
| `users` → `sessions` | 1:N | Usuário com múltiplas sessões | CASCADE |
| `users` → `logs` | 1:N | Usuário gera logs | SET NULL |

---

## 🔧 Views e Procedures

### Views Disponíveis

#### 1. `vw_orders_complete`
Pedidos com informações completas (customer, user, items).

```sql
SELECT * FROM vw_orders_complete;
```

**Colunas:**
- order_number, status, payment_status
- customer_name, customer_email
- processed_by (nome do vendedor)
- total_items, final_amount

#### 2. `vw_low_stock_products`
Produtos com estoque baixo (< 10 unidades).

```sql
SELECT * FROM vw_low_stock_products;
```

#### 3. `vw_daily_metrics`
Métricas diárias resumidas.

```sql
SELECT * FROM vw_daily_metrics
ORDER BY metric_date DESC
LIMIT 30;
```

#### 4. `vw_top_products`
Top 10 produtos mais vendidos.

```sql
SELECT * FROM vw_top_products;
```

#### 5. `vw_users_with_roles`
Usuários com seus papéis concatenados.

```sql
SELECT * FROM vw_users_with_roles
WHERE status = 'active';
```

---

### Stored Procedure

#### `sp_create_order`
Cria um novo pedido com múltiplos itens em uma transação.

**Parâmetros:**
- `p_customer_id`: ID do cliente
- `p_user_id`: ID do vendedor
- `p_payment_method`: Método de pagamento
- `p_items`: JSON com array de itens

**Exemplo de uso:**
```sql
CALL sp_create_order(
    1,
    1,
    'Cartão de Crédito',
    '[
        {"product_id": 1, "quantity": 2},
        {"product_id": 3, "quantity": 1}
    ]'
);
```

**O que faz:**
- ✅ Gera número de pedido único (ORD-XXXXXX)
- ✅ Cria o pedido
- ✅ Insere todos os itens
- ✅ Calcula o total automaticamente
- ✅ Tudo em uma transação (ROLLBACK em caso de erro)

---

### Triggers Automáticos

#### 1. `trg_order_items_after_insert`
Atualiza o estoque automaticamente após inserir item no pedido.

```sql
-- Ao inserir um item:
-- - Diminui o estoque do produto
-- - Muda status para 'out_of_stock' se necessário
```

#### 2. `trg_orders_after_update`
Registra log quando o status do pedido muda.

```sql
-- Ao mudar status de um pedido:
-- - Cria um log automático
-- - Registra old_status e new_status
```

#### 3. `trg_orders_before_update_completion`
Define `completed_at` quando pedido é completado.

```sql
-- Ao marcar como 'completed':
-- - Preenche completed_at automaticamente
```

---

## 💡 Queries Úteis

### Dashboard - Cards de Métricas

```sql
-- Total de receita (pedidos pagos)
SELECT 
    CONCAT('R$ ', FORMAT(SUM(final_amount), 2, 'de_DE')) AS total_revenue
FROM orders
WHERE payment_status = 'paid';

-- Total de pedidos hoje
SELECT COUNT(*) AS orders_today
FROM orders
WHERE DATE(created_at) = CURDATE();

-- Usuários ativos
SELECT COUNT(*) AS active_users
FROM users
WHERE status = 'active';

-- Produtos em estoque baixo
SELECT COUNT(*) AS low_stock_products
FROM products
WHERE stock_quantity < 10 AND status = 'active';
```

---

### Analytics - Gráficos

#### Receita dos últimos 30 dias (Linha)
```sql
SELECT 
    DATE_FORMAT(metric_date, '%d/%m') AS data,
    SUM(metric_value) AS receita
FROM metrics
WHERE metric_type = 'daily_revenue'
  AND metric_date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
GROUP BY metric_date
ORDER BY metric_date;
```

#### Distribuição de pedidos por status (Pizza)
```sql
SELECT 
    status,
    COUNT(*) AS total,
    ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM orders), 2) AS percentual
FROM orders
GROUP BY status;
```

#### Top 10 clientes por valor
```sql
SELECT 
    c.name AS cliente,
    COUNT(o.id) AS total_pedidos,
    SUM(o.final_amount) AS valor_total
FROM customers c
INNER JOIN orders o ON c.id = o.customer_id
WHERE o.payment_status = 'paid'
GROUP BY c.id
ORDER BY valor_total DESC
LIMIT 10;
```

#### Produtos mais vendidos
```sql
SELECT 
    p.name AS produto,
    p.category AS categoria,
    SUM(oi.quantity) AS quantidade_vendida,
    SUM(oi.subtotal) AS receita_total
FROM products p
INNER JOIN order_items oi ON p.id = oi.product_id
INNER JOIN orders o ON oi.order_id = o.id
WHERE o.payment_status = 'paid'
GROUP BY p.id
ORDER BY quantidade_vendida DESC
LIMIT 10;
```

---

### Relatórios

#### Vendas por vendedor (mês atual)
```sql
SELECT 
    u.name AS vendedor,
    COUNT(o.id) AS total_pedidos,
    SUM(o.final_amount) AS valor_total,
    AVG(o.final_amount) AS ticket_medio
FROM users u
INNER JOIN orders o ON u.id = o.user_id
WHERE MONTH(o.created_at) = MONTH(CURDATE())
  AND YEAR(o.created_at) = YEAR(CURDATE())
  AND o.payment_status = 'paid'
GROUP BY u.id
ORDER BY valor_total DESC;
```

#### Pedidos pendentes
```sql
SELECT 
    o.order_number,
    c.name AS cliente,
    c.email,
    c.phone,
    o.final_amount,
    o.payment_method,
    DATE_FORMAT(o.ordered_at, '%d/%m/%Y %H:%i') AS data_pedido
FROM orders o
INNER JOIN customers c ON o.customer_id = c.id
WHERE o.status = 'pending'
ORDER BY o.ordered_at DESC;
```

#### Logs de auditoria (últimas 24h)
```sql
SELECT 
    u.name AS usuario,
    l.action AS acao,
    l.entity_type AS tipo,
    l.description AS descricao,
    DATE_FORMAT(l.created_at, '%d/%m/%Y %H:%i:%s') AS data_hora
FROM logs l
LEFT JOIN users u ON l.user_id = u.id
WHERE l.created_at >= DATE_SUB(NOW(), INTERVAL 24 HOUR)
ORDER BY l.created_at DESC;
```

---

## 🔐 Segurança

### Boas Práticas Implementadas

1. **Senhas**: Sempre usar bcrypt ou argon2 (nunca texto plano)
2. **Injection**: Usar prepared statements na API
3. **Foreign Keys**: Garantem integridade referencial
4. **Triggers**: Logs automáticos de mudanças críticas
5. **Timestamps**: Rastreamento de criação/atualização
6. **Índices**: Performance otimizada

### Credenciais do Seed

**Todos os usuários têm a senha**: `senha123`

**Hash bcrypt**: `$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy`

**Para gerar novos hashes** (Node.js):
```javascript
const bcrypt = require('bcrypt');
const hash = await bcrypt.hash('minhasenha', 10);
```

---

## 💾 Manutenção e Backup

### Backup Completo

```bash
# Backup do schema + dados
mysqldump -u root -p dashboard_admin > backup_$(date +%Y%m%d).sql

# Backup apenas schema
mysqldump -u root -p --no-data dashboard_admin > schema_backup.sql

# Backup apenas dados
mysqldump -u root -p --no-create-info dashboard_admin > data_backup.sql
```

### Restaurar Backup

```bash
mysql -u root -p dashboard_admin < backup_20241224.sql
```

### Limpeza de Logs Antigos

```sql
-- Deletar logs com mais de 90 dias
DELETE FROM logs
WHERE created_at < DATE_SUB(NOW(), INTERVAL 90 DAY);

-- Deletar sessões expiradas
DELETE FROM sessions
WHERE expires_at < NOW();
```

### Otimização de Tabelas

```sql
-- Analisar tabelas
ANALYZE TABLE users, products, orders, order_items;

-- Otimizar tabelas
OPTIMIZE TABLE users, products, orders, order_items;

-- Verificar integridade
CHECK TABLE users, products, orders, order_items;
```

---

## 🚀 Melhorias Futuras

### Fase 2 - Funcionalidades Adicionais

1. **Notificações**
```sql
CREATE TABLE notifications (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED,
    title VARCHAR(200),
    message TEXT,
    type ENUM('info', 'warning', 'success', 'error'),
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

2. **Configurações do Sistema**
```sql
CREATE TABLE settings (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    key_name VARCHAR(100) UNIQUE,
    key_value TEXT,
    description TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

3. **Anexos/Arquivos**
```sql
CREATE TABLE attachments (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    entity_type VARCHAR(50),
    entity_id BIGINT UNSIGNED,
    file_name VARCHAR(255),
    file_path VARCHAR(500),
    file_size INT,
    mime_type VARCHAR(100),
    uploaded_by BIGINT UNSIGNED,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

4. **Categorias Hierárquicas**
```sql
CREATE TABLE categories (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    slug VARCHAR(100) UNIQUE,
    parent_id INT UNSIGNED,
    description TEXT,
    FOREIGN KEY (parent_id) REFERENCES categories(id)
);
```

### Fase 3 - Performance e Escalabilidade

1. **Particionamento**: Particionar `logs` e `metrics` por data
2. **Índices Full-Text**: Para busca avançada em produtos
3. **Cache**: Redis para queries frequentes
4. **Read Replicas**: Para relatórios pesados
5. **Sharding**: Se necessário para grande volume

---

## 🐛 Troubleshooting

### Problema: Erro ao criar Foreign Key

**Erro:**
```
ERROR 1215 (HY000): Cannot add foreign key constraint
```

**Solução:**
1. Verifique se as tabelas referenciadas existem
2. Verifique se os tipos de dados são compatíveis
3. Verifique se a coluna referenciada tem índice

```sql
-- Verificar estrutura
SHOW CREATE TABLE users;
SHOW CREATE TABLE orders;
```

---

### Problema: Charset incorreto

**Erro:**
```
Incorrect string value: '\xF0\x9F...'
```

**Solução:**
```sql
-- Converter para UTF8MB4
ALTER DATABASE dashboard_admin 
CHARACTER SET = utf8mb4 
COLLATE = utf8mb4_unicode_ci;

ALTER TABLE users 
CONVERT TO CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;
```

---

### Problema: Estoque negativo

O trigger `trg_order_items_after_insert` reduz o estoque automaticamente.

**Prevenção:**
```sql
-- Adicionar constraint
ALTER TABLE products
ADD CONSTRAINT chk_stock_positive 
CHECK (stock_quantity >= 0);
```

---

### Problema: Performance lenta

**Diagnóstico:**
```sql
-- Queries lentas
SHOW PROCESSLIST;

-- Análise de índices
EXPLAIN SELECT * FROM orders WHERE customer_id = 1;

-- Estatísticas da tabela
SHOW TABLE STATUS LIKE 'orders';
```

**Otimizações:**
```sql
-- Adicionar índices compostos
CREATE INDEX idx_orders_customer_date 
ON orders(customer_id, ordered_at);

-- Atualizar estatísticas
ANALYZE TABLE orders;
```

---

## 📞 Suporte

Para dúvidas ou problemas:

1. Consulte a documentação completa no [`DIAGRAMA.md`](./DIAGRAMA.md)
2. Verifique as queries de exemplo acima
3. Consulte os comentários no `schema.sql`

---

## 📚 Referências

- [MySQL 8.0 Documentation](https://dev.mysql.com/doc/)
- [Database Normalization](https://en.wikipedia.org/wiki/Database_normalization)
- [SQL Performance Tuning](https://use-the-index-luke.com/)
- [Bcrypt Hashing](https://www.npmjs.com/package/bcrypt)

---

## 📄 Licença

Este banco de dados faz parte do projeto **Dashboard Administrativo**.

---

**Criado por**: Desenvolvedor Sênior de Banco de Dados  
**Data**: Dezembro 2024  
**Versão**: 1.0.0  
**Compatibilidade**: MySQL 8.0+

---

## ✅ Checklist de Implementação

- [x] Schema SQL completo
- [x] Seed com dados realistas
- [x] Normalização 3FN
- [x] Índices otimizados
- [x] Foreign keys com integridade
- [x] Views úteis
- [x] Stored procedures
- [x] Triggers automáticos
- [x] Documentação completa
- [x] Queries de exemplo
- [x] Guia de troubleshooting

**Status**: ✅ **PRONTO PARA PRODUÇÃO**
