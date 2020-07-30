import React,{useState} from 'react';
import QrCode from '../../assets/qrcode.svg';
import './styles.css';

import BotEvents from '../../utils/BotEvents';
const {ipcRenderer} = window.require('electron');

function BotControll() {
  const [enable,setEnable] = useState(false)
  const [icon,setIcon] = useState(QrCode);
  const [text,setText] = useState('Start Bot')
  const [cont,setCont] = useState(0);
  const [confirm,setconfirm] = useState(0);
  
  BotEvents(setIcon,setText,setEnable);
  
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
  
  return(
    <div className="BotControll">
      <div className="Controllers">
        <div className="QrBorde">
          <img alt="" src={icon}/>
        </div>
        <button 
        disabled={enable}
        onClick={
          () =>{
            
            switch(text){
              case 'Start Bot':
                setText('Aguarde');
                setEnable(true);
                ipcRenderer.send('start','start');
                break;
              case 'Stop Bot':
                ipcRenderer.send('stop','stop');
                break;
              default:
                break;
            }
            
          }
        }>{text}</button>
      </div>
      <div className="cont">
        <div>Recebidos: {cont}</div>
        <div>Não Confirmados: {confirm}</div>
      </div>
    </div>
  );
}

export default BotControll;