import { app, BrowserWindow } from 'electron'
import path from 'node:path'
import { spawn } from 'child_process';
import kill from 'tree-kill';

let terminal 
let isTerminating = false

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.js
// │
process.env.DIST = path.join(__dirname, '../dist')
process.env.PUBLIC = app.isPackaged ? process.env.DIST : path.join(process.env.DIST, '../public')


let win: BrowserWindow | null
// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']

function createWindow() {

  win = new BrowserWindow({
    minWidth: 1000,
    minHeight: 500,
     // nodeIntegration: true,
    icon: path.join(process.env.PUBLIC, 'electron-vite.svg'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
    // autoHideMenuBar: true,
    // fullscreen: true
  })

  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString())
  })

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(process.env.DIST, 'index.html'))
  }
}

app.whenReady().then(() => {
 const directoryPath = path.join(__dirname, '../../backend_api/modules')
  const command = 'uvicorn main:app';
  terminal = spawn(process.platform === 'win32' ? 'cmd.exe' : 'bash', [], {
    cwd: directoryPath,
    shell: true,
  });
  
  terminal.stdin.write(`${command}\n`)
  createWindow()
})

app.on('before-quit', (event) => {
  if (!isTerminating) {
    event.preventDefault();
    isTerminating = true;
    kill(terminal.pid, 'SIGTERM', (err) => {
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
  if (process.platform !== 'darwin') app.quit()
})