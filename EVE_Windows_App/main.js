const { app, BrowserWindow, session, shell } = require('electron');
const path = require('path');
const fs = require('fs');
const http = require('http');
const mime = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.wasm': 'application/wasm', '.json': 'application/json', '.css': 'text/css',
  '.gz': 'application/gzip', '.svg': 'image/svg+xml', '.png': 'image/png'
};

// Serve the bundled interface and offline Vosk files from localhost. This gives
// Chromium a secure local origin for microphone access and Web Workers.
function startLocalServer() {
  return new Promise((resolve, reject) => {
    const server = http.createServer((req, res) => {
      let pathname;
      try { pathname = decodeURIComponent(new URL(req.url, 'http://127.0.0.1').pathname); }
      catch { res.writeHead(400); return res.end('Bad request'); }
      if (pathname === '/') pathname = '/index.html';
      const filePath = path.resolve(__dirname, '.' + pathname);
      if (!filePath.startsWith(path.resolve(__dirname) + path.sep)) {
        res.writeHead(403); return res.end('Forbidden');
      }
      fs.stat(filePath, (err, stat) => {
        if (err || !stat.isFile()) { res.writeHead(404); return res.end('Not found'); }
        res.writeHead(200, {
          'Content-Type': mime[path.extname(filePath).toLowerCase()] || 'application/octet-stream',
          'Content-Length': stat.size,
          'Cache-Control': 'no-store',
          'Access-Control-Allow-Origin': '*'
        });
        if (req.method === 'HEAD') return res.end();
        fs.createReadStream(filePath).pipe(res);
      });
    });
    server.on('error', reject);
    server.listen(48763, '127.0.0.1', () => resolve({ server, url: 'http://127.0.0.1:48763/' }));
  });
}

async function createWindow(startUrl) {
  const win = new BrowserWindow({
    width: 1280, height: 900, minWidth: 760, minHeight: 620,
    title: 'EVE', backgroundColor: '#06101a', autoHideMenuBar: true,
    webPreferences: { contextIsolation: true, nodeIntegration: false, sandbox: true }
  });
  await win.loadURL(startUrl);
  session.defaultSession.setPermissionRequestHandler((webContents, permission, callback) => {
    callback(permission === 'media' || permission === 'notifications');
  });
  session.defaultSession.setPermissionCheckHandler((webContents, permission) => {
    return permission === 'media' || permission === 'notifications';
  });
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https://') || url.startsWith('http://')) shell.openExternal(url);
    return { action: 'deny' };
  });
}

let localServer;
app.whenReady().then(async () => {
  const local = await startLocalServer();
  localServer = local.server;
  await createWindow(local.url);
  app.on('activate', async () => {
    if (BrowserWindow.getAllWindows().length === 0) await createWindow(local.url);
  });
});
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
app.on('before-quit', () => { if (localServer) localServer.close(); });
