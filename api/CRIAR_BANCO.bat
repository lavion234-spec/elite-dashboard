@echo off
echo ====================================
echo CONFIGURAR BANCO DE DADOS MYSQL
echo ====================================
echo.
echo OPCOES:
echo.
echo 1. Se voce tem XAMPP instalado, execute:
echo    "C:\xampp\mysql\bin\mysql.exe" -u root ^< database.sql
echo.
echo 2. Se voce tem MySQL Server instalado, execute:
echo    "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" -u root -p ^< database.sql
echo.
echo 3. Ou abra o MySQL Workbench e execute o arquivo database.sql
echo.
echo ====================================
echo DEPOIS DE CRIAR O BANCO:
echo ====================================
echo.
echo Execute: npm start
echo.
pause
