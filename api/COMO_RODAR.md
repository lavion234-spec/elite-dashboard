# 🎯 COMO COLOCAR A API PARA RODAR

## ✅ STATUS ATUAL

### O que já está feito:
- ✅ Dependências instaladas (110 pacotes)
- ✅ Arquivo .env configurado
- ✅ Servidor funcionando (com aviso de MySQL)

### ⚠️ O que precisa ser feito:

**1. Instalar/Iniciar o MySQL**

O servidor está rodando, mas sem conexão com MySQL porque:
- O MySQL não está instalado OU
- O MySQL não está rodando OU
- O MySQL está em outra porta

---

## 🚀 OPÇÕES PARA RODAR O MYSQL

### Opção 1: XAMPP (Mais fácil)

```bash
# 1. Baixe o XAMPP
https://www.apachefriends.org/download.html

# 2. Instale o XAMPP

# 3. Abra o XAMPP Control Panel

# 4. Clique em "Start" ao lado de MySQL

# 5. Execute o script SQL:
"C:\xampp\mysql\bin\mysql.exe" -u root < database.sql

# 6. Reinicie a API:
npm start
```

### Opção 2: MySQL Server

```bash
# 1. Baixe o MySQL Server
https://dev.mysql.com/downloads/installer/

# 2. Instale o MySQL

# 3. Inicie o serviço MySQL

# 4. Execute o script SQL:
"C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" -u root -p < database.sql

# 5. Reinicie a API:
npm start
```

### Opção 3: MySQL Workbench (Visual)

```bash
# 1. Abra o MySQL Workbench

# 2. Conecte ao servidor local

# 3. Clique em "File" > "Open SQL Script"

# 4. Selecione o arquivo: api/database.sql

# 5. Clique no botão ⚡ "Execute"

# 6. Reinicie a API:
npm start
```

---

## 📡 TESTAR A API (MESMO SEM MYSQL)

Você pode testar se a API está respondendo:

### No Navegador:
```
http://localhost:3000
http://localhost:3000/health
```

### No PowerShell:
```powershell
# Informações da API
Invoke-RestMethod -Uri "http://localhost:3000"

# Health check
Invoke-RestMethod -Uri "http://localhost:3000/health"

# Criar produto (vai falhar sem MySQL, mas mostra que a API responde)
$body = @{
    nome = "Produto Teste"
    preco = 199.99
    estoque = 50
    custo = 120.00
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/produtos" -Method Post -Body $body -ContentType "application/json"
```

---

## 🎯 QUANDO O MYSQL ESTIVER RODANDO

### 1. Verificar se a API conectou:

Reinicie a API e você verá:
```
✅ Conectado ao MySQL com sucesso!
📊 Banco de dados: dashboard_api
```

### 2. Testar endpoints com dados:

```powershell
# Dashboard (KPIs)
Invoke-RestMethod -Uri "http://localhost:3000/api/dashboard"

# Listar produtos
Invoke-RestMethod -Uri "http://localhost:3000/api/produtos"

# Listar vendedores
Invoke-RestMethod -Uri "http://localhost:3000/api/vendedores"

# Listar pedidos
Invoke-RestMethod -Uri "http://localhost:3000/api/pedidos"
```

---

## 📊 O QUE VEM NO BANCO

Quando você executar o `database.sql`, serão criados:

- ✅ **10 produtos** (notebooks, periféricos, componentes)
- ✅ **5 vendedores** (João Silva, Maria Santos, etc)
- ✅ **10 pedidos** (R$ 38.690,62 em vendas)

E você poderá ver no dashboard:
```json
{
  "resumo": {
    "total_vendas": "38690.62",
    "total_gastos": "27030.00",
    "total_lucro": "11660.62",
    "margem_lucro": "30.14%"
  },
  "top_produtos": [...],
  "top_vendedores": [...]
}
```

---

## 🔧 COMANDOS ÚTEIS

```powershell
# Iniciar API
cd "c:\Users\mc-me\OneDrive\Documentos\PROJETO DASH BOARD\api"
npm start

# Iniciar API com auto-reload (desenvolvimento)
npm run dev

# Parar servidor (CTRL+C no terminal)

# Verificar se está rodando
Invoke-RestMethod -Uri "http://localhost:3000/health"
```

---

## 🐛 TROUBLESHOOTING

### Erro: "Porta 3000 já em uso"
```powershell
# Encontrar processo na porta 3000
netstat -ano | findstr :3000

# Matar processo
taskkill /PID <PID> /F
```

### Erro: "Cannot find module"
```powershell
# Reinstalar dependências
npm install
```

### Erro: "MySQL connection refused"
- Verifique se o MySQL está rodando
- Verifique as credenciais no arquivo `.env`
- Tente mudar `DB_HOST` de `localhost` para `127.0.0.1`

---

## 📁 ARQUIVOS IMPORTANTES

```
api/
├── src/server.js       → Servidor Express (RODANDO ✅)
├── database.sql        → Script SQL (PRECISA EXECUTAR ⚠️)
├── .env                → Configurações (PRONTO ✅)
└── package.json        → Dependências (INSTALADAS ✅)
```

---

## ✅ RESUMO

**O QUE ESTÁ FUNCIONANDO:**
- ✅ API rodando na porta 3000
- ✅ Todos os endpoints configurados
- ✅ Estrutura MVC completa

**O QUE FALTA:**
- ⚠️ Conectar ao MySQL (instalar/iniciar)
- ⚠️ Executar o script `database.sql`

**PRÓXIMO PASSO:**
1. Instale o XAMPP ou MySQL Server
2. Execute o arquivo `database.sql`
3. Reinicie a API com `npm start`
4. Acesse: http://localhost:3000/api/dashboard

---

**🎉 A API está 100% funcional, só precisa do MySQL rodando!**
