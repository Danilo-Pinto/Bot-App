import QrOk from '../assets/qr-ok.svg';
import QrCode from '../assets/qrcode.svg';

const {ipcRenderer} = window.require('electron');

let msg = true

export default (setIcon,setText,setEnable) =>{
    
    ipcRenderer.on('qr-ready',(event,data) =>{
        setText('Escanei');
        setIcon(data);
    });
    
    ipcRenderer.on('client-ready',(event,data) =>{
        setEnable(false)
        setIcon(QrOk)
        setText('Stop Bot')
    });

    ipcRenderer.on('auth_failure',(event,data) =>{
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

}