@echo off
echo Fixing dependencies for Awon Pharmacy project...

cd client
echo Installing client dependencies...
call npm install --legacy-peer-deps

cd ..
cd server
echo Installing server dependencies...
call npm install

cd ..
echo All dependencies installed!
echo.
echo To start the application:
echo 1. Open a terminal and run: cd server && npm start
echo 2. Open another terminal and run: cd client && npm start
echo.
pause