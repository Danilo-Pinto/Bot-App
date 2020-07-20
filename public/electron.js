const {app,BrowserWindow,globalShortcut} = require('electron');

const path = require('path');
const isDev = require('electron-is-dev');

const ButtonsController = require('./controllers/ButtonsController');
const Events = require('./controllers/Events');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    frame:false,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow.loadURL(
    isDev ? 'http://localhost:3000' : `file://${path.resolve(__dirname, '..', 'build', 'index.html')}`,
  );

  globalShortcut.register('Control+Q',() =>{
    mainWindow.webContents.openDevTools();
  })

  ButtonsController(mainWindow);
  Events(mainWindow);
  
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});