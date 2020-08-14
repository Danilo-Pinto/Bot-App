import React,{useState} from 'react';
import Modal from 'react-modal';

import styleModal from '../../ModalStyle';
import QrCode from '../../assets/qrcode.svg';
import './styles.css';

import BotEvents from '../../utils/BotEvents';
const {ipcRenderer} = window.require('electron');
const fs = window.require('fs');

Modal.setAppElement('#root');

function BotControll() {
  const [title,setTitle] = useState('')
  const [openModal,setOpen] = useState(false);
  const [enable,setEnable] = useState(false)
  const [icon,setIcon] = useState(QrCode);
  const [text,setText] = useState('Start Bot')
  const [cont,setCont] = useState(0);
  const [confirm,setconfirm] = useState(0);
  
  BotEvents(setIcon,setText,setEnable,cont,setCont,setconfirm,confirm,setTitle,setOpen);
  
  function validatedata(){
    const menu = JSON.parse(fs.readFileSync('menu.json'));
    const locations = JSON.parse(fs.readFileSync('streat.json'));
    if((menu.length === 0) || (locations.length === 0)){
      setOpen(true);
      setTitle('Não há itens cadastrados, por favor cadastre')
    }else{
      setText('Aguarde');
      setEnable(true);
      ipcRenderer.send('start','start');
    }
  }
  
  return(
    <div className="BotControll">

      <Modal style={styleModal(100)} isOpen={openModal}>
        <div className="Notification">
          <h3>{title}</h3>
          <button onClick={() => setOpen(false)}>Fechar</button>
        </div>
      </Modal>

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
                validatedata();
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