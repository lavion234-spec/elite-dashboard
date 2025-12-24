# 🚀 Instalação do MySQL no Windows

## Opção 1: MySQL Installer (RECOMENDADO)

### Passo 1: Download
1. Acesse: https://dev.mysql.com/downloads/installer/
2. Baixe: **mysql-installer-community-8.0.XX.msi** (versão completa)
3. Não precisa criar conta Oracle, clique em "No thanks, just start my download"

### Passo 2: Instalação
1. Execute o instalador baixado
2. Escolha: **"Developer Default"** (instala MySQL Server + Workbench)
3. Clique em "Next" e depois "Execute" para baixar os componentes
4. Aguarde a instalação dos componentes

### Passo 3: Configuração do MySQL Server
1. **Type and Networking**:
   - Config Type: `Development Computer`
   - Port: `3306` (padrão)
   - ✅ Marque "Open Windows Firewall ports for network access"

2. **Authentication Method**:
   - Escolha: `Use Strong Password Encryption`

3. **Accounts and Roles**:
   - Root Password: **`root123`** (ou escolha sua senha)
   - ⚠️ **ANOTE ESTA SENHA!**
   - (Opcional) Adicione usuários adicionais

4. **Windows Service**:
   - ✅ Configure MySQL Server as Windows Service
   - Service Name: `MySQL80`
   - ✅ Start the MySQL Server at System Startup

5. **Apply Configuration**:
   - Clique em "Execute" e aguarde
   - Quando terminar, clique em "Finish"

### Passo 4: Verificar Instalação
```powershell
# Verificar se o MySQL está rodando
Get-Service MySQL80

# Testar conexão (senha que você definiu)
mysql -u root -p
```

---

## Opção 2: XAMPP (Mais Simples)

### Passo 1: Download
1. Acesse: https://www.apachefriends.org/pt_br/index.html
2. Baixe: **XAMPP for Windows** (versão mais recente)

### Passo 2: Instalação
1. Execute o instalador
2. Selecione componentes:
   - ✅ Apache
   - ✅ MySQL
   - ✅ phpMyAdmin
3. Pasta de instalação: `C:\xampp` (padrão)
4. Clique em "Next" até finalizar

### Passo 3: Iniciar MySQL
1. Abra o **XAMPP Control Panel**
2. Clique em "Start" ao lado de **MySQL**
3. Aguarde o status ficar verde

### Passo 4: Verificar
- MySQL rodando na porta: **3306**
- phpMyAdmin: http://localhost/phpmyadmin
- Usuário padrão: `root`
- Senha padrão: **(vazia)**

---

## 📋 Após a Instalação

### 1. Criar o Banco de Dados

```powershell
# Navegue até a pasta do projeto
cd "C:\Users\mc-me\OneDrive\Documentos\PROJETO DASH BOARD"

# Opção A: Via MySQL Command Line
mysql -u root -p < api/database.sql

# Opção B: Via MySQL Workbench (Interface Gráfica)
# 1. Abra MySQL Workbench
# 2. Conecte no localhost
# 3. File > Open SQL Script > Selecione api/database.sql
# 4. Clique no ⚡ para executar
```

### 2. Configurar a API

Crie o arquivo `.env` na pasta `api/`:

```powershell
# Criar arquivo .env
cd api
New-Item -Path ".env" -ItemType File -Force
```

Adicione no arquivo `.env`:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=root123
DB_NAME=dashboard_api
DB_PORT=3306
PORT=3000
```

⚠️ **Importante**: Substitua `root123` pela senha que você definiu!

### 3. Instalar Dependências da API

```powershell
# Na pasta api/
cd api
npm install
```

### 4. Testar a Conexão

```powershell
# Iniciar a API
npm start
```

Você deve ver:
```
✅ Servidor rodando na porta 3000
✅ Conectado ao banco de dados MySQL
```

### 5. Conectar o Dashboard à API Real

Edite o arquivo `src/services/api.ts` (vamos criar):

```typescript
const BASE_URL = 'http://localhost:3000/api';

export const dashboardService = {
  async getMetrics() {
    const response = await fetch(`${BASE_URL}/dashboard/metricas`);
    return response.json();
  },
  
  async getProducts() {
    const response = await fetch(`${BASE_URL}/produtos`);
    return response.json();
  },
  
  async getSellers() {
    const response = await fetch(`${BASE_URL}/vendedores`);
    return response.json();
  },
  
  async getOrders() {
    const response = await fetch(`${BASE_URL}/pedidos`);
    return response.json();
  }
};
```

---

## 🎯 Resumo dos Passos

1. ✅ Instalar MySQL (Installer ou XAMPP)
2. ✅ Criar banco de dados com `api/database.sql`
3. ✅ Configurar arquivo `.env` na pasta `api/`
4. ✅ Instalar dependências: `npm install` (na pasta api/)
5. ✅ Iniciar API: `npm start` (porta 3000)
6. ✅ Iniciar Dashboard: `npm run dev` (porta 5173)
7. ✅ Acessar: http://localhost:5173

---

## ❓ Qual Opção Escolher?

| Critério | MySQL Installer | XAMPP |
|----------|----------------|-------|
| **Melhor para** | Desenvolvimento profissional | Iniciantes / Testes rápidos |
| **Tamanho** | ~300 MB | ~150 MB |
| **Ferramentas** | Workbench + Shell | phpMyAdmin + Apache |
| **Configuração** | Mais opções | Automática |
| **Recomendação** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |

---

## 🆘 Problemas Comuns

### Erro: "Port 3306 already in use"
Outro serviço está usando a porta 3306.
```powershell
# Ver o que está usando a porta
netstat -ano | findstr :3306

# Parar o serviço MySQL se necessário
net stop MySQL80
```

### Erro: "Access denied for user 'root'"
Senha incorreta no `.env`. Verifique a senha que você definiu.

### Erro: "Cannot connect to MySQL server"
MySQL não está rodando.
```powershell
# Iniciar o serviço
net start MySQL80

# Ou via XAMPP Control Panel
```

---

## 📞 Próximos Passos

Depois de instalar o MySQL, execute:
```powershell
# 1. Criar banco de dados
mysql -u root -p < api/database.sql

# 2. Configurar .env
cd api
# Edite o arquivo .env com suas credenciais

# 3. Iniciar API
npm start

# 4. Em outro terminal, iniciar dashboard
cd ..
npm run dev
```

🎉 **Seu sistema completo estará rodando!**
