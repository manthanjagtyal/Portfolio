@echo off
title Manthan Sharma — 3D Portfolio Dev Server
color 0A

echo.
echo  ============================================
echo   MANTHAN SHARMA ^| 3D Interactive Portfolio
echo   Starting development server...
echo  ============================================
echo.

:: Check if node_modules exists, install if missing
if not exist "node_modules\" (
    echo  [1/2] Installing dependencies... please wait.
    echo.
    "C:\Program Files\nodejs\npm.cmd" install
    echo.
)

echo  [2/2] Launching Vite dev server...
echo.

:: Start dev server in background
start "Vite Dev Server" /min "C:\Program Files\nodejs\npm.cmd" run dev

:: Wait 4 seconds for Vite to boot up
echo  Waiting for server to start...
timeout /t 4 /nobreak >nul

:: Open browser at localhost:5173
echo  Opening browser at http://localhost:5173
start "" "http://localhost:5173"

echo.
echo  ============================================
echo   Portfolio is running at:
echo   http://localhost:5173
echo.
echo   Press any key to STOP the server.
echo  ============================================
echo.

pause >nul

:: Kill the node/vite process on keypress
echo  Shutting down server...
taskkill /f /im node.exe >nul 2>&1

echo  Server stopped. Goodbye!
timeout /t 2 /nobreak >nul
