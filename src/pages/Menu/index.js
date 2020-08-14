import React,{useState,useEffect} from 'react';
import Modal from 'react-modal';

import styleModal from '../../ModalStyle';
import './styles.css';

import MenuItem from '../../components/MenuItem';
import MenuAdds from '../../components/MenuAdds';
import MenuStreat from '../../components/MenuStreat';

const fs = window.require('fs');
const {ipcRenderer} = window.require('electron');

Modal.setAppElement('#root');

function Menu() {

  const [item,setItem] = useState('');
  const [isOpen,setOpen] = useState(false);
  const [checked,setChecked] = useState(false);

  useEffect(
    () =>{
      const card = (JSON.parse(fs.readFileSync('pay.json'))[1]);
      if(card){
        setChecked(true)
      }else{
        setChecked(false)
      }
    },
    [isOpen]
  )

  function handleCard(){
    const initData = JSON.parse(fs.readFileSync('pay.json'))
    let data = initData

    if(Array.isArray(initData)){
      data = initData[0]
    }
    
    if(checked){
      fs.writeFileSync('pay.json',JSON.stringify([data,{id:2,title: "Cartão de Crédito 💳"}],null,2));
    }else{
      fs.writeFileSync('pay.json',JSON.stringify([data],null,2));
    }
    ipcRenderer.send('EditPay',JSON.parse(fs.readFileSync('pay.json')));
    setOpen(false);
  }

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
          <button onClick={() => setOpen(true)}>Pagamento</button>
        </div>

        <Modal style={styleModal(120)} isOpen={isOpen}>
          <div className="Dialog">
            <h3>Adicionar/Remover Opções de Pagamento</h3>
            <div className="CheckItem">
                <input type="checkbox" value="Cartão de Crédito 💳" checked={checked} onChange={
                  (e) =>{
                    setChecked(e.target.checked)
                  }
                }/>
                <label>Cartão de Crédito</label>
            </div>
            <button onClick={() => setOpen(false)} >Fechar</button>
            <button onClick={handleCard} >Concluir</button>
          </div>
        </Modal>

      </div>
      {
        render()
      }
    </div>
  );
}

export default Menu;