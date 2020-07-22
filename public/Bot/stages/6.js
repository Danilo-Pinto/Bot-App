const { setAdrees, getGeral} = require("../database/data/temp/geral");
const { getUser } = require("../database/data/users");
const { getMethodPay } = require("../database/data/selects/method_pay");
const cancel = require("../utils/cancel");


module.exports = function(user,msg){
    
    switch(msg){
        case '#':
            if(!getGeral(user)[0].adrees){
                return ['😅 Não entedi, por favor repita !']
            }
            getUser()[user].stage = 7
            return [getMethodPay(),'Envie sua opção de pagamento:']
        case '*':
            getUser()[user].stage = 0
            cancel(user,3)
            return ['🚫 Pedido cancelado com sucesso']
    }

    setAdrees(user,msg);
    return [
        `✔️ Ok, *${msg}*`,
        'Caso tenha errado, basta enviar novamente !',
        'Envie # para finalizar ou * para cancelar tudo'
    ]
}