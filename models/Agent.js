//
//Agent
const mongoose = require('mongoose');
//Instantiate a mongoose object
//Then invoke the Schema method
//Passing the JSON representation of the Agent Entity
const Agent = new mongoose.Schema({
    idAgent : {type:Number, default:0},
    //Get agent name, contacts and so on in user file
    //Even creds : login and pw...gotten from user file
    idUserAgent:Number,
    idCompany:Number,
    details: String
});
module.exports = mongoose.model('Agent', Agent);