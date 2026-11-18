@echo off
setlocal
cd /d "%~dp0"
echo ======================================
echo          BUILDING EVE 1.2
echo ======================================
if not exist "models\vosk-model-small-en-us-0.15.tar.gz" (
  echo Offline speech model not found.
  echo First double-click GET_VOSK_MODEL.bat and wait for it to finish.
  pause
  exit /b 1
)
where node >nul 2>nul
if errorlevel 1 (
  echo Node.js was not found. Install Node.js LTS from https://nodejs.org/ and reopen this file.
  pause
  exit /b 1
)
echo Installing dependencies...
npm install
if errorlevel 1 (
  echo Dependency installation failed.
  pause
  exit /b 1
)
echo Building the Windows installer...
npm run dist
if errorlevel 1 (
  echo Build failed. Read the error above.
  pause
  exit /b 1
)
echo.
echo BUILD COMPLETE. Open the dist folder and run EVE Setup 1.2.0.exe.
pause
