const { app, BrowserWindow } = require('electron');
const path = require('path');
const {spawn} = require("child_process");
const kill = require('tree-kill');



const createWindow = () => {
  const win = new BrowserWindow({
    width: 1000,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js')
    },
    icon: path.join(__dirname, 'images/s.ico'),
  });

  win.loadFile('index.html');
  win.setMenuBarVisibility(false);
};

// app.whenReady().then(() => {
//   createWindow();
//
//   app.on('activate', () => {
//     if (BrowserWindow.getAllWindows().length === 0) {
//       createWindow();
//     }
//   });
// });

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});


app.whenReady().then(() => {
  const directoryPath = path.join(__dirname, '../backend_api/modules')
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