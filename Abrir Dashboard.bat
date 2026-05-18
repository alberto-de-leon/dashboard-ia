@echo off
title Dashboard IA
cd /d "%~dp0"

where node >nul 2>nul
if %errorlevel% neq 0 (
    echo.
    echo  Node.js no esta instalado.
    echo.
    echo  Descargalo en: https://nodejs.org
    echo  Instalalo y vuelve a ejecutar este archivo.
    echo.
    pause
    exit /b
)

start "" cmd /c "timeout /t 2 >nul && start http://localhost:3000"

node server.js

pause
