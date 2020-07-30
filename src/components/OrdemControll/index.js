import React,{useState} from 'react';

import track from '../../assets/track.mp3';
import OrdemItem from '../OrdemItem';
import './styles.css';

const {ipcRenderer} = window.require('electron');

function OrdemControll() {
  const notification = new Audio(track);
  const [ordens,setOrdens] = useState([]);

  ipcRenderer.once('data-send',(event,data) =>{
    setOrdens([...ordens,data]);
    notification.play();
  })
  
  function renderData(){
    if(ordens.length === 0){
      return (
        <h3 className="not-data">Não há pedidos para mostrar</h3>
      )
    }else{
      return(
        <ul>
          {
            ordens.map(
              (element,index) => <OrdemItem itens={element} index={index+1} key={index}/>
            )
          }
        </ul> 
      )
    }
  }

  return(
    <div className="OrdemControll">
      {renderData()}
    </div>
  );
}

export default OrdemControll;