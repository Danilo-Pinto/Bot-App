const fs = require('fs');
const {ipcMain} = require('electron');

require('../../../utils/readFile')('adds.json');

let increments = JSON.parse(fs.readFileSync('adds.json'));

ipcMain.on('NewAdds',(event,data) =>{
    increments = data;
})

module.exports = {
    getAdds(){
        let adds = '➕ _Adicionais_ ➕\n\n';

        increments.map(
            (e,i) => adds += `*${i+1}* - *${e.title}* - R$${e.price}\n`
        )

        return adds;
    },
    selectAdds(id){
        return increments.find(
            (e,i) => (i+1) == id
        )
    }
}