# ⚡ Guia Rápido - API Dashboard

## 🚀 Iniciar em 3 Passos

### 1️⃣ Instalar Dependências
```bash
cd api
npm install
```

### 2️⃣ Criar Banco de Dados
```bash
mysql -u root -p < database.sql
```

### 3️⃣ Iniciar Servidor
```bash
npm start
```

✅ **Pronto!** API rodando em: http://localhost:3000

---

## 📡 Endpoints Principais

```bash
# Dashboard (KPIs)
GET http://localhost:3000/api/dashboard

# Listar produtos
GET http://localhost:3000/api/produtos

# Criar produto
POST http://localhost:3000/api/produtos
Content-Type: application/json
{
  "nome": "Produto Teste",
  "preco": 199.99,
  "estoque": 50,
  "custo": 120.00
}

# Criar pedido (atualiza estoque)
POST http://localhost:3000/api/pedidos
Content-Type: application/json
{
  "produto_id": 1,
  "vendedor_id": 1,
  "quantidade": 5
}

# Listar vendedores
GET http://localhost:3000/api/vendedores
```

---

## 🎯 Testar no Navegador

Abra no navegador:
- http://localhost:3000 → Informações da API
- http://localhost:3000/api/dashboard → KPIs completos
- http://localhost:3000/api/produtos → Lista de produtos
- http://localhost:3000/health → Status do servidor

---

## 📊 Resposta do Dashboard

```json
{
  "success": true,
  "data": {
    "resumo": {
      "total_vendas": "38690.62",
      "total_gastos": "27030.00",
      "total_lucro": "11660.62",
      "margem_lucro": "30.14"
    },
    "contadores": {
      "total_pedidos": 10,
      "total_vendedores": 5,
      "total_produtos": 10
    },
    "top_produtos": [...],
    "top_vendedores": [...]
  }
}
```

---

## 🔧 Configurar (Opcional)

Crie arquivo `.env`:
```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=dashboard_api
```

---

## 📦 O que foi criado?

✅ 10 produtos de exemplo  
✅ 5 vendedores de exemplo  
✅ 10 pedidos de exemplo  
✅ Todos os endpoints funcionando  
✅ Estoque atualizado automaticamente  
✅ Dashboard com KPIs calculados  

---

## 🐛 Problemas?

**Erro de conexão MySQL?**
```bash
# Verifique se o MySQL está rodando
mysql -u root -p
```

**Porta 3000 já em uso?**
```bash
# Altere no .env
PORT=3001
```

---

## 📚 Documentação Completa

Leia o [README.md](README.md) para:
- Todos os endpoints detalhados
- Exemplos de requisições
- Validações e tratamento de erros
- Estrutura do banco de dados

---

✅ **API pronta para integrar com seu dashboard React!**
