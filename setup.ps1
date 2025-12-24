# Script de Configuracao Automatica do Projeto
# Este script verifica, instala e configura tudo automaticamente

Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "   INSTALACAO E CONFIGURACAO DO DASHBOARD COMPLETO         " -ForegroundColor Cyan
Write-Host "   MySQL + API Node.js + React Dashboard                   " -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host ""

# PASSO 1: Verificar se o MySQL esta instalado
Write-Host ">> Verificando instalacao do MySQL..." -ForegroundColor Cyan
$mysqlInstalled = $false

# Verificar serviço MySQL
$mysqlService = Get-Service -Name "*mysql*" -ErrorAction SilentlyContinue
if ($mysqlService) {
    Write-Success "MySQL Service encontrado: $($mysqlService.Name)"
    $mysqlInstalled = $true
} else {
    # Verificar executável MySQL
    $mysqlExe = Get-Command mysql -ErrorAction SilentlyContinue
    if ($mysqlExe) {
        Write-Success "MySQL executável encontrado em: $($mysqlExe.Source)"
        $mysqlInstalled = $true
    }
}

if (-not $mysqlInstalled) {
    Write-Error "MySQL NÃO está instalado!"
    Write-Host ""
    Write-Info "Para instalar o MySQL, você tem 2 opções:"
    Write-Host ""
    Write-Host "  OPÇÃO 1: MySQL Installer (Recomendado para produção)" -ForegroundColor Yellow
    Write-Host "  ├─ Download: https://dev.mysql.com/downloads/installer/" -ForegroundColor Gray
    Write-Host "  ├─ Arquivo: mysql-installer-community-8.0.XX.msi" -ForegroundColor Gray
    Write-Host "  ├─ Instalar: Developer Default" -ForegroundColor Gray
    Write-Host "  └─ Definir senha root ao instalar" -ForegroundColor Gray
    Write-Host ""
    Write-Host "  OPÇÃO 2: XAMPP (Mais rápido e fácil)" -ForegroundColor Yellow
    Write-Host "  ├─ Download: https://www.apachefriends.org/pt_br/" -ForegroundColor Gray
    Write-Host "  ├─ Instalar XAMPP com MySQL" -ForegroundColor Gray
    Write-Host "  └─ Iniciar MySQL pelo XAMPP Control Panel" -ForegroundColor Gray
    Write-Host ""
    Write-Info "Após instalar o MySQL, execute este script novamente!"
    Write-Host ""
    Write-Host "Deseja abrir o guia de instalação? (S/N): " -NoNewline -ForegroundColor Yellow
    $response = Read-Host
    if ($response -eq "S" -or $response -eq "s") {
        Start-Process "INSTALACAO_MYSQL.md"
    }
    exit
}

# PASSO 2: Verificar se o MySQL está rodando
Write-Step "Verificando se o MySQL está rodando..." "Cyan"
if ($mysqlService) {
    if ($mysqlService.Status -eq "Running") {
        Write-Success "MySQL está rodando!"
    } else {
        Write-Info "Iniciando o MySQL..."
        try {
            Start-Service $mysqlService.Name
            Write-Success "MySQL iniciado com sucesso!"
        } catch {
            Write-Error "Erro ao iniciar MySQL. Inicie manualmente."
            Write-Info "Execute: net start $($mysqlService.Name)"
            exit
        }
    }
}

# PASSO 3: Verificar credenciais do MySQL
Write-Host ""
Write-Step "Configuração do Banco de Dados" "Cyan"
Write-Host "Informe a senha do usuário root do MySQL:" -ForegroundColor Yellow
Write-Host "(Deixe em branco se não houver senha - caso XAMPP)" -ForegroundColor Gray
$rootPassword = Read-Host -AsSecureString "Senha root"
$rootPasswordPlain = [Runtime.InteropServices.Marshal]::PtrToStringAuto(
    [Runtime.InteropServices.Marshal]::SecureStringToBSTR($rootPassword))

if ([string]::IsNullOrEmpty($rootPasswordPlain)) {
    $rootPasswordPlain = ""
    Write-Info "Usando MySQL sem senha (configuração XAMPP)"
}

# PASSO 4: Atualizar arquivo .env
Write-Step "Atualizando arquivo .env da API..." "Cyan"
$envContent = @"
# Configuração do Banco de Dados MySQL
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=$rootPasswordPlain
DB_NAME=dashboard_api
DB_PORT=3306

# Configuração do Servidor
PORT=3000
NODE_ENV=development
"@

Set-Content -Path "api\.env" -Value $envContent
Write-Success "Arquivo .env atualizado!"

# PASSO 5: Criar banco de dados
Write-Step "Criando banco de dados MySQL..." "Cyan"
$createDbCommand = "CREATE DATABASE IF NOT EXISTS dashboard_api CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

if ([string]::IsNullOrEmpty($rootPasswordPlain)) {
    $mysqlCommand = "mysql -u root -e `"$createDbCommand`""
} else {
    $mysqlCommand = "mysql -u root -p$rootPasswordPlain -e `"$createDbCommand`""
}

try {
    Invoke-Expression $mysqlCommand
    Write-Success "Banco de dados 'dashboard_api' criado!"
} catch {
    Write-Error "Erro ao criar banco de dados. Verifique as credenciais."
    exit
}

# PASSO 6: Importar schema do banco de dados
Write-Step "Importando schema e dados iniciais..." "Cyan"
if ([string]::IsNullOrEmpty($rootPasswordPlain)) {
    $importCommand = "mysql -u root dashboard_api < api\database.sql"
} else {
    $importCommand = "mysql -u root -p$rootPasswordPlain dashboard_api < api\database.sql"
}

try {
    Invoke-Expression $importCommand
    Write-Success "Schema e dados importados com sucesso!"
    Write-Info "Banco de dados contém: 10 produtos, 5 vendedores, 10 pedidos"
} catch {
    Write-Error "Erro ao importar schema. Verifique o arquivo database.sql"
}

# PASSO 7: Instalar dependências da API
Write-Step "Instalando dependências da API..." "Cyan"
Set-Location api
if (Test-Path "node_modules") {
    Write-Info "Dependências já instaladas, pulando..."
} else {
    npm install
    if ($LASTEXITCODE -eq 0) {
        Write-Success "Dependências da API instaladas!"
    } else {
        Write-Error "Erro ao instalar dependências da API"
        Set-Location ..
        exit
    }
}
Set-Location ..

# PASSO 8: Instalar dependências do Dashboard
Write-Step "Verificando dependências do Dashboard..." "Cyan"
if (Test-Path "node_modules") {
    Write-Success "Dependências do Dashboard já instaladas!"
} else {
    npm install
    if ($LASTEXITCODE -eq 0) {
        Write-Success "Dependências do Dashboard instaladas!"
    } else {
        Write-Error "Erro ao instalar dependências do Dashboard"
        exit
    }
}

# PASSO 9: Resumo e instruções finais
Write-Host ""
Write-Host "╔════════════════════════════════════════════════════════════╗" -ForegroundColor Green
Write-Host "║            ✅ CONFIGURAÇÃO CONCLUÍDA COM SUCESSO!          ║" -ForegroundColor Green
Write-Host "╚════════════════════════════════════════════════════════════╝" -ForegroundColor Green
Write-Host ""

Write-Host "🎯 PRÓXIMOS PASSOS:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1️⃣  Iniciar a API (Backend):" -ForegroundColor Cyan
Write-Host "   cd api" -ForegroundColor White
Write-Host "   npm start" -ForegroundColor White
Write-Host "   ➜ API rodará em: http://localhost:3000" -ForegroundColor Gray
Write-Host ""

Write-Host "2️⃣  Iniciar o Dashboard (Frontend) - EM OUTRO TERMINAL:" -ForegroundColor Cyan
Write-Host "   npm run dev" -ForegroundColor White
Write-Host "   ➜ Dashboard rodará em: http://localhost:5173" -ForegroundColor Gray
Write-Host ""

Write-Host "3️⃣  Acessar o Dashboard:" -ForegroundColor Cyan
Write-Host "   Navegador: http://localhost:5173" -ForegroundColor White
Write-Host "   Login: admin@dashboard.com" -ForegroundColor Gray
Write-Host "   Senha: admin123" -ForegroundColor Gray
Write-Host ""

Write-Host "📊 INFORMAÇÕES DO BANCO DE DADOS:" -ForegroundColor Yellow
Write-Host "   ├─ Host: localhost:3306" -ForegroundColor Gray
Write-Host "   ├─ Database: dashboard_api" -ForegroundColor Gray
Write-Host "   ├─ User: root" -ForegroundColor Gray
Write-Host "   ├─ Produtos cadastrados: 10" -ForegroundColor Gray
Write-Host "   ├─ Vendedores cadastrados: 5" -ForegroundColor Gray
Write-Host "   └─ Pedidos cadastrados: 10" -ForegroundColor Gray
Write-Host ""

Write-Host "🔍 ENDPOINTS DA API DISPONÍVEIS:" -ForegroundColor Yellow
Write-Host "   ├─ GET  /api/dashboard/metricas - Métricas gerais" -ForegroundColor Gray
Write-Host "   ├─ GET  /api/dashboard/top-produtos - Top 5 produtos" -ForegroundColor Gray
Write-Host "   ├─ GET  /api/dashboard/top-vendedores - Top 5 vendedores" -ForegroundColor Gray
Write-Host "   ├─ GET  /api/produtos - Listar produtos" -ForegroundColor Gray
Write-Host "   ├─ GET  /api/vendedores - Listar vendedores" -ForegroundColor Gray
Write-Host "   └─ GET  /api/pedidos - Listar pedidos" -ForegroundColor Gray
Write-Host ""

Write-Host "Deseja iniciar a API agora? (S/N): " -NoNewline -ForegroundColor Yellow
$startApi = Read-Host

if ($startApi -eq "S" -or $startApi -eq "s") {
    Write-Host ""
    Write-Info "Iniciando a API..."
    Write-Info "Pressione Ctrl+C para parar a API"
    Write-Host ""
    Set-Location api
    npm start
}
