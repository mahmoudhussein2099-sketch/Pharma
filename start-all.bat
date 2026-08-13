@echo off
echo Starting Awon Pharmacy Application...
echo.

echo Starting Backend Server (Port 5000)...
start "Backend Server" cmd /k "cd server && npm start"

timeout /t 3 /nobreak >nul

echo Starting Frontend Client (Port 3000)...
start "Frontend Client" cmd /k "cd client && npm run dev"

echo.
echo Both servers are starting...
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo.
pause