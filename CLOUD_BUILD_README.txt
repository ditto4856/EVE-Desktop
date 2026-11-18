EVE Desktop 1.2 — GitHub cloud build

This package includes a GitHub Actions workflow at .github/workflows/build-windows.yml.
It builds the Windows installer on a GitHub-hosted Windows runner, so you do not need to run Electron Builder locally.

HOW TO GET THE INSTALLER
1. Sign in to GitHub and create a NEW private repository (recommended).
2. Open the repository and choose Add file > Upload files.
3. Extract this ZIP on your computer. Upload the contents of the extracted folder, including BOTH:
   - the .github folder
   - the EVE_Windows_App folder
   Do not upload only EVE_Windows_App; the workflow must be in .github/workflows at the repository root.
4. Commit the uploaded files.
5. In the repository, open the Actions tab. If GitHub asks, enable Actions for the repository.
6. Select “Build EVE for Windows” on the left, click “Run workflow”, then click the green “Run workflow” button.
7. Wait for the workflow to finish successfully.
8. Open the completed workflow run. Under Artifacts, download “EVE-Windows-Installer”.
9. Extract that downloaded artifact ZIP. It contains EVE Setup 1.2.0.exe.

The workflow downloads the Vosk model itself and packages it into the installer. You do not need to run GET_VOSK_MODEL.bat or BUILD_EVE.bat on your PC.

SECURITY NOTES
- The workflow uses GitHub-hosted Windows build machines and does not require disabling Smart App Control or Norton.
- The installer is unsigned. Windows Smart App Control or antivirus software may still warn about an unsigned installer. Do not bypass a warning unless you have independently reviewed the build and are comfortable with its source.
- Keep the repository private if you do not want to publish the source. GitHub account and Actions usage limits may apply.
- This workflow produces an installer artifact; it does not publish a public release or sign the application.
