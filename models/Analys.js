

- ANALYSIS_RECORD

//Watertech models
//Analys model
const mongoose = require('mongoose');

const Analys = new mongoose.Schema({
    idAnalys : {type:Number, default:0},
    analysTitle : String,
    analysInsight : String,
    analysType : String,
    analysRecord : String,
    analysDate: {type:Date, default:Date.now},

});
module.exports = mongoose.model('Analys', Analys);