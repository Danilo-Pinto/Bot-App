const menu = [
    {
        id:1,
        title: "X-Burguer",
        price: 10.9,
        description:'Pão, Carne e Bacon'
    },
    {
        id:2,
        title: "X-Frango",
        price: 12.9,
        description:'Pão, Carne e Bacon'
    },
    {
        id:3,
        title: "X-Tudo",
        price: 17.9,
        description:'Pão, Carne e Bacon'
    }
]
module.exports = {
    getMenu(){
        let cardapio = '🍔 _Cardápio_ 🍔\n\n';

        menu.map(
            e => cardapio += `*${e.id}* - *${e.title}* - R$${e.price}\n_${e.description}_\n\n`
        )

        return cardapio;
    },
    selectItem(id){
        return menu.find(
            e => e.id == id
        )
    }
}