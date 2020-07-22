const {deleteItens} = require('../database/data/temp/itens');
const {deleteAdds} = require('../database/data/temp/adds');
const {deleteGeral} = require('../database/data/temp/geral');

module.exports = function(user,id){
    switch(id){
        case 1:
            return deleteItens(user);
        case 2:
            return(
                deleteItens(user),
                deleteAdds(user)
            );
        case 3:
            return(
                deleteItens(user),
                deleteAdds(user),
                deleteGeral(user)
            );
    }
}