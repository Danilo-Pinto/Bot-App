import React,{useEffect,useState} from 'react';
import Modal from 'react-modal'

import Trash from '../../assets/trash.svg';
import Edit from '../../assets/edit.svg';
import './styles.css';
import styleModal from '../../ModalStyle';

const fs = window.require('fs');
const {ipcRenderer} = window.require('electron');

let edit = false;
let id;

function MenuStreat() {

  const [check,setCheck] = useState([false,false,false])
  const [modal,setModal] = useState(false);
  const [name,setName] = useState('');
  const [content,setContent] = useState('');
  const [price,setPrice] = useState('');
  const [rows,setRows] = useState([]);
  
  useEffect(
    () =>{
      setRows(JSON.parse(fs.readFileSync('streat.json')));
    },
    [modal]
  )

  function clearInputs(dialog){
    setName('')
    setContent('')
    setPrice('')
    setModal(dialog)
    setCheck([false,false,false])
  }

  function handleNewStreat(e){
    e.preventDefault();

    const data = {
      id:rows.length+1,
      name,
      content,
      price:parseFloat(price),
    }

    if(edit){
      let rest = rows.map(e =>{
        if(e.id === rows[id].id){
          return {...data,id:e.id};
        }else{
          return e;
        }
      });

      fs.writeFileSync('streat.json',JSON.stringify([...rest],null,2));
    }else{
      fs.writeFileSync('streat.json',JSON.stringify([...rows,data],null,2));
    }
    
    edit = false;
    clearInputs(false);
    ipcRenderer.send('NewStreat',JSON.parse(fs.readFileSync('streat.json')));
  }
  function handleEditStreat(streat,index){
    edit = true;
    id = index;
    setName(streat.name);
    setContent(streat.content);
    checked(streat.name);
    setPrice(streat.price);
    setModal(true);
  }

  function deleteStreat(index){
    let rest = rows.filter(
      e => e.id !== rows[index].id
    );
    rest.map(
      (e,i)=>{
        if(e){
          e.id = i+1
        }
        return false
      }
    )

    fs.writeFileSync('streat.json',JSON.stringify(rest,null,2));
    setRows(JSON.parse(fs.readFileSync('streat.json')));
    ipcRenderer.send('NewStreat',JSON.parse(fs.readFileSync('streat.json')));
  }

  function checked(name){
    switch(name){
      case 'Cidade Operaria':
        return setCheck([true,false,false]);
      case 'Condomínios':
        return setCheck([false,true,false]);
      case 'Outros':
        return setCheck([false,false,true])
      default:
        return false;
    }
  }

  return(
    <div className="MenuStreat">
      
      <header>
        <h3># Lista de Localidades</h3>
        <button onClick={() => clearInputs(true)}>Cadastrar</button>
      </header>

      <Modal style={styleModal(300)} isOpen={modal}>
        <div className="Dialog">
          <h3>Cadastrar Localidade</h3>
          
          <form onSubmit={handleNewStreat}>
            
            <div className="Mult">
              <input required defaultChecked={check[0]} type="radio" name="mult" onClick={() => setName('Cidade Operaria')}/><p>Cidade Operaria</p>
              <input required defaultChecked={check[1]} type="radio" name="mult" onClick={() => setName('Condomínios')}/><p>Condomínios</p>
              <input required defaultChecked={check[2]} type="radio" name="mult" onClick={() => setName('Outros')}/><p>Outros</p>
            </div>
            <input
              required
              placeholder="Localidade"
              value={content}
              onChange={e =>setContent(e.target.value)}
            />
            <input required type="number" step="0.01" min="0"
              placeholder="Valor do Frete"
              value={price}
              onChange={e => setPrice(e.target.value)}
            />
            <div className="DialogButtons">
              <button type="submit">Cadastrar</button>
              <button onClick={() => clearInputs(false)}>Cancelar</button>
            </div>

          </form>
        </div>
      </Modal>
      
      <ul className="Streats">
        {
          rows.map(
            (streat,index) =>(
              <li key={streat.id}>
                
                <div className="StreatHeader">
                  <h4># {streat.name}</h4>
                </div>
                <br/>
                
                <strong>Localidade:</strong>
                <p>{streat.content}</p>

                <strong>Valor:</strong>
                <p>{Intl.NumberFormat('pt-BR',{style:'currency', currency:'BRL',}).format(streat.price)}</p>
                
                <button className="Buttons" onClick={() =>deleteStreat(index)}>  
                  <img alt="" src={Trash}/>
                </button>
                
                <button className="Buttons" onClick={() => handleEditStreat(streat,index)}>
                  <img alt="" src={Edit}/>
                </button>
              </li>
            )
          )
        }
      </ul>
    </div>
  );
}

export default MenuStreat;