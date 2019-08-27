// Watertech models
// Customer

const mongoose = require('mongoose');

const Customer = new mongoose.Schema({
  // here define all the entity
  // attributs according to its representation
  // in the DB
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  meter: { type: mongoose.Schema.Types.ObjectId, ref: 'Meter', required: true },
  // Account informations got from user
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

module.exports = mongoose.model('Customer', Customer);
