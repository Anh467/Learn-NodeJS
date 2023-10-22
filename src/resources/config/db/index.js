const mongoose  = require('mongoose');
const config = require('./config');
const mongoDB = config.mongoDB
async function connect(){
    
    try{
        await mongoose.connect( mongoDB.url + '/' + mongoDB.DB)
        console.log('############ mongoose Connected! ############')
    }catch(error){
        console.log('Connecte fail: ' + error.message);
    }
}

module.exports = { connect }