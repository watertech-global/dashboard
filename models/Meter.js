//Watertech models
//Meter

const mongoose = require('mongoose');

const Meter = new mongoose.Schema({
    //here define all the entity 
    //attributs according to its representation
    //in the DB

    idMeter: {type:Number, default:0},
    meterMacNumber: String,
    meterRFIDNumber: String,
    meterSIMNumber: String,
    meterHardwareVersion : String,
    meterFirmewareVersion : String,
    meterIssueDate: {type:Date, default:Date.now},
    meterCommissionigDate: {type:Date, default:Date.now},
    meterInfos : String,
    // Statuts 0 = Non utiisé et 1 = Utilisé
    meterStatus : {type:Boolean, default:0},
    meterOther : String,
    //GPS LOACTION
    meterLocation : 
    {
        Lat: String,
        Long: String,
        Alti: String,
    },
});

module.exports = mongoose.model('Meter', Meter);