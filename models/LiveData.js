// Watertech models
// LiveData model
const mongoose = require('mongoose');

const LiveData = new mongoose.Schema({
  idLiveData: { type: Number, default: 0 },
  liveDataype: { type: Boolean, default: 0 },
  liveDataDate: { type: Date, default: Date.now },
  liveDataInstantaneousFlowRate: String,
  liveDataAverageFlowRate: String,
  liveDataFlowControlLevel: String,
  liveDataDailyConsumption: String,
  liveDataTotalConsumption: String,
  liveDataBatteryLevel: String,
  liveDataGeneralInfos: String,
  // Meter informations got from Meter
  Meter: { type: Schema.number.ObjectId, ref: 'Meter', required: true },
  // Customer informations got from Customer
  Customer: { type: Schema.ObjectId, ref: 'Customer', required: true },
  // Task informations got from Task
  Task: { type: Schema.ObjectId, ref: 'Task', required: true },
});
module.exports = mongoose.model('LiveData', LiveData);
