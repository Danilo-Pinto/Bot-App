import React from 'react';

import './styles.css';

const {remote} = window.require('electron');

function OrdemItem({itens,index}) {
  const ref = React.createRef();
  const click = React.createRef();

  function handleClick(){
    remote.getCurrentWindow().webContents.send('confirm-data','confirm');
    click.current.setAttribute("disabled", "disabled");
    ref.current.classList.add('ready')
    ref.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  function showTroco(money_cont){
    if(money_cont) return (
      <p>Troco para {money_cont}</p>  
    )
  }

  function validateAdreas(adreas){
    if(adreas === 'Cidade Operaria'){
      return 'Cidade Operaria - '
    }
  }

  function clearUser(user){
    let code = user.split('@')[0].split('55')[1].split('');
    let number = '';
    code.map(
      (e,i) =>{
        if(i > 1){
          number += e;
        }
        return false ;
      }
    )
    return `(${code[0]}${code[1]}) 9${number}`;
  }
  
  return(
    <li ref={ref} className="information">
      <h3>Pedido N° {index}</h3>
      <div className="conteiner">
        <div className="info">
          <strong>Cliente</strong>
          <p>{clearUser(itens.info.user)}</p>
          <br/>
          <strong>Endereço</strong>
          <p>{validateAdreas(itens.info.street[0])}{itens.info.street[1]}</p>
          <p>{itens.info.adrees}</p>
          <br/>
          <strong>Método de Pagamento</strong>
          <p>{itens.info.method_pay}</p>
          {showTroco(itens.info.money_cont)}
        </div>
        <div className="ordem">
          <div>
          <strong>Informações do Pedido</strong>
          <ul>
            {
              itens.itens.map((ordens,index)=>(
                <li key={index}>
                  <p>{ordens.title}</p>
                  {
                    itens.adds.map((adds,index) =>{
                      if(adds.ordem_id === ordens.id){
                        return (<p key={index}>+ {adds.title}</p>)
                      }
                      return false;
                    })
                  }
                  <br/>
                </li>
              ))
            }
          </ul>
          <strong>Total : R${itens.info.total}</strong>
          </div>
          <div className="btn-right">
            <i/>
            <button onClick={handleClick} ref={click}>Confirmar</button>
          </div>
        </div>
      </div>
    </li>
  );
}

export default OrdemItem;