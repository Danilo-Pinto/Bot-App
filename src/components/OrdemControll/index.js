import React from 'react';

import './styles.css';

const {ipcRenderer} = window.require('electron')

function OrdemControll() {

  ipcRenderer.on('data-send',(event,data) =>{
    console.log(data);
  })

  return(
    <div className="OrdemControll">
        
    </div>
  );
}

export default OrdemControll;