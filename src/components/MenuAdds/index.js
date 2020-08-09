import React,{useState,useEffect} from 'react';
import Modal from 'react-modal';

import Trash from '../../assets/trash.svg';
import Edit from '../../assets/edit.svg';
import styleModal from '../../ModalStyle';
import './styles.css';

const fs = window.require('fs');
const {ipcRenderer} = window.require('electron')

let edit = false;
let id;

function MenuAdds() {

    const [modal,setModal] = useState(false);
    const [rows,setRows] = useState([]);
    const [title,setTitle] = useState('');
    const [price,setPrice] = useState('');

    useEffect(
        () =>{
          setRows(JSON.parse(fs.readFileSync('adds.json')));
        },
        [modal]
    )

    function clearInputs(dialog){
        setTitle('')
        setPrice('')
        setModal(dialog)
    }

    function handleNewAdds(e){
        e.preventDefault();

        const data = {
            id:rows.length+1,
            title,
            price:parseFloat(price)
        }
        if(edit){
            let EditData = rows[id]
            EditData.title = title;
            EditData.price = parseFloat(price);
            
            let rest = rows.filter(e => e.id !== EditData.id);
      
            fs.writeFileSync('adds.json',JSON.stringify([...rest,EditData],null,2));
      
        }else{
            fs.writeFileSync('adds.json',JSON.stringify([...rows,data],null,2));
        }
        edit = false;
        clearInputs(false);
        ipcRenderer.send('NewAdds',JSON.parse(fs.readFileSync('adds.json')));
    }
    function handleEditItem(item,index){
        edit = true;
        id = index
        setTitle(item.title);
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
        fs.writeFileSync('adds.json',JSON.stringify(rest,null,2));
        setRows(JSON.parse(fs.readFileSync('adds.json')));
        ipcRenderer.send('NewAdds',JSON.parse(fs.readFileSync('adds.json')));
    }
    
    return(
      <div className="MenuAdds">
          
          <header>
              <h3># Lista de Adicionais</h3>
              <button onClick={() => clearInputs(true)}>Cadastrar</button>
          </header>

          <Modal style={styleModal(250)} isOpen={modal}>
              <div className="Dialog">
                  <h3>Cadastrar Adicional</h3>
                  <form onSubmit={handleNewAdds}>
                    <input
                        required
                        value={title}
                        onChange={e =>setTitle(e.target.value)}
                        placeholder="Título do Adicional"
                    />
                    <input required type="number" step="0.01" min="0"
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                        placeholder="Valor do Adicional"
                    />
                    <div className="DialogButtons">
                        <button type="submit">Cadastrar</button>
                        <button onClick={() => clearInputs(false)}>Cancelar</button>
                    </div>
                </form>
              </div>
          </Modal>
          
          <ul className="Adds">
            {
                rows.map(
                    (adds,index) =>(
                        <li key={adds.id}>
                            <div className="AddsHeader">
                                <h4># {adds.title}</h4>
                            </div>
                            
                            <strong>Valor:</strong>
                            <p>{Intl.NumberFormat('pt-BR',{style:'currency', currency:'BRL',}).format(adds.price)}</p>

                            <button className="Buttons" onClick={() => deleteItem(index)}>
                                <img alt="" src={Trash}/>
                            </button>
                            
                            <button className="Buttons" onClick={() => handleEditItem(adds,index)}>
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
export default MenuAdds;