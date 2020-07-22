const increments = [
    {
        id:1,
        title: "Batata",
        price: 2
    },
    {
        id:2,
        title: "Gelo",
        price: 0.5
    },
    {
        id:3,
        title: "Bacon",
        price: 3
    }
]

module.exports = {
    getAdds(){
        let adds = '➕ _Adicionais_ ➕\n\n';

        increments.map(
            e => adds += `*${e.id}* - *${e.title}* - R$${e.price}\n`
        )

        return adds;
    },
    selectAdds(id){
        return increments.find(
            e => e.id == id
        )
    }
}