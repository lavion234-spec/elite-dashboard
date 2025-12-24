# Script Simples de Instalacao MySQL + Dashboard
Write-Host "=== INSTALACAO DO DASHBOARD ===" -ForegroundColor Green
Write-Host ""

# Verificar MySQL
Write-Host "1. Verificando MySQL..." -ForegroundColor Yellow
$mysql = Get-Service -Name "*mysql*" -ErrorAction SilentlyContinue

if (-not $mysql) {
    Write-Host "   MySQL NAO encontrado!" -ForegroundColor Red
    Write-Host ""
    Write-Host "   Instale o MySQL:" -ForegroundColor Yellow
    Write-Host "   - XAMPP: https://www.apachefriends.org/pt_br/" -ForegroundColor Cyan
    Write-Host "   - MySQL: https://dev.mysql.com/downloads/installer/" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "   Apos instalar, execute este script novamente" -ForegroundColor Yellow
    pause
    exit
}

Write-Host "   OK - MySQL encontrado: $($mysql.Name)" -ForegroundColor Green

# Verificar se está rodando
if ($mysql.Status -ne "Running") {
    Write-Host "   Iniciando MySQL..." -ForegroundColor Yellow
    Start-Service $mysql.Name
    Write-Host "   OK - MySQL iniciado" -ForegroundColor Green
} else {
    Write-Host "   OK - MySQL ja esta rodando" -ForegroundColor Green
}

# Pedir senha
Write-Host ""
Write-Host "2. Configuracao do Banco..." -ForegroundColor Yellow
Write-Host "   Digite a senha do MySQL root:" -ForegroundColor Cyan
Write-Host "   (Deixe vazio se nao houver senha - XAMPP)" -ForegroundColor Gray
$senha = Read-Host "   Senha"

# Atualizar .env
Write-Host ""
Write-Host "3. Atualizando configuracoes..." -ForegroundColor Yellow
$envContent = @"
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=$senha
DB_NAME=dashboard_api
DB_PORT=3306
PORT=3000
NODE_ENV=development
"@
Set-Content -Path "api\.env" -Value $envContent -Force
Write-Host "   OK - Arquivo .env criado" -ForegroundColor Green

# Criar banco
Write-Host ""
Write-Host "4. Criando banco de dados..." -ForegroundColor Yellow
if ([string]::IsNullOrEmpty($senha)) {
    $cmd = 'mysql -u root -e "CREATE DATABASE IF NOT EXISTS dashboard_api;"'
    $importCmd = "mysql -u root dashboard_api"
} else {
    $cmd = "mysql -u root -p$senha -e `"CREATE DATABASE IF NOT EXISTS dashboard_api;`""
    $importCmd = "mysql -u root -p$senha dashboard_api"
}

try {
    Invoke-Expression $cmd 2>&1 | Out-Null
    Write-Host "   OK - Banco 'dashboard_api' criado" -ForegroundColor Green
} catch {
    Write-Host "   ERRO ao criar banco. Verifique a senha!" -ForegroundColor Red
    pause
    exit
}

# Importar dados
Write-Host ""
Write-Host "5. Importando dados..." -ForegroundColor Yellow
try {
    Get-Content "api\database.sql" | & $importCmd.Split(' ')[0] $importCmd.Split(' ')[1..100] 2>&1 | Out-Null
    Write-Host "   OK - Dados importados" -ForegroundColor Green
    Write-Host "   - 10 produtos cadastrados" -ForegroundColor Gray
    Write-Host "   - 5 vendedores cadastrados" -ForegroundColor Gray
    Write-Host "   - 10 pedidos cadastrados" -ForegroundColor Gray
} catch {
    Write-Host "   AVISO: Erro ao importar. Execute manualmente:" -ForegroundColor Yellow
    Write-Host "   $importCmd < api\database.sql" -ForegroundColor Cyan
}

# Instalar dependencias API
Write-Host ""
Write-Host "6. Instalando dependencias da API..." -ForegroundColor Yellow
Push-Location api
if (Test-Path "node_modules") {
    Write-Host "   OK - Ja instalado" -ForegroundColor Green
} else {
    npm install --silent
    Write-Host "   OK - Dependencias instaladas" -ForegroundColor Green
}
Pop-Location

# Instalar dependencias Dashboard
Write-Host ""
Write-Host "7. Instalando dependencias do Dashboard..." -ForegroundColor Yellow
if (Test-Path "node_modules") {
    Write-Host "   OK - Ja instalado" -ForegroundColor Green
} else {
    npm install --silent
    Write-Host "   OK - Dependencias instaladas" -ForegroundColor Green
}

# Resumo
Write-Host ""
Write-Host "============================================" -ForegroundColor Green
Write-Host "   INSTALACAO CONCLUIDA COM SUCESSO!" -ForegroundColor Green
Write-Host "============================================" -ForegroundColor Green
Write-Host ""
Write-Host "PROXIMOS PASSOS:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Terminal 1 - Iniciar API:" -ForegroundColor Cyan
Write-Host "   cd api" -ForegroundColor White
Write-Host "   npm start" -ForegroundColor White
Write-Host ""
Write-Host "2. Terminal 2 - Iniciar Dashboard:" -ForegroundColor Cyan
Write-Host "   npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "3. Acessar:" -ForegroundColor Cyan
Write-Host "   http://localhost:5173" -ForegroundColor White
Write-Host ""
Write-Host "Deseja iniciar a API agora? (S/N): " -NoNewline -ForegroundColor Yellow
$resposta = Read-Host

if ($resposta -eq "S" -or $resposta -eq "s") {
    Write-Host ""
    Write-Host "Iniciando API..." -ForegroundColor Green
    Write-Host "Pressione Ctrl+C para parar" -ForegroundColor Gray
    Write-Host ""
    Set-Location api
    npm start
}
