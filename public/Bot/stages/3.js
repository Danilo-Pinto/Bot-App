const { getItens} = require("../database/data/temp/itens");
const { setAdds,validateUniqueAdds} = require("../database/data/temp/adds"); 
const { selectAdds} = require("../database/data/selects/increments");
const {getFinalyMenu, getTotal} = require('../utils/resumeMenu');
const { getUser } = require('../database/data/users');
const cancel = require("../utils/cancel");
const cleanUser = require("../utils/cleanUser");

module.exports = function(user,msg){
    const limit = getItens(user).length;

    if(getUser()[user].yes){
        const id_ordem = getItens(user)[getUser()[user].cont-1].id
        const item = selectAdds(msg)
        
        switch(msg){
            case '#':
                getUser()[user].yes = false
                
                if(getUser()[user].cont >= limit){
                    getUser()[user].stage = 4
                    cleanUser(user)

                    return [
                        `${getFinalyMenu(user)}\nTotal: R$${getTotal(user)}`,
                        'Envie # para finalizar ou * para cancelar tudo'
                    ]
                }
                
                getUser()[user].cont = getUser()[user].cont+1
            
                return [
                    `Adicional para o pedido:\n*${getUser()[user].cont} - ${getItens(user)[getUser()[user].cont - 1].title} ?*`,
                    'Envie *S* para sim ou *N* para não\nOu * para cancelar tudo'
                ]
            case '*':
                getUser()[user].stage = 0
                cleanUser(user)
                cancel(user,2)
                return ['🚫 Pedido cancelado com sucesso']
        }

        if(!item){
            return ['😅 Não entedi, por favor repita !']
        }

        if(validateUniqueAdds(user,item.title,id_ordem)){
            return ['😅 Desculpe, mas vc já pediu isso']
        }

        setAdds(user,item.title,item.price,id_ordem)
        
        return [
            `✔️ Ok, *${item.title}*, se quiser mais alguma coisa é só enviar o *número do adicional*`,
            'Envie # para finalizar ou * para cancelar tudo'
        ]
    }

    switch(msg.toLowerCase()){
        case 's':
            getUser()[user].yes = true
            return ['Envie o número do *adicional*!']
        case 'n':
            if(getUser()[user].cont >= limit){
                getUser()[user].stage = 4
                cleanUser(user)
                return [
                    `${getFinalyMenu(user)}\nTotal: R$${getTotal(user)}`,
                    'Envie # para finalizar ou * para cancelar tudo'
                ]
            }
            
            getUser()[user].cont = getUser()[user].cont+1
            
            return [
                `Adicional para o pedido:\n*${getUser()[user].cont} - ${getItens(user)[getUser()[user].cont - 1].title} ?*`,
                'Envie *S* para sim ou *N* para não'
            ]    
    }

    return ['😅 Não entedi, por favor repita !']
}