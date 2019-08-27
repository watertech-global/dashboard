// Watertech models
// Record

const mongoose = require('mongoose');

const Record = new mongoose.Schema({
  // here define all the entity
  // attributs according to its representation
  // in the DB
  recordDate: { Type: Date, default: Date.now },
  recordActionType: { type: Number },
  recordActionSummary: String,
  recordOther: String,
});

module.exports = mongoose.model('Record', Record);
