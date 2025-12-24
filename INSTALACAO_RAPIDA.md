# 🚀 INSTALAÇÃO RÁPIDA - 3 MINUTOS

## ✅ Opção 1: Script Automatizado (RECOMENDADO)

Execute este comando no PowerShell:

```powershell
.\setup.ps1
```

O script irá:
1. ✅ Verificar se o MySQL está instalado
2. ✅ Criar o banco de dados automaticamente
3. ✅ Configurar o arquivo .env
4. ✅ Instalar todas as dependências
5. ✅ Iniciar a API e o Dashboard

---

## 📋 Opção 2: Instalação Manual

### 1. Instalar MySQL

#### XAMPP (Mais Fácil)
1. Download: https://www.apachefriends.org/pt_br/
2. Instalar XAMPP
3. Abrir XAMPP Control Panel
4. Clicar em "Start" ao lado de MySQL

#### MySQL Installer (Profissional)
1. Download: https://dev.mysql.com/downloads/installer/
2. Baixar: mysql-installer-community-8.0.XX.msi
3. Instalar: "Developer Default"
4. Definir senha root: `root123`

### 2. Criar Banco de Dados

```powershell
# Com senha (MySQL Installer)
mysql -u root -proot123 -e "CREATE DATABASE dashboard_api;"
mysql -u root -proot123 dashboard_api < api/database.sql

# Sem senha (XAMPP)
mysql -u root -e "CREATE DATABASE dashboard_api;"
mysql -u root dashboard_api < api/database.sql
```

### 3. Configurar .env

Edite `api/.env`:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=root123        # Ou deixe vazio para XAMPP
DB_NAME=dashboard_api
DB_PORT=3306
PORT=3000
```

### 4. Instalar Dependências

```powershell
# API
cd api
npm install

# Dashboard
cd ..
npm install
```

### 5. Iniciar os Serviços

Terminal 1 - API:
```powershell
cd api
npm start
```

Terminal 2 - Dashboard:
```powershell
npm run dev
```

### 6. Acessar

- Dashboard: http://localhost:5173
- API: http://localhost:3000

---

## 🆘 Problemas?

### MySQL não instalado
```powershell
# Verificar
Get-Service MySQL*

# Se não aparecer nada, instale via XAMPP ou MySQL Installer
```

### Porta 3306 em uso
```powershell
# Ver o que está usando
netstat -ano | findstr :3306

# Parar MySQL
net stop MySQL80
```

### Erro de senha
Edite `api/.env` com a senha correta

### API não conecta
```powershell
# Verificar se MySQL está rodando
Get-Service MySQL*

# Iniciar MySQL
net start MySQL80
```

---

## 📞 Suporte

Veja guias detalhados:
- [INSTALACAO_MYSQL.md](INSTALACAO_MYSQL.md) - Guia completo de instalação do MySQL
- [api/README.md](api/README.md) - Documentação da API
- [README.md](README.md) - Documentação completa do projeto

---

## 🎯 Resultado Esperado

✅ MySQL rodando na porta 3306  
✅ API rodando em http://localhost:3000  
✅ Dashboard rodando em http://localhost:5173  
✅ Login funcionando  
✅ Dados reais do MySQL exibidos

🎉 **Pronto para usar!**
