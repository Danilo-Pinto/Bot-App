const users = {
}

module.exports = {    
    getUser(){
        return users
    },

    setUser(user){
        const newUser = {
            [user]:{
                stage:0,
                yes: false,
                money_cont:false,
                cont:1
            }
        }

        Object.assign(users,newUser)
        
        return users;

    }

}