OFFLINE VOSK MODEL

Place the extracted folder vosk-model-small-en-us-0.15 inside this folder.
Then, from Command Prompt opened in the EVE_Windows_App project folder, run:

tar -czf "models\vosk-model-small-en-us-0.15.tar.gz" -C "models" "vosk-model-small-en-us-0.15"

The resulting .tar.gz archive is what the app bundles. Do not run a downloaded script if Windows security blocks it; the commands above can be entered manually after verifying the model came from the official Vosk website.
