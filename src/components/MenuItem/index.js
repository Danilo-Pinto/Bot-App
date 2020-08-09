import React,{useState,useEffect} from 'react';
import Modal from 'react-modal';

import Trash from '../../assets/trash.svg';
import Edit from '../../assets/edit.svg';
import styleModal from '../../ModalStyle';
import './styles.css';

Modal.setAppElement('#root')

const fs = window.require('fs');
const {ipcRenderer} = window.require('electron')

let edit = false;
let id;

function MenuItem() {

  const [rows,setRows] = useState([]);
  const [modal,setModal] = useState(false);
  const [title,setTitle] = useState('');
  const [price,setPrice] = useState('');
  const [description,setDescription] = useState('');
  
  useEffect(
    () =>{
      setRows(JSON.parse(fs.readFileSync('menu.json')));
    },
    [modal]
  )

  function clearInputs(dialog){
    setTitle('')
    setPrice('')
    setDescription('')
    setModal(dialog)
  }

  function handleNewItem(e){
    e.preventDefault();

    const data = {
      id:rows.length+1,
      title,
      price:parseFloat(price),
      description,
    }
    if(edit){
      let EditData = rows[id]
      EditData.title = title;
      EditData.price = parseFloat(price);
      EditData.description = description;
      
      let rest = rows.filter(e => e.id !== EditData.id);

      fs.writeFileSync('menu.json',JSON.stringify([...rest,EditData],null,2));

    }else{
      fs.writeFileSync('menu.json',JSON.stringify([...rows,data],null,2));
    }
    
    edit = false;
    clearInputs(false);
    ipcRenderer.send('NewItem',JSON.parse(fs.readFileSync('menu.json')));
  }
  function handleEditItem(item,index){
    edit = true;
    id = index
    setTitle(item.title);
    setDescription(item.description);
    setPrice(item.price)
    setModal(true);
  }

  function deleteItem(index){
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

    fs.writeFileSync('menu.json',JSON.stringify(rest,null,2));
    setRows(JSON.parse(fs.readFileSync('menu.json')));
    ipcRenderer.send('NewItem',JSON.parse(fs.readFileSync('menu.json')));
  }

  return(
    <div className="MenuItem">
      
      <header>
        <h3># Lista de Lanches</h3>
        <button onClick={() =>setModal(true)}>Cadastrar</button>
      </header>
      
      <Modal isOpen={modal} style={styleModal(400)}>
        <div className="Dialog">
          <h3>Cadastrar Lanche</h3>
          <form onSubmit={handleNewItem}>
            <input
              required
              value={title}
              onChange={e =>setTitle(e.target.value)}
              placeholder="Título do Lanche"
            />
            <input required type="number" step="0.01" min="0"
              value={price}
              onChange={e => setPrice(e.target.value)}
              placeholder="Valor do Lanche"
            />
            <textarea required
              value={description}
              onChange={e =>setDescription(e.target.value)}
              placeholder="Descrição"
            />
            <div className="DialogButtons">
              <button type="submit">Cadastrar</button>
              <button onClick={() => clearInputs(false)}>Cancelar</button>
            </div>
          </form>
        </div>
      </Modal>

      <ul className="Itens">
        {
          rows.map(
            (item,index) =>(
              <li key={item.id}>
                
                <div className="ItemHeader">
                  <h4># {item.title}</h4>
                </div>
                <br/>
                
                <strong>Descrição:</strong>
                <p>{item.description}</p>

                <strong>Valor:</strong>
                <p>{Intl.NumberFormat('pt-BR',{style:'currency', currency:'BRL',}).format(item.price)}</p>
                
                <button className="Buttons" onClick={() => deleteItem(index)}>  
                  <img alt="" src={Trash}/>
                </button>
                
                <button className="Buttons" onClick={() => handleEditItem(item,index)}>
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

export default MenuItem;