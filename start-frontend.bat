@echo off
chcp 65001 > nul
echo ========================================
echo   启动前端服务
echo ========================================
echo.

cd frontend
set NODE_PATH=../node_modules
node ../node_modules/vite/bin/vite.js

pause
