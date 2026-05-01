@echo off
REM Start Atelier Server (Windows)
REM Usage: start.bat

echo.
echo Starting Atelier Server...
echo.

REM Check Node.js
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Node.js not found. Install from nodejs.org
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo OK Node.js %NODE_VERSION%

REM Install dependencies if needed
if not exist "node_modules" (
    echo.
    echo Installing dependencies...
    call npm install
)

REM Check .env file
if not exist ".env" (
    echo.
    echo WARNING: .env file not found!
    echo Creating from template...
    copy .env.example .env
    echo.
    echo EDIT .env with your settings, then run this script again
    pause
    exit /b 1
)

echo.
echo Starting server...
echo Server will run on: http://localhost:5000
echo Press Ctrl+C to stop
echo.

set NODE_ENV=development
call npm start
