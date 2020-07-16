import React from 'react';
import TitleBar from 'frameless-titlebar'
import {useHistory} from 'react-router-dom'

import './styles.css';

const {ipcRenderer} = window.require('electron');

function AppBar() {
  const history = useHistory();

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
                    history.push('/')
                  }
                },
                {
                  label: 'Bot Menu',
                  click: () =>{
                    history.push('/menu')
                  }
                }
              ]
            }
          ]}/>
    </div>
  );
}

export default AppBar;