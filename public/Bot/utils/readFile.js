const fs = require('fs');

module.exports = (path) =>{
    if(!fs.existsSync(path)){
        fs.writeFileSync(path,JSON.stringify([]),err =>{});
    }
}