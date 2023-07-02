import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import { spawn } from 'child_process';
import treeKill from 'tree-kill';

let terminal: any;
let isTerminating = false;

process.env.DIST = path.join(__dirname, '../dist');
process.env.PUBLIC = app.isPackaged ? process.env.DIST : path.join(process.env.DIST, '../public');

let win: BrowserWindow | null = null;

function createWindow() {
  win = new BrowserWindow({
    minWidth: 768,
    minHeight: 500,
    icon: path.join(process.env.PUBLIC, 'electron-vite.svg'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
    },
  });

  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', new Date().toLocaleString());
  });

  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(process.env.DIST, 'index.html'));
  }
}

app.whenReady().then(() => {
  const directoryPath = path.join(__dirname, '../../backend_api/modules');
  const command = 'uvicorn main:app';

  const shell = process.platform === 'win32' ? 'cmd.exe' : 'bash';
  const shellArgs = process.platform === 'win32' ? ['/c'] : ['-c'];

  terminal = spawn(shell, [...shellArgs, command], {
    cwd: directoryPath,
    shell: true,
    stdio: 'ignore',
  });

  createWindow();
});

app.on('before-quit', (event) => {
  if (!isTerminating) {
    event.preventDefault();
    isTerminating = true;

    treeKill(terminal.pid, 'SIGTERM', (err) => {
      if (err) {
        console.error('Failed to kill terminal process:', err);
        isTerminating = false;
      } else {
        app.quit();
      }
    });
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
