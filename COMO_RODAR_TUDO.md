# 🚀 GUIA COMPLETO - CONECTAR TUDO E RODAR

## ⚠️ ATENÇÃO: MySQL não está instalado no seu sistema!

### Você tem 2 opções:

---

## 🎯 OPÇÃO 1: Usar JSON Server (Rápido - Recomendado para teste)

O dashboard já está configurado com JSON Server. Vamos usar isso!

### Passo 1: Voltar para a pasta raiz
```powershell
cd "C:\Users\mc-me\OneDrive\Documentos\PROJETO DASH BOARD"
```

### Passo 2: Instalar dependências (se ainda não instalou)
```powershell
npm install
```

### Passo 3: Iniciar o JSON Server (em um terminal)
```powershell
npm run server
```
**Rodará em:** http://localhost:3001

### Passo 4: Iniciar o Dashboard (em outro terminal)
```powershell
npm run dev
```
**Rodará em:** http://localhost:5173

✅ **PRONTO!** Dashboard funcionando com mock data!

---

## 🎯 OPÇÃO 2: Instalar MySQL e usar a API completa

### Passo 1: Baixar MySQL

**Opção A - MySQL Installer (Recomendado):**
1. Acesse: https://dev.mysql.com/downloads/installer/
2. Baixe: `mysql-installer-community-8.0.XX.msi`
3. Execute o instalador
4. Escolha: **Developer Default**
5. Configure senha do root (ex: `root123`)

**Opção B - XAMPP (Mais fácil):**
1. Acesse: https://www.apachefriends.org/
2. Baixe o XAMPP
3. Instale normalmente
4. Abra o XAMPP Control Panel
5. Clique em "Start" no MySQL

### Passo 2: Criar o banco de dados

**Com MySQL Workbench:**
1. Abra MySQL Workbench
2. Conecte ao localhost
3. Clique em "File" > "Open SQL Script"
4. Selecione: `api/database.sql`
5. Clique em Execute (⚡)

**Ou via linha de comando:**
```powershell
# Navegue até a pasta da API
cd "C:\Users\mc-me\OneDrive\Documentos\PROJETO DASH BOARD\api"

# Execute o script (substitua 'root' pela sua senha)
mysql -u root -p < database.sql
# Digite a senha quando solicitado
```

### Passo 3: Configurar a API

Crie o arquivo `.env` na pasta `api/`:

```powershell
cd "C:\Users\mc-me\OneDrive\Documentos\PROJETO DASH BOARD\api"
Copy-Item .env.example .env
```

Edite o arquivo `.env`:
```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=root123
DB_NAME=dashboard_api
DB_PORT=3306
NODE_ENV=development
```

### Passo 4: Instalar dependências da API

```powershell
cd "C:\Users\mc-me\OneDrive\Documentos\PROJETO DASH BOARD\api"
npm install
```

### Passo 5: Iniciar a API (em um terminal)

```powershell
cd "C:\Users\mc-me\OneDrive\Documentos\PROJETO DASH BOARD\api"
npm start
```
**Rodará em:** http://localhost:3000

### Passo 6: Conectar o Dashboard à API

Edite o arquivo do dashboard para usar a API:

**Arquivo:** `src/services/api.js` (criar se não existir)

```javascript
const API_URL = 'http://localhost:3000/api';

export const fetchDashboard = async () => {
  const response = await fetch(`${API_URL}/dashboard`);
  return response.json();
};

export const fetchProdutos = async () => {
  const response = await fetch(`${API_URL}/produtos`);
  return response.json();
};

export const fetchVendedores = async () => {
  const response = await fetch(`${API_URL}/vendedores`);
  return response.json();
};

export const fetchPedidos = async () => {
  const response = await fetch(`${API_URL}/pedidos`);
  return response.json();
};

export const criarPedido = async (pedido) => {
  const response = await fetch(`${API_URL}/pedidos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(pedido),
  });
  return response.json();
};
```

### Passo 7: Iniciar o Dashboard (em outro terminal)

```powershell
cd "C:\Users\mc-me\OneDrive\Documentos\PROJETO DASH BOARD"
npm run dev
```
**Rodará em:** http://localhost:5173

---

## 📋 RESUMO - O que estará rodando?

### Com JSON Server (Opção 1):
```
Terminal 1: JSON Server    → http://localhost:3001
Terminal 2: Dashboard      → http://localhost:5173
```

### Com MySQL + API (Opção 2):
```
Terminal 1: API Backend    → http://localhost:3000
Terminal 2: Dashboard      → http://localhost:5173

MySQL rodando em background → localhost:3306
```

---

## 🧪 TESTAR SE ESTÁ FUNCIONANDO

### Testar JSON Server:
```
http://localhost:3001/users
http://localhost:3001/transactions
```

### Testar API MySQL:
```
http://localhost:3000
http://localhost:3000/api/dashboard
http://localhost:3000/api/produtos
```

### Testar Dashboard:
```
http://localhost:5173
```

---

## 🐛 PROBLEMAS COMUNS

### Porta já em uso:
```powershell
# Matar processo na porta 3000
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Matar processo na porta 5173
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

### MySQL não conecta:
1. Verifique se o MySQL está rodando
2. Verifique usuário/senha no .env
3. Verifique se o banco `dashboard_api` existe

### CORS error no navegador:
A API já está configurada com CORS habilitado. Se der erro, limpe o cache do navegador.

---

## 💡 RECOMENDAÇÃO

Para **testar rapidamente**, use a **OPÇÃO 1** (JSON Server) que já está configurado!

Para **produção real com banco de dados MySQL**, use a **OPÇÃO 2**.

---

## 🎯 PRÓXIMOS PASSOS (após tudo rodando)

1. Abra http://localhost:5173 no navegador
2. Faça login (qualquer email/senha)
3. Veja o dashboard com dados reais
4. Teste criar produtos, pedidos, etc.

---

## 📞 PRECISA DE AJUDA?

Me avise qual opção você escolheu e vou te ajudar a configurar!
