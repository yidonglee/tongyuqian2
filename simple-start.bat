@echo off
echo ========================================
echo   Starting Konjac Enterprise Portal
echo ========================================
echo.

echo [Step 1] Checking dependencies...
if not exist "node_modules\express" (
    echo Installing backend dependencies...
    call npm install express cors better-sqlite3
)

echo.
echo [Step 2] Starting Backend Server on port 3001...
start "Backend Server" cmd /k "node backend/start.js"

echo Waiting for backend to start...
timeout /t 3

echo.
echo [Step 3] Starting Frontend Server on port 3000...
cd frontend
start "Frontend Server" cmd /k "cd .. && npx vite --host frontend"

echo.
echo ========================================
echo   Services Started Successfully!
echo ========================================
echo   Frontend: http://localhost:3000
echo   Backend:  http://localhost:3001
echo ========================================
echo.
pause
