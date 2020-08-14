const fs = require('fs');
const {ipcMain} = require('electron');

require('../../../utils/readFile')('pay.json',true);

let method_pay = JSON.parse(fs.readFileSync('pay.json'));

ipcMain.on('EditPay',(event,data) =>{
    method_pay = data;
})

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