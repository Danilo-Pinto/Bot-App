const {getUser,setUser} = require('../database/data/users');

module.exports = function getStage(user){
    if(getUser()[user] === undefined){
        return setUser(user)[user].stage
    }

    return getUser()[user].stage
}