// Watertech models
// Task

const mongoose = require('mongoose');

const Task = new mongoose.Schema({
  taskStartDate: { Type: Date, default: Date.now },
  taskDuration: { Type: Number, default: 0 },
  taskStatus: { Type: String, default: 'pending' },
  idTaskUserAssigner: Number,
  idTaskUserAssignee: Number,
  taskInfo: String,
  // To get customer informations
  Customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  Meter: { type: mongoose.Schema.Types.ObjectId, ref: 'Meter', required: true },
});

module.exports = mongoose.model('Task', Task);
