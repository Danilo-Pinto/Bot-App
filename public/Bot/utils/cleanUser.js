const { getUser } = require("../database/data/users")

module.exports = function (user){
    return(
        getUser()[user].yes = false,
        getUser()[user].cont = 1
    )
}