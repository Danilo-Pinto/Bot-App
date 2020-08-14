const fs = require('fs');

module.exports = (path,card=false) =>{
    if(!fs.existsSync(path)){
        if(card){
            fs.writeFileSync(path,JSON.stringify([
                {id: 1,title: "Dinheiro 💵"},
                {id: 2,title: "Cartão de Crédito 💳"}
            ]),err =>{});
        }else{
            fs.writeFileSync(path,JSON.stringify([]),err =>{});
        }
    }
}