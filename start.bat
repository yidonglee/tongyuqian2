@echo off
echo Starting Konjac Enterprise Portal...
echo.

echo [1/3] Starting Backend Server...
cd backend
start "Backend Server" cmd /k "npm run dev"
timeout /t 3

echo [2/3] Starting Frontend Server...
cd ..\frontend
start "Frontend Server" cmd /k "npm run dev"
timeout /t 3

echo [3/3] Services are starting...
echo.
echo Frontend: http://localhost:3000
echo Backend:  http://localhost:3001
echo.
echo Press any key to close this window...
pause
