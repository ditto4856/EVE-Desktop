@echo off
setlocal
cd /d "%~dp0"
if not exist models mkdir models
set MODELZIP=models\vosk-model-small-en-us-0.15.zip
set MODELARCHIVE=models\vosk-model-small-en-us-0.15.tar.gz
if exist "%MODELARCHIVE%" (
  echo Offline speech model is already downloaded.
  pause
  exit /b 0
)
echo Downloading the Vosk small English speech model (about 40 MB)...
curl.exe -L --fail --retry 3 "https://alphacephei.com/vosk/models/vosk-model-small-en-us-0.15.zip" -o "%MODELZIP%"
if errorlevel 1 (
  echo Download failed. Check your internet connection and try again.
  pause
  exit /b 1
)
echo Extracting the model...
powershell -NoProfile -ExecutionPolicy Bypass -Command "Expand-Archive -LiteralPath '%CD%\%MODELZIP%' -DestinationPath '%CD%\models' -Force"
if errorlevel 1 (
  echo Could not extract the model.
  pause
  exit /b 1
)
echo Packing the model for EVE...
tar.exe -czf "%MODELARCHIVE%" -C models vosk-model-small-en-us-0.15
if errorlevel 1 (
  echo Could not package the model. Make sure Windows tar.exe is available.
  pause
  exit /b 1
)
del "%MODELZIP%"
echo.
echo Offline speech model is ready!
echo Now run BUILD_EVE.bat to create the updated installer.
pause
