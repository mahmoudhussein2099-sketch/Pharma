@echo off
echo Fixing empty page issues for Awon Pharmacy project...

cd client
echo Installing required dependencies...
call npm install --save gsap three @react-three/fiber @react-three/drei --legacy-peer-deps

echo Building the project...
call npm run build

echo Starting the application...
cd ..
start cmd /k "cd server && npm start"
timeout /t 5
start cmd /k "cd client && npm start"

echo Application started!
echo Server running on http://localhost:5000
echo Client running on http://localhost:3000
echo.
echo If you still see empty pages, try clearing your browser cache or opening in incognito mode.
pause