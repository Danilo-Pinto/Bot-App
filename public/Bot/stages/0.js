const {getMenu} = require('../database/data/selects/menu');
const {getUser} = require('../database/data/users');

module.exports = function(user,msg){

    getUser()[user].stage = 1;
    return [
        '🤖 Olá! sou o *Toddy*, serei seu atendente virtual hj\n',
        getMenu(),
        'Para pedir basta enviar o número do seu pedido\nEnvie o número do pedido um de cada vez'
    ]
}