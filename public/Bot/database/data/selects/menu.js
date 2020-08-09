const fs = require('fs');
const {ipcMain} = require('electron');

require('../../../utils/readFile')('menu.json');

let menu = JSON.parse(fs.readFileSync('menu.json'));

ipcMain.on('NewItem',(event,data) =>{
    menu = data;
})

module.exports = {
    getMenu(){
        let cardapio = '🍔 _Cardápio_ 🍔\n\n';

        menu.map(
            (e,i) => cardapio += `*${i+1}* - *${e.title}* - R$${e.price}\n_${e.description}_\n\n`
        )

        return cardapio;
    },
    selectItem(id){
        return menu.find(
            (e,i) => (i+1) == id
        )
    }
}