// Watertech models
// Billing model
const mongoose = require('mongoose');

const Billing = new mongoose.Schema({
  idBilling: Number,
  billDateTime: { type: Date, default: Date.now },
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  // To get meter SIM NUM
  meter: { type: mongoose.Schema.Types.ObjectId, ref: 'Meter', required: true },
  analysis: { type: mongoose.Schema.Types.ObjectId, ref: 'Analysis', required: true },
  // tarriffCode
});
module.exports = mongoose.model('Billing', Billing);
