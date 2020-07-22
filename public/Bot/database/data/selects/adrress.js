const address = [
    {
        id: 1,
        name:'Cidade Operaria',
        content:'Unidade 1',
        price: 1
    },
    {
        id: 2,
        name:'Condominio',
        content:'Condomino São José',
        price: 4
    },
    {
        id: 3,
        name:'Bairro',
        content:'São Cristovão',
        price: 3
    },
    {
        id: 4,
        name:'Cidade Operaria',
        content:'Unidade 3',
        price: 5
    }
]


module.exports = {
    showAdrress(){
        let locations = '🛣 _Lista de localidades_ 🛣\n\n'
        let cont = true;
        
        address.filter(e => e.name == 'Cidade Operaria').map(
            e =>{
                if(cont){
                    locations += `*${e.name}*\n`
                    cont = false
                }
                locations += `${e.id} - ${e.content} - R$${e.price}\n`
            }
        )

        cont = true;
        locations +='\n'

        address.filter(e => e.name != 'Cidade Operaria').map(
            e =>{
                if(cont){
                    locations += `*Demais localidades*\n`
                    cont = false
                }
                locations += `${e.id} - ${e.content} - R$${e.price}\n`
            }
        )
        return locations;
    },

    selectStreet(id){
        return address.find(
            e => e.id == id
        )
    }
}