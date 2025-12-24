# 📥 GUIA DE INSTALAÇÃO DO MYSQL - PASSO A PASSO

## 🎯 ESCOLHA SUA OPÇÃO

### ⭐ OPÇÃO 1: XAMPP (RECOMENDADO - MAIS FÁCIL)

#### Por que XAMPP?
- ✅ Instalação em 5 minutos
- ✅ Não precisa configurar nada
- ✅ Inclui phpMyAdmin (interface visual)
- ✅ Perfeito para desenvolvimento

#### Passos:

**1. Download**
- Acesse: https://www.apachefriends.org/pt_br/download.html
- Baixe: XAMPP for Windows (versão mais recente)
- Tamanho: ~150 MB

**2. Instalar**
```
1. Execute o instalador baixado
2. Se aparecer aviso do Windows Defender, clique em "Sim"
3. Desmarque tudo EXCETO:
   ☑ Apache
   ☑ MySQL
   ☑ phpMyAdmin
4. Pasta de instalação: C:\xampp (deixe padrão)
5. Clique em "Next" até finalizar
```

**3. Iniciar MySQL**
```
1. Abra: C:\xampp\xampp-control.exe
2. Clique no botão "Start" ao lado de MySQL
3. Aguarde ficar verde ✅
```

**4. Verificar**
```powershell
# Execute no PowerShell
Get-Service -Name "*mysql*"
# Deve mostrar: XAMPP MySQL rodando
```

**5. Configurar Projeto**
```powershell
# Na pasta do projeto, execute:
.\instalar.ps1

# Quando pedir senha, deixe VAZIO (apenas Enter)
```

---

### ⭐⭐ OPÇÃO 2: MySQL INSTALLER (PROFISSIONAL)

#### Por que MySQL Installer?
- ✅ Versão oficial do MySQL
- ✅ Inclui MySQL Workbench (ferramenta profissional)
- ✅ Melhor para produção
- ✅ Configuração mais robusta

#### Passos:

**1. Download**
- Acesse: https://dev.mysql.com/downloads/installer/
- Clique em: "mysql-installer-community-8.0.XX.msi"
- Tamanho completo recomendado: ~400 MB
- Não precisa criar conta Oracle, clique em:
  "No thanks, just start my download"

**2. Instalar**
```
1. Execute o instalador
2. Escolha: "Developer Default"
3. Clique em "Next"
4. Clique em "Execute" para baixar componentes
5. Aguarde instalação (pode demorar 10-15 minutos)
```

**3. Configurar MySQL Server**
```
Página 1 - Type and Networking:
├─ Config Type: Development Computer
├─ Port: 3306 (padrão)
└─ ☑ Open Windows Firewall ports

Página 2 - Authentication:
└─ Use Strong Password Encryption (recomendado)

Página 3 - Accounts and Roles:
├─ Root Password: root123
├─ Confirme: root123
└─ ⚠️ ANOTE ESTA SENHA!

Página 4 - Windows Service:
├─ ☑ Configure MySQL Server as Windows Service
├─ Service Name: MySQL80
└─ ☑ Start at System Startup

Página 5 - Apply Configuration:
└─ Clique em "Execute"
```

**4. Instalar MySQL Workbench**
```
1. Marque "MySQL Workbench"
2. Clique em "Next" e "Execute"
3. Aguarde instalação
```

**5. Verificar**
```powershell
# Execute no PowerShell
Get-Service MySQL80
# Deve mostrar: Running

mysql -u root -proot123 -e "SELECT VERSION();"
# Deve mostrar a versão do MySQL
```

**6. Configurar Projeto**
```powershell
# Na pasta do projeto, execute:
.\instalar.ps1

# Quando pedir senha, digite: root123
```

---

## 🚀 DEPOIS DE INSTALAR

### 1. Execute o script de instalação

```powershell
cd "C:\Users\mc-me\OneDrive\Documentos\PROJETO DASH BOARD"
.\instalar.ps1
```

O script irá:
- ✅ Detectar o MySQL instalado
- ✅ Criar o banco de dados "dashboard_api"
- ✅ Importar 10 produtos, 5 vendedores, 10 pedidos
- ✅ Configurar o arquivo .env
- ✅ Instalar todas as dependências

### 2. Iniciar a API

```powershell
cd api
npm start
```

Você deve ver:
```
✅ Servidor rodando na porta 3000
✅ Conectado ao banco de dados MySQL
```

### 3. Iniciar o Dashboard (outro terminal)

```powershell
npm run dev
```

### 4. Acessar

- Dashboard: http://localhost:5173
- API: http://localhost:3000/api/dashboard/metricas

---

## 🎯 COMPARAÇÃO

| Critério | XAMPP | MySQL Installer |
|----------|-------|----------------|
| **Tempo de instalação** | 5 minutos | 15 minutos |
| **Tamanho** | 150 MB | 400 MB |
| **Facilidade** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **Senha padrão** | Vazia | Você define |
| **Interface visual** | phpMyAdmin | Workbench |
| **Ideal para** | Desenvolvimento | Produção |

**👉 Recomendação: XAMPP para começar rápido!**

---

## ❓ PROBLEMAS COMUNS

### "Port 3306 already in use"
```powershell
# Ver o que está usando
netstat -ano | findstr :3306

# Parar serviço conflitante
net stop MySQL80
# ou reinicie o computador
```

### "Access denied for user root"
- **XAMPP**: Use senha VAZIA (apenas Enter)
- **MySQL Installer**: Use a senha que você definiu

### MySQL não inicia
```powershell
# XAMPP: Abra xampp-control.exe e clique em Start
# MySQL Installer:
net start MySQL80
```

### Firewall bloqueando
- Windows pode pedir permissão
- Clique em "Permitir acesso"

---

## 📞 PRÓXIMOS PASSOS

Depois de instalar:

1. ✅ Execute: `.\instalar.ps1`
2. ✅ Inicie a API: `cd api; npm start`
3. ✅ Inicie o Dashboard: `npm run dev`
4. ✅ Acesse: http://localhost:5173

🎉 **Sistema completo funcionando com MySQL!**
