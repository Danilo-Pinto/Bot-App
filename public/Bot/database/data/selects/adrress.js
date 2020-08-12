const fs = require('fs');
const {ipcMain} = require('electron');

require('../../../utils/readFile')('streat.json');

let address = JSON.parse(fs.readFileSync('streat.json'));

ipcMain.on('NewStreat',(event,data) =>{
    address = data;
})

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

        address.filter(e => e.name == 'Condomínios').map(
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
        
        address.filter(e => e.name == 'Outros').map(
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