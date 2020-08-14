import React,{useState} from 'react';
import TitleBar from 'frameless-titlebar'
import {useHistory} from 'react-router-dom'
import Modal from 'react-modal';

import styleModal from '../../ModalStyle';

import './styles.css';

const {ipcRenderer} = window.require('electron');

function AppBar() {
  const history = useHistory();

  const [clicked,setClicked] = useState(true);
  const [isOpen,setOpen] = useState(false);

  ipcRenderer.on('lock', (event,data) =>{
    setClicked(false)
  })
  ipcRenderer.on('unlocks', (event,data) =>{
    setClicked(true)
  })

  return(
    <div className="AppBar">
        <TitleBar
          title="Bot App"
          onClose={()=>ipcRenderer.send('control','close')}
          onMinimize={()=>ipcRenderer.send('control','min')}
          onMaximize={()=>ipcRenderer.send('control','max')}
          menu={[
            {
              label: 'Opções',
              submenu: [
                {
                  label: 'Bot Home',
                  click: () =>{
                    if(clicked){
                      history.push('/')
                    }else{
                      setOpen(true);
                    }
                  }
                },
                {
                  label: 'Bot Menu',
                  click: () =>{
                    if(clicked){
                      history.push('/menu')
                    }else{
                      setOpen(true);
                    }
                  }
                }
              ]
            }
          ]}/>
          
          <Modal style={styleModal(100)} isOpen={isOpen}>
            <div className="Notification">
              <h3>Deslige o Bot para ter acesso as opções</h3>
              <button onClick={() => setOpen(false)}>Fechar</button>
            </div>
          </Modal>
    
    </div>
  );
}

export default AppBar;