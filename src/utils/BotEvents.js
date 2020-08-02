import QrOk from '../assets/qr-ok.svg';
import QrCode from '../assets/qrcode.svg';

const {ipcRenderer} = window.require('electron');

let msg = true

export default (setIcon,setText,setEnable,cont,setCont,setconfirm,confirm) =>{
    
    ipcRenderer.on('qr-ready',(event,data) =>{
        setText('Escanei');
        setIcon(data);
    });
    
    ipcRenderer.on('client-ready',(event,data) =>{
        setEnable(false)
        setIcon(QrOk)
        setText('Stop Bot')
    });

    ipcRenderer.once('auth_failure',(event,data) =>{
        if(msg){
            alert('Algo deu errado tente novamente');
            setEnable(false);
            setText('Start Bot')
            msg = false;
        }
    })

    ipcRenderer.on('stop',(event,data) =>{
        setIcon(QrCode)
        setText('Start Bot');
        setEnable(false);
    })
    
    ipcRenderer.once('data-send',(event,data) =>{
        let next = cont+1
        let confir = confirm+1
        setconfirm(confir)
        setCont(next)
    })

    ipcRenderer.once('confirm-data',(event,data) =>{
        let next = confirm-1
        setconfirm(next);
    })
}