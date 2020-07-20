const {ipcMain} = require('electron');
const qr = require('qrcode');
const {Client} = require('whatsapp-web.js');
const fs = require('fs');

module.exports = (mainWindow) =>{
    ipcMain.on('start',(event,data) =>{

        const SESSION_FILE = './session.json';    
        let DataSession;

        if(fs.existsSync(SESSION_FILE)){
            DataSession = require(`../../${SESSION_FILE}`)
        }

        const client = new Client({
            session:DataSession,
            authTimeoutMs: 5000,
            puppeteer:{
                headless:true
            }
        });

        client.on('auth_failure',() =>{
            fs.unlink(SESSION_FILE,(err) =>{})
            mainWindow.webContents.send('auth_failure','failure')
        });

        client.on('disconnected',() =>{
            mainWindow.webContents.send('stop','stop')
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
            mainWindow.webContents.send('client-ready','ready')
        })

        ipcMain.on('stop',(event,data) =>{
            client.destroy();
            mainWindow.webContents.send('stop','stop')
        })

        client.initialize();
    })
}