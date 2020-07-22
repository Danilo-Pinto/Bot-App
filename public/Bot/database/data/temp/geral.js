var geral = []

module.exports = {
    initGeral(user,street,total){

        const test =  geral.filter(
            e => e.user == user
        )

        if(test.length == 1){
            return geral.filter(
                e => e.user == user
            ).map(
                element => {
                    element.street = street;
                    element.total = total;
                }
            )
        }

        return geral.push({
            user,
            street,
            method_pay:undefined,
            adrees:undefined,
            money_cont:undefined,
            total
        });

    },

    setAdrees(user,adrees){
        return geral.filter(
            e => e.user == user
        ).map(
            element => element.adrees = adrees
        )
    },

    setMethodPay(user,method_pay){
        return geral.filter(
            e => e.user == user
        ).map(
            element => element.method_pay = method_pay
        )
    },
    setMoneyCont(user,money_cont){
        return geral.filter(
            e => e.user == user
        ).map(
            element => element.money_cont = money_cont
        )
    },
    getGeral(user){
        return geral.filter(
            e => e.user == user
        )
    },
    deleteGeral(user){
        geral = geral.filter(
            e => e.user != user
        )
    }
}