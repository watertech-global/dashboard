// Watertech models
// Billing model
const mongoose = require('mongoose');

const Billing = new mongoose.Schema({
  idBilling: Number,
  billDateTime: { type: Date, default: Date.now },
  Company: { type: Schema.ObjectId, ref: 'Company', required: true },
  Customer: { type: Schema.ObjectId, ref: 'Customer', required: true },
  // To get meter SIM NUM
  Meter: { type: Schema.ObjectId, ref: 'Meter', required: true },
  Analysis: { type: Schema.ObjectId, ref: 'Analysis', required: true },
  // tarriffCode
});
module.exports = mongoose.model('Billing', Billing);
