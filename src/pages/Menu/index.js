import React,{useState} from 'react';

import './styles.css';

import MenuItem from '../../components/MenuItem';

function Menu() {

  const [item,setItem] = useState('');

  function validateItem(name){
    if(item === name) return false
    return setItem(name)
  }

  function render(){
    switch(item){
      case 'menu':
        return <MenuItem/>
      case 'add':
        return <div style={{gridArea:'MI',backgroundColor:'blue'}}/>  
      case 'street':
        return <div style={{gridArea:'MI',backgroundColor:'black'}}/>
      default:
        return <MenuItem/>
    }
  }

  return(
    <div className="Menu">
      <div className="MenuControll">
        <div className="ButtonsMenu">
          <button onClick={() => validateItem('menu')}>Cardápio</button>
          <button onClick={() => validateItem('add')}>Adicionais</button>
          <button onClick={() => validateItem('street')}>Endereços</button>
        </div>
      </div>
      {
        render()
      }
    </div>
  );
}

export default Menu;