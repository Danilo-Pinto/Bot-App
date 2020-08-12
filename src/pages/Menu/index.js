import React,{useState} from 'react';

import './styles.css';

import MenuItem from '../../components/MenuItem';
import MenuAdds from '../../components/MenuAdds';
import MenuStreat from '../../components/MenuStreat';

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
        return <MenuAdds/>  
      case 'street':
        return <MenuStreat/>
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