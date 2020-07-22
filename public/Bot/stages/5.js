const {selectStreet} = require('../database/data/selects/adrress');
const {initGeral, getGeral} = require('../database/data/temp/geral');
const {getTotal} = require('../utils/resumeMenu');
const { getUser } = require('../database/data/users');
const cancel = require('../utils/cancel');


module.exports = function(user,msg){
    const item = selectStreet(msg)
    
    switch(msg){
        case '#':
            if(!getGeral(user)[0]){
                return ['😅 Não entedi, por favor repita !']
            }
            getUser()[user].stage = 6
            return ['✔️ Ok, agora me informe seu endereço\n*Exemplo*: _Rua Severiano N° 29_']
        case '*':
            getUser()[user].stage = 0
            cancel(user,3);
            return ['🚫 Pedido cancelado com sucesso']
    }

    if(!item){
        return ['😅 Não entedi, por favor repita !']
    }

    initGeral(user,[item.name,item.content,item.price],somar(getTotal(user),item.price))
    return [
        `✔️ Ok, *${item.content}* \nTotal a pagar: *R$${somar(getTotal(user),item.price)}*`,
        'Caso tenha errado, basta enviar novamente !',
        'Envie # para finalizar ou * para cancelar tudo'
    ]
}

function somar(item,soma){
    return parseFloat((item+soma).toFixed(2))
}