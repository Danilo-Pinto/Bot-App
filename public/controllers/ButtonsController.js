const {ipcMain} = require('electron');

module.exports = (mainWindow) =>{
    ipcMain.on('control', (event,data) =>{
        switch(data){
          case 'min':
            mainWindow.minimize();
            break;
          case 'close':
            mainWindow.close();
            break;
          case 'max':
            mainWindow.isMaximized() ? mainWindow.restore() : mainWindow.maximize();
            break;
        }
      })
}