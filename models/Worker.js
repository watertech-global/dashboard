// Watertech models
// Worker

const mongoose = require('mongoose');

const Worker = new mongoose.Schema({
  // here define all the entity
  // attributs according to its representation
  // in the DB

  idWorker: { type: Number, default: 0 },
  User: { type: Schema.ObjectId, ref: 'User', required: true },
  Company: { type: Schema.ObjectId, ref: 'Company', required: true },
  // Worker Date of Join
  workerDoj: { type: Date },
  // Worker Contract Duration
  workerCD: { type: Date },
});

module.exports = mongoose.model('Worker', Worker);
