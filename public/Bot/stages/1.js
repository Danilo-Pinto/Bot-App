const {selectItem} = require('../database/data/selects/menu');
const {setItens,getItens} = require('../database/data/temp/itens');
const {getUser} = require('../database/data/users');
const { getFinalyMenu, getTotal } = require('../utils/resumeMenu');
const cancel = require('../utils/cancel');

module.exports = function(user,msg){
    const item = selectItem(msg);

    switch(msg){
        case '#':
            if(getItens(user).length == 0) return ['😅 Vc ainda não pediu nada']
            
            getUser()[user].stage = 2

            return [
                `${getFinalyMenu(user)}\nTotal: R$${getTotal(user)}`,
                'Deseja que algum dos seus pedidos venha com *adicional* ?',
                'Envie *S* para sim ou *N* para não\nOu * para cancelar tudo'
            ]
        
        case '*':
            cancel(user,1);
            getUser()[user].stage = 0
            return ['🚫 Pedido cancelado com sucesso']
    }

    if(!item){
        return ['😅 Não entedi, por favor repita !']
    }

    setItens(user,item.title,item.price)

    return [
        `✔️ Ok, *${item.title}*, se quiser mais alguma coisa é só enviar o *número do pedido*`,
        'Envie # para finalizar ou * para cancelar tudo'
    ]
}