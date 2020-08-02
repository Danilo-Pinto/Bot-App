const {ipcMain} = require('electron');
const qr = require('qrcode');
const {Client,/* path */ } = require('whatsapp-web.js');
const fs = require('fs');
const StartBot = require('../Bot/index');

module.exports = (mainWindow) =>{
    ipcMain.on('start',(event,data) =>{

        const SESSION_FILE = './session.json';    
        let DataSession;

        if(fs.existsSync(SESSION_FILE)){
            DataSession = JSON.parse(fs.readFileSync(SESSION_FILE));
        }

        const client = new Client({
            session:DataSession,
            authTimeoutMs: 5000,
            puppeteer:{
                /* executablePath:path() */
            }
        });

        client.on('auth_failure',() =>{
            fs.unlink(SESSION_FILE,(err) =>{})
            mainWindow.webContents.send('auth_failure','failure')
            mainWindow.webContents.send('unlocks','unlocks-buttons');
        });

        client.on('disconnected',() =>{
            mainWindow.webContents.send('stop','stop')
            mainWindow.webContents.send('unlocks','unlocks-buttons');
        })

        client.on('authenticated', (session) =>{
            fs.writeFile(SESSION_FILE,JSON.stringify(session), err =>{
                if(err) throw err
            })
        });
        
        client.on('qr', (qrcode) =>{
            qr.toDataURL(qrcode,{margin:0,width:177},(err,QRdata) =>{
                if(err) throw err
                mainWindow.webContents.send('qr-ready',QRdata);
            })
        })
        client.on('ready',() =>{
            mainWindow.webContents.send('client-ready','ready');
        })

        StartBot(client,mainWindow);
        
        ipcMain.on('stop',(event,data) =>{
            client.destroy();
            mainWindow.webContents.send('stop','stop');
            mainWindow.webContents.send('unlocks','unlocks-buttons');
        })

        client.initialize();
        mainWindow.webContents.send('lock','lock-buttons');
    })
}