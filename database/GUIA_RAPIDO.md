# 🚀 Guia Rápido - Banco de Dados

## ⚡ Instalação em 3 Passos

### 1️⃣ Criar o Schema
```bash
mysql -u root -p < database/schema.sql
```

### 2️⃣ Popular com Dados
```bash
mysql -u root -p < database/seed.sql
```

### 3️⃣ Verificar
```sql
USE dashboard_admin;
SHOW TABLES;
SELECT COUNT(*) FROM users;
```

---

## 📊 Dados Prontos

- ✅ **10 usuários** (senha: `senha123`)
- ✅ **10 clientes**
- ✅ **15 produtos**
- ✅ **15 pedidos** completos
- ✅ **30+ métricas** para gráficos
- ✅ **15+ logs** de auditoria

---

## 🔑 Usuários de Teste

| Email | Senha | Papel |
|-------|-------|-------|
| joao@email.com | senha123 | Admin |
| maria@email.com | senha123 | Editor |
| pedro@email.com | senha123 | Viewer |
| ana@email.com | senha123 | Vendedor |

---

## 📈 Queries Essenciais

### Dashboard - Métricas Principais
```sql
-- Total de receita
SELECT SUM(final_amount) AS total_revenue
FROM orders WHERE payment_status = 'paid';

-- Pedidos hoje
SELECT COUNT(*) FROM orders
WHERE DATE(created_at) = CURDATE();

-- Usuários ativos
SELECT COUNT(*) FROM users WHERE status = 'active';
```

### Analytics - Gráfico de Receita (30 dias)
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

### Top Produtos
```sql
SELECT * FROM vw_top_products LIMIT 10;
```

### Pedidos Completos
```sql
SELECT * FROM vw_orders_complete
ORDER BY ordered_at DESC
LIMIT 20;
```

---

## 🛠️ Views Prontas

| View | Descrição |
|------|-----------|
| `vw_orders_complete` | Pedidos com todas as informações |
| `vw_low_stock_products` | Produtos com estoque < 10 |
| `vw_daily_metrics` | Métricas diárias resumidas |
| `vw_top_products` | Top 10 mais vendidos |
| `vw_users_with_roles` | Usuários com seus papéis |

---

## 🔄 Criar Pedido (Procedure)

```sql
CALL sp_create_order(
    1,  -- customer_id
    1,  -- user_id (vendedor)
    'PIX',  -- payment_method
    '[{"product_id": 1, "quantity": 2}, {"product_id": 3, "quantity": 1}]'
);
```

---

## 🗂️ Estrutura de Pastas

```
database/
├── README.md           # 📖 Documentação completa
├── DIAGRAMA.md         # 📐 Diagrama ER + Modelo
├── schema.sql          # 🏗️  Estrutura do banco
├── seed.sql            # 🌱 Dados iniciais
└── GUIA_RAPIDO.md      # ⚡ Este arquivo
```

---

## 💾 Backup

```bash
# Backup completo
mysqldump -u root -p dashboard_admin > backup.sql

# Restaurar
mysql -u root -p dashboard_admin < backup.sql
```

---

## 🐛 Problemas Comuns

**Erro de Foreign Key?**
```sql
SET FOREIGN_KEY_CHECKS = 0;
-- execute seu comando
SET FOREIGN_KEY_CHECKS = 1;
```

**Charset errado?**
```sql
ALTER DATABASE dashboard_admin
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;
```

---

## 📞 Precisa de Ajuda?

1. Consulte o [`README.md`](./README.md) completo
2. Veja o [`DIAGRAMA.md`](./DIAGRAMA.md) detalhado
3. Confira os comentários no `schema.sql`

---

✅ **Banco pronto para integrar com sua API!**
