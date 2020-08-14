const {getAdds} = require('../database/data/selects/increments');
const {showAdrress} = require('../database/data/selects/adrress');
const { getUser } = require('../database/data/users');
const cancel = require('../utils/cancel');
const { getItens } = require('../database/data/temp/itens');

module.exports = function(user,msg){
    
    switch(msg.toLowerCase()){
        case 's':
            getUser()[user].stage = 3
            return [
                getAdds(),
                `Adicional para o pedido:\n*1 - ${getItens(user)[0].title} ?*`,
                'Envie *S* para sim ou *N* para não\n'
            ]
        case 'n':
            getUser()[user].stage = 5
            return [
                showAdrress(),
                '_Obs: Se seu endereço não estiver na lista infelizmente não poderemos fazer a entrega, nesse caso, por favor cancele o pedido_',
                'Envie o número da sua localidade :'
            ]
        case '*':
            cancel(user,1)
            getUser()[user].stage = 0
            return ['🚫 Pedido cancelado com sucesso']
    }

    return ['😅 Não entedi, por favor repita !']
}