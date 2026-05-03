@echo off
REM Backup Database to Network Drive (Windows)
REM Usage: backup.bat Z:\backups

setlocal enabledelayedexpansion

set NETWORK_DRIVE=%1
if "%NETWORK_DRIVE%"=="" (
    set NETWORK_DRIVE=.
)

set BACKUP_DIR=%NETWORK_DRIVE%\atelier_backups
set DB_FILE=atelier.db

REM Create backup directory
if not exist "%BACKUP_DIR%" (
    mkdir "%BACKUP_DIR%"
)

REM Get timestamp
for /f "tokens=2-4 delims=/ " %%a in ('date /t') do (set mydate=%%c%%a%%b)
for /f "tokens=1-2 delims=/:" %%a in ('time /t') do (set mytime=%%a%%b)
set TIMESTAMP=%mydate%_%mytime%

set BACKUP_FILE=%BACKUP_DIR%\atelier_%TIMESTAMP%.db

REM Backup SQLite database
if exist "%DB_FILE%" (
    copy "%DB_FILE%" "%BACKUP_FILE%"
    echo OK Database backed up to: %BACKUP_FILE%
) else (
    echo ERROR Database file not found: %DB_FILE%
    exit /b 1
)

REM Cleanup: keep only last 30 backups
REM (simplified for Windows - may need manual cleanup)
echo OK Backup complete!
echo.
echo TIP: Consider deleting old backups manually in %BACKUP_DIR%
pause
