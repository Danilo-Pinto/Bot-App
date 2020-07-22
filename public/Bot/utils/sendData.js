const {getItens} = require('../database/data/temp/itens')
const {getAdds} = require('../database/data/temp/adds')
const {getGeral} = require('../database/data/temp/geral')

module.exports = (user) =>{
    return {
        info:getGeral(user),
        itens:getItens(user),
        adds:getAdds(user)
    }
}