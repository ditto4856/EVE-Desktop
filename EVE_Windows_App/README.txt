EVE Desktop 1.2 — Offline Voice Edition

This project updates the former EDITH prototype and renames the desktop app to EVE. It keeps the light-blue holographic orb, Ollama default (llama3.1:8b), preferred Hazel/system text-to-speech voice, and local Vosk speech recognition.

FIRST-TIME SETUP
1. Install Node.js LTS from https://nodejs.org/ if it is not already installed.
2. Extract this project to a normal folder, e.g. Documents\EVE_Windows_App.
3. Download the Vosk small English model from https://alphacephei.com/vosk/models/vosk-model-small-en-us-0.15.zip.
4. Extract the model folder into this project's models folder. The model folder should be models\vosk-model-small-en-us-0.15.
5. In Command Prompt opened inside this project folder, create the archive with:
   tar -czf "models\vosk-model-small-en-us-0.15.tar.gz" -C "models" "vosk-model-small-en-us-0.15"
6. Run npm install, then npm run dist. Or use BUILD_EVE.bat if Windows allows it.
7. The installer is created in dist as EVE Setup 1.2.0.exe.

STARTUP EXPERIENCE
EVE opens with a short animated blue-orb startup sequence, then a main menu with Start and Settings. Settings links to voice/microphone settings, AI/Ollama settings, and Developer access.

DEVELOPER ACCESS PIN
The first time Developer access is opened, choose a 6–12 digit PIN inside the app and confirm it. The PIN is stored as a salted SHA-256 hash in the app's local profile; it is not stored as plain text. This is a convenience gate for casual access, not strong security against someone who can access your Windows account or modify the application files.

VOICE AND AI
- Vosk performs speech recognition locally using a bundled WebAssembly engine and the downloaded model. The model download and npm dependency installation require internet access during setup.
- The included small model is US English; recognition accuracy can vary with Irish accents.
- Hazel is used if an installed Windows speech voice with that name is available; otherwise EVE uses an available English system voice.
- EVE defaults to Ollama at http://localhost:11434 using llama3.1:8b. Install Ollama from https://ollama.com/ and run: ollama pull llama3.1:8b
- Weather and Wikipedia lookups need internet access. Ollama prompts remain local when using the local Ollama endpoint.

WINDOWS SECURITY
This project is unsigned. Windows Smart App Control or antivirus software may block unsigned build tools or installers. Do not disable security protections or allow/quarantine files blindly. Check the exact detection details with your security software. If the local build tools are blocked, a separately configured cloud build can be considered.

VOICE LAUNCH
Windows Voice Access can launch the installed app by saying “Open EVE” when Voice Access is enabled. This project does not include an always-listening “Hey EVE” wake word.

CLOUD BUILD (RECOMMENDED IF LOCAL BUILD IS BLOCKED)
A GitHub Actions workflow is included in the ZIP at .github/workflows/build-windows.yml.
See CLOUD_BUILD_README.txt in the ZIP root for instructions. The workflow downloads and packages the Vosk model and builds the installer on a GitHub-hosted Windows machine. It does not require running the local .bat files.
