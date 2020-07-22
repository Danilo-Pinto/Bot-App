const method_pay = [
    {
        id:1,
        title: "Cartão de Crédito 💳",
    },
    {
        id:2,
        title: "Dinheiro 💵",
    },
]
module.exports = {
    getMethodPay(){
        let pay = '_Método de pagamento_\n\n';

        method_pay.map(
            e => pay += `${e.id} - ${e.title}\n`
        )

        return pay;
    },
    selectMethodPay(id){
        return method_pay.find(
            e => e.id == id
        )
    }
}