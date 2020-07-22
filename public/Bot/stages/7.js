const { selectMethodPay } = require("../database/data/selects/method_pay")
const { setMethodPay,getGeral, setMoneyCont} = require("../database/data/temp/geral")
const { getUser } = require("../database/data/users");
const cancel = require("../utils/cancel");
const sendData = require("../utils/sendData");

module.exports = function(user,msg,mainWindow){
    const item = selectMethodPay(msg)

    if(getUser()[user].money_cont){

        switch(msg){
            case '#':
                
                if(!getGeral(user)[0].money_cont) return ['😅 Não entedi, por favor repita !']
                mainWindow.webContents.send('data-send',sendData(user));
                cancel(user,3)
                getUser()[user].stage = 0
                getUser()[user].money_cont = false
                
                return ['_Seu pedido estará chegando em breve, aguarde !_\n(Não responda essa mensagem, por favor)']
            case '*':
                cancel(user,3)
                getUser()[user].stage = 0
                getUser()[user].money_cont = false
                return ['🚫 Pedido cancelado com sucesso']
        }

        if(!isNaN(msg)){
            setMoneyCont(user,msg)
            
            return [
                `✔️ Ok, troco para *R$${msg}*`,
                'Caso tenha errado, basta enviar novamente !',
                'Envie # para finalizar ou * para cancelar tudo'
            ]
        }
        return ['Por favor digite apenas numeros ']
    }

    switch(msg){
        case '#':
            
            if(getGeral(user)[0].method_pay == 'Dinheiro 💵'){
                getUser()[user].money_cont = true;
                return [
                    'Quanto vc tem para facilitar o troco ?\n_Obs: envie apenas números, caso o valor tenha centavos substitua a *vírgula(,)* por *ponto(.)*_\n_Exemplo: 10.50_',
                ]
            }
            if(!getGeral(user)[0].method_pay) return ['😅 Não entedi, por favor repita !']
            mainWindow.webContents.send('data-send',sendData(user));
            getUser()[user].stage = 0
            cancel(user,3)
            
            return ['_Seu pedido estará chegando em breve, aguarde !_\n(Não responda essa mensagem, por favor)']
        case '*':
            getUser()[user].stage = 0
            cancel(user,3)    
            return ['🚫 Pedido cancelado com sucesso']
    }

    if(!item){
        return ['😅 Não entedi, por favor repita !']
    }

    setMethodPay(user,item.title);

    return [
        `✔️ Ok, *${item.title}*`,
        'Caso tenha errado, basta enviar novamente !',
        'Envie # para finalizar ou * para cancelar tudo'
    ]
}