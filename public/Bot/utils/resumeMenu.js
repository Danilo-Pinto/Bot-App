const {getItens} = require('../database/data/temp/itens')
const {getAdds} = require('../database/data/temp/adds')

module.exports = {
    getFinalyMenu(user){
        let resume = '📝 _Resumo do Pedido_ 📝\n';
        
        getItens(user).map(
            (elemet,i) =>{
                resume += `\n*${i+1}* - *${elemet.title}* - R$${elemet.price}\n`
                getAdds(user).map(
                    e => {
                        if(e.ordem_id == elemet.id){
                            resume += `_Adicional de *${e.title}*_ - R$${e.price}\n`
                        }
                    }
                )
            }
        )
        return resume;
    },
    getTotal(user){
        let total = 0;

        getItens(user).map(
            element => {
                total += element.price
                getAdds(user).map(
                    value => {
                        if(value.ordem_id == element.id){
                            total += value.price
                        }
                    }
                ) 
            }
        )

        return parseFloat((total).toFixed(2))
    }
}