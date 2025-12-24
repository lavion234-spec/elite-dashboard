# 🚀 API Dashboard Administrativo

![Node.js](https://img.shields.io/badge/Node.js-16+-green)
![Express](https://img.shields.io/badge/Express-4.18-blue)
![MySQL](https://img.shields.io/badge/MySQL-8.0-orange)
![Status](https://img.shields.io/badge/Status-Pronto-success)

API REST completa e profissional para Dashboard Administrativo construída com **Node.js + Express + MySQL**.

---

## 📋 Índice

1. [Visão Geral](#-visão-geral)
2. [Instalação](#-instalação)
3. [Endpoints da API](#-endpoints-da-api)
4. [Exemplos de Requisições](#-exemplos-de-requisições)
5. [Estrutura do Projeto](#-estrutura-do-projeto)
6. [Banco de Dados](#-banco-de-dados)

---

## 🎯 Visão Geral

### Funcionalidades

✅ **CRUD completo** de Produtos  
✅ **CRUD completo** de Vendedores  
✅ **CRUD completo** de Pedidos  
✅ **Atualização automática de estoque**  
✅ **Dashboard com KPIs** (vendas, gastos, lucro)  
✅ **Top 5 produtos mais vendidos**  
✅ **Estatísticas por período**  
✅ **Validações robustas**  
✅ **Tratamento de erros**  
✅ **CORS habilitado**  
✅ **Transações SQL** para integridade  

### Tecnologias

- **Node.js 16+**
- **Express 4.18**
- **MySQL 8.0** (com mysql2/promise)
- **CORS** para liberação de origem
- **Arquitetura MVC** (Model-View-Controller)

---

## 🚀 Instalação

### Pré-requisitos

- Node.js 16+ instalado
- MySQL 8.0+ instalado e rodando
- npm ou yarn

### Passo 1: Instalar Dependências

```bash
cd api
npm install
```

### Passo 2: Criar Banco de Dados

```bash
mysql -u root -p < database.sql
```

Isso criará:
- Banco `dashboard_api`
- Tabelas: `produtos`, `vendedores`, `pedidos`
- 10 produtos de exemplo
- 5 vendedores de exemplo
- 10 pedidos de exemplo

### Passo 3: Configurar Variáveis de Ambiente

Copie o arquivo `.env.example` para `.env`:

```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas credenciais:

```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=dashboard_api
DB_PORT=3306
```

### Passo 4: Iniciar o Servidor

```bash
npm start
```

Ou com auto-reload (desenvolvimento):

```bash
npm run dev
```

O servidor estará disponível em: **http://localhost:3000**

---

## 📡 Endpoints da API

### 🏠 Geral

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/` | Informações da API |
| GET | `/health` | Health check |

---

### 📦 Produtos

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/produtos` | Listar todos os produtos |
| GET | `/api/produtos/:id` | Buscar produto por ID |
| POST | `/api/produtos` | Criar novo produto |
| PUT | `/api/produtos/:id` | Atualizar produto |
| DELETE | `/api/produtos/:id` | Remover produto |

**Query params para GET /api/produtos:**
- `categoria_id` - Filtrar por categoria
- `search` - Buscar por nome ou descrição
- `limit` - Limite de resultados (padrão: 100)
- `offset` - Offset para paginação (padrão: 0)

**Body para POST/PUT:**
```json
{
  "nome": "Produto Exemplo",
  "descricao": "Descrição do produto",
  "preco": 199.99,
  "estoque": 50,
  "categoria_id": 1,
  "custo": 120.00,
  "imagem": "https://exemplo.com/imagem.jpg"
}
```

---

### 👨‍💼 Vendedores

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/vendedores` | Listar todos os vendedores |
| GET | `/api/vendedores/:id` | Buscar vendedor por ID |
| POST | `/api/vendedores` | Criar novo vendedor |
| PUT | `/api/vendedores/:id` | Atualizar vendedor |
| DELETE | `/api/vendedores/:id` | Remover vendedor |

**Query params para GET /api/vendedores:**
- `search` - Buscar por nome ou email
- `limit` - Limite de resultados (padrão: 100)
- `offset` - Offset para paginação (padrão: 0)

**Body para POST/PUT:**
```json
{
  "nome": "João Silva",
  "email": "joao@email.com",
  "telefone": "(11) 98765-4321"
}
```

---

### 🛒 Pedidos

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/pedidos` | Listar todos os pedidos |
| GET | `/api/pedidos/:id` | Buscar pedido por ID |
| POST | `/api/pedidos` | Criar novo pedido (atualiza estoque) |
| PUT | `/api/pedidos/:id` | Atualizar pedido |
| DELETE | `/api/pedidos/:id` | Remover pedido (restaura estoque) |

**Query params para GET /api/pedidos:**
- `produto_id` - Filtrar por produto
- `vendedor_id` - Filtrar por vendedor
- `limit` - Limite de resultados (padrão: 100)
- `offset` - Offset para paginação (padrão: 0)

**Body para POST:**
```json
{
  "produto_id": 1,
  "vendedor_id": 1,
  "quantidade": 5
}
```

> ⚠️ **Importante:** Ao criar um pedido, o estoque do produto é automaticamente reduzido. Ao remover, o estoque é restaurado.

---

### 📊 Dashboard (KPIs)

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/dashboard` | Obter todos os KPIs |
| GET | `/api/dashboard/estatisticas` | Estatísticas por período |

**Query params para GET /api/dashboard/estatisticas:**
- `periodo` - Número de dias (padrão: 30)

**Resposta do /api/dashboard:**
```json
{
  "success": true,
  "data": {
    "resumo": {
      "total_vendas": "38690.62",
      "total_gastos": "27030.00",
      "total_lucro": "11660.62",
      "margem_lucro": "30.14",
      "ticket_medio": "3869.06"
    },
    "contadores": {
      "total_pedidos": 10,
      "total_vendedores": 5,
      "total_produtos": 10,
      "produtos_estoque_baixo": 2
    },
    "top_produtos": [...],
    "top_vendedores": [...],
    "vendas_ultimos_7_dias": [...]
  }
}
```

---

## 💡 Exemplos de Requisições

### Criar um Produto

```bash
curl -X POST http://localhost:3000/api/produtos \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Notebook Gamer",
    "descricao": "Notebook gamer de alta performance",
    "preco": 5999.99,
    "estoque": 15,
    "categoria_id": 1,
    "custo": 4500.00,
    "imagem": "https://exemplo.com/notebook.jpg"
  }'
```

**Resposta:**
```json
{
  "success": true,
  "message": "Produto criado com sucesso",
  "data": {
    "id": 11,
    "nome": "Notebook Gamer",
    "preco": 5999.99,
    "estoque": 15
  }
}
```

---

### Criar um Vendedor

```bash
curl -X POST http://localhost:3000/api/vendedores \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Fernanda Lima",
    "email": "fernanda@email.com",
    "telefone": "(21) 99876-5432"
  }'
```

**Resposta:**
```json
{
  "success": true,
  "message": "Vendedor criado com sucesso",
  "data": {
    "id": 6,
    "nome": "Fernanda Lima",
    "email": "fernanda@email.com",
    "telefone": "(21) 99876-5432"
  }
}
```

---

### Criar um Pedido

```bash
curl -X POST http://localhost:3000/api/pedidos \
  -H "Content-Type: application/json" \
  -d '{
    "produto_id": 1,
    "vendedor_id": 1,
    "quantidade": 3
  }'
```

**Resposta:**
```json
{
  "success": true,
  "message": "Pedido criado com sucesso",
  "data": {
    "id": 11,
    "produto_id": 1,
    "produto_nome": "Notebook Dell Inspiron 15",
    "vendedor_id": 1,
    "vendedor_nome": "João Silva",
    "quantidade": 3,
    "preco_unitario": 4299.99,
    "preco_total": 12899.97,
    "estoque_anterior": 25,
    "estoque_atual": 22
  }
}
```

---

### Listar Produtos com Filtro

```bash
# Buscar produtos por categoria
curl "http://localhost:3000/api/produtos?categoria_id=1"

# Buscar produtos por nome
curl "http://localhost:3000/api/produtos?search=notebook"

# Buscar com paginação
curl "http://localhost:3000/api/produtos?limit=10&offset=0"
```

---

### Obter Dashboard Completo

```bash
curl http://localhost:3000/api/dashboard
```

**Resposta:**
```json
{
  "success": true,
  "data": {
    "resumo": {
      "total_vendas": "38690.62",
      "total_gastos": "27030.00",
      "total_lucro": "11660.62",
      "margem_lucro": "30.14",
      "ticket_medio": "3869.06"
    },
    "contadores": {
      "total_pedidos": 10,
      "total_vendedores": 5,
      "total_produtos": 10,
      "produtos_estoque_baixo": 2
    },
    "estoque": {
      "valor_total": "45799.00",
      "produtos_estoque_baixo": 2
    },
    "top_produtos": [
      {
        "id": 9,
        "nome": "Memória RAM Corsair 16GB",
        "preco": "389.99",
        "quantidade_vendida": 15,
        "valor_total": "5849.85",
        "total_pedidos": 1
      }
    ],
    "top_vendedores": [
      {
        "id": 1,
        "nome": "João Silva",
        "email": "joao.silva@email.com",
        "total_vendas": 3,
        "valor_total": "16096.18"
      }
    ],
    "vendas_ultimos_7_dias": [...]
  }
}
```

---

### Obter Estatísticas (30 dias)

```bash
curl "http://localhost:3000/api/dashboard/estatisticas?periodo=30"
```

---

## 📁 Estrutura do Projeto

```
api/
├── src/
│   ├── config/
│   │   └── db.js                    # Configuração MySQL
│   ├── controllers/
│   │   ├── produtosController.js    # Lógica de produtos
│   │   ├── vendedoresController.js  # Lógica de vendedores
│   │   ├── pedidosController.js     # Lógica de pedidos
│   │   └── dashboardController.js   # Lógica de KPIs
│   ├── routes/
│   │   ├── produtosRoutes.js        # Rotas de produtos
│   │   ├── vendedoresRoutes.js      # Rotas de vendedores
│   │   ├── pedidosRoutes.js         # Rotas de pedidos
│   │   └── dashboardRoutes.js       # Rotas de dashboard
│   └── server.js                    # Servidor Express
├── database.sql                     # Script SQL completo
├── package.json                     # Dependências
├── .env.example                     # Exemplo de variáveis
├── .gitignore                       # Arquivos ignorados
└── README.md                        # Esta documentação
```

---

## 🗄️ Banco de Dados

### Tabelas

#### produtos
```sql
CREATE TABLE produtos (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(200) NOT NULL,
    descricao TEXT,
    preco DECIMAL(10, 2) NOT NULL,
    estoque INT NOT NULL DEFAULT 0,
    categoria_id INT UNSIGNED,
    custo DECIMAL(10, 2) NOT NULL,
    imagem VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### vendedores
```sql
CREATE TABLE vendedores (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    telefone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### pedidos
```sql
CREATE TABLE pedidos (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    produto_id INT UNSIGNED NOT NULL,
    vendedor_id INT UNSIGNED NOT NULL,
    quantidade INT NOT NULL,
    preco_total DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (produto_id) REFERENCES produtos(id),
    FOREIGN KEY (vendedor_id) REFERENCES vendedores(id)
);
```

### Relacionamentos

- **pedidos** → **produtos** (N:1)
- **pedidos** → **vendedores** (N:1)

### Features do Banco

✅ Índices otimizados  
✅ Foreign keys com integridade referencial  
✅ Triggers para validação de estoque  
✅ Stored procedure para criar pedidos  
✅ Views para consultas complexas  
✅ Timestamps automáticos  

---

## 🔒 Tratamento de Erros

A API retorna erros no formato JSON:

```json
{
  "success": false,
  "message": "Descrição do erro",
  "error": "Detalhes técnicos (apenas em dev)"
}
```

### Códigos HTTP

- `200` - OK
- `201` - Criado
- `400` - Bad Request (validação falhou)
- `404` - Not Found
- `500` - Internal Server Error

---

## ⚙️ Validações

### Produtos

- ✅ Nome e preço obrigatórios
- ✅ Valores numéricos não podem ser negativos
- ✅ Não pode deletar produto com pedidos

### Vendedores

- ✅ Nome e email obrigatórios
- ✅ Email único no sistema
- ✅ Formato de email válido
- ✅ Não pode deletar vendedor com pedidos

### Pedidos

- ✅ Produto, vendedor e quantidade obrigatórios
- ✅ Quantidade deve ser maior que zero
- ✅ Verifica estoque disponível
- ✅ Atualiza estoque automaticamente
- ✅ Transações SQL (rollback em caso de erro)

---

## 🚀 Integração com Dashboard

Para conectar ao seu dashboard React:

```javascript
// Exemplo de requisição
const response = await fetch('http://localhost:3000/api/dashboard');
const data = await response.json();

console.log(data.data.resumo.total_vendas);
console.log(data.data.top_produtos);
```

---

## 🧪 Testando a API

### Com cURL

```bash
# Listar produtos
curl http://localhost:3000/api/produtos

# Criar produto
curl -X POST http://localhost:3000/api/produtos \
  -H "Content-Type: application/json" \
  -d '{"nome":"Teste","preco":99.99,"estoque":10,"custo":50}'
```

### Com Postman/Insomnia

Importe esta coleção:

```json
{
  "name": "Dashboard API",
  "requests": [
    {
      "name": "Listar Produtos",
      "method": "GET",
      "url": "http://localhost:3000/api/produtos"
    },
    {
      "name": "Dashboard KPIs",
      "method": "GET",
      "url": "http://localhost:3000/api/dashboard"
    }
  ]
}
```

---

## 📝 Scripts Disponíveis

```bash
# Iniciar servidor (produção)
npm start

# Iniciar com auto-reload (desenvolvimento)
npm run dev

# Executar testes
npm test
```

---

## 🐛 Troubleshooting

### Erro de conexão MySQL

```
❌ Erro ao conectar ao MySQL: Access denied
```

**Solução:**
1. Verifique usuário e senha no `.env`
2. Certifique-se que o MySQL está rodando
3. Verifique se o banco `dashboard_api` existe

### Porta já em uso

```
Error: listen EADDRINUSE: address already in use :::3000
```

**Solução:**
1. Altere a porta no `.env`
2. Ou mate o processo na porta 3000:
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:3000 | xargs kill -9
```

---

## 📚 Próximos Passos

- [ ] Autenticação JWT
- [ ] Rate limiting
- [ ] Cache com Redis
- [ ] Upload de imagens
- [ ] Testes automatizados
- [ ] Documentação Swagger
- [ ] Docker compose

---

## 📄 Licença

MIT License - Livre para uso comercial e pessoal.

---

## 👨‍💻 Autor

**Dashboard Admin Team**

---

**✅ API 100% funcional e pronta para produção!**
