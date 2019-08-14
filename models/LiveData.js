
//Watertech models
//LiveData model
const mongoose = require('mongoose');

const LiveData = new mongoose.Schema({
    idLiveData : {type:Number, default:0},
    // Statuts 0 = specific data et 1 = general data
    liveDataype : {type:Boolean, default:0},
    liveDataDate: {type:Date, default:Date.now},
    liveDataInstantaneousFlowRate : String, 
    liveDataAverageFlowRate : String,
    liveDataFlowControlLevel : String,
    liveDataDailyConsumption : String,
    liveDataTotalConsumption : String,
    liveDataBatteryLevel : String,
    liveDataGeneralInfos : String,
    //Meter informations got from Meter
    idMeter_LiveData: {type:Number},
    //Customer informations got from Customer
    idCustomer_LiveData: {type:Number},
    //Task informations got from Task
    idTask_LiveData: {type:Number},

    
});
module.exports = mongoose.model('LiveData', LiveData);