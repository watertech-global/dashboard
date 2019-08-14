//Watertech models
//Worker

const mongoose = require('mongoose');

const Worker = new mongoose.Schema({
    //here define all the entity 
    //attributs according to its representation
    //in the DB
    idWorker: {type:Number, default:0},
    idUser_Worker: {type:Number},
    idCompany_Customer: {type:Number},
    //Worker Date of Join
    workerDoj : {type: Date},
    //Worker Contract Duration
    workerCD : {type: Date},
});

module.exports = mongoose.model('Worker', Worker);