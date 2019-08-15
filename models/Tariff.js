// watertech models
// Tarrif

const mongoose = require('mongoose');

const Tarrif = new mongoose.Schema({
  // Here gotta should use the mongodb default on data seeding...
  // For all IDs
  tarrifCode: { type: String, default: 0 },
  currency: {
    symbol: String,
    fullLetterName: String,
  },
  tariffPlan: {
    costPMC: Number,
    taxes: [],
    rates: [],
    details: String,
  },
});

module.exports = mongoose.model('Tarrif', Tarrif);
