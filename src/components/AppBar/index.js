import React,{useState} from 'react';
import TitleBar from 'frameless-titlebar'
import {useHistory} from 'react-router-dom'

import './styles.css';

const {ipcRenderer} = window.require('electron');

function AppBar() {
  const history = useHistory();

  const [clicked,setClicked] = useState(true);

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
                      alert('Deslige o Bot para ter acesso as opções')
                    }
                  }
                },
                {
                  label: 'Bot Menu',
                  click: () =>{
                    if(clicked){
                      history.push('/menu')
                    }else{
                      alert('Deslige o Bot para ter acesso as opções')
                    }
                  }
                }
              ]
            }
          ]}/>
    </div>
  );
}

export default AppBar;