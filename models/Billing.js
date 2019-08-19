// Watertech models
// Billing model
const mongoose = require('mongoose');

const Billing = new mongoose.Schema({
  idBilling: Number,
  billDateTime: { type: Date, default: Date.now },
  Company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  Customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  // To get meter SIM NUM
  Meter: { type: mongoose.Schema.Types.ObjectId, ref: 'Meter', required: true },
  Analysis: { type: mongoose.Schema.Types.ObjectId, ref: 'Analysis', required: true },
  // tarriffCode
});
module.exports = mongoose.model('Billing', Billing);
