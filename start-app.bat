@echo off
echo Starting Awon Pharmacy application...

start cmd /k "cd server && npm start"
timeout /t 5
start cmd /k "cd client && npm start"

echo Application started!
echo Server running on http://localhost:5000
echo Client running on http://localhost:3000