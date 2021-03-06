const {getUser} = require("../database/data/users");
const {showAdrress} = require("../database/data/selects/adrress");
const cancel = require("../utils/cancel");

module.exports = function(user,msg){
    switch(msg){
        case '#':
            getUser()[user].stage = 5
            return [
                showAdrress(),
                '_Obs: Se seu endereço não estiver na lista infelizmente não poderemos fazer a entrega, nesse caso, por favor cancele o pedido_',
                'Envie o número da sua localidade :'
            ]
        case '*':
            getUser()[user].stage = 0
            cancel(user,2)
            return ['🚫 Pedido cancelado com sucesso']
    }
    return ['😅 Não entedi, por favor repita !']
}