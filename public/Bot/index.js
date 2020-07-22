const stages = require('./database/data/stages');
const getStage = require('./utils/getStage');

module.exports = (client,mainWindow) =>{
  client.on('message',message =>{
    stages[getStage(message.from)](message.from,message.body,mainWindow).map(
      
      element => client.sendMessage(
        message.from,
        element
      )
    
    );
  })
}