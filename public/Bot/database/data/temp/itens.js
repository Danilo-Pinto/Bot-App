const generateUniqueID = require('../../../utils/generateUniqueId');

var itens = []

module.exports = {
    getItens(user){
        return itens.filter(
            element => element.user == user
        )

    },

    setItens(user,title,price){
        return itens.push({
            id:generateUniqueID(),
            title,
            price,
            user
        });

    },
    deleteItens(user){
        itens = itens.filter(
            e => e.user != user
        )
    }

}