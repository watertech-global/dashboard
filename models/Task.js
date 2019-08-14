//Watertech models
//Task

const mongoose = require ('mongoose');

const Task = new mongoose.Schema({
    idTask : {Type: Number, default:'0'},
    taskStartDate : {Type: Date, default:Date.now},
    taskDuration : {Type: Number, default:'0'},
    taskStatus : {Type: String, default:'pending'},
    idTaskUserAssigner: Number,
    idTaskUserAssignee: Number,
    taskInfo : String,
    //To get customer informations
    idCustomer : Number,
    idMeter : Number

});

module.exports = mongoose.model('Task', Task);