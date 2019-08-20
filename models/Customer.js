// Watertech models
// Customer

const mongoose = require('mongoose');

const Customer = new mongoose.Schema({
  // here define all the entity
  // attributs according to its representation
  // in the DB
  idCustomer: { type: Number, default: 0 },
  Company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  // Account informations got from user
  Meter: { type: mongoose.Schema.Types.ObjectId, ref: 'Meter', required: true },
});

module.exports = mongoose.model('Customer', Customer);
