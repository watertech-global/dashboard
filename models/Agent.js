//
// Agent
const mongoose = require('mongoose');
// Instantiate a mongoose object
// Then invoke the Schema method
// P assing the JSON representation of the Agent Entity
const Agent = new mongoose.Schema({
  idAgent: { type: Number, default: '0' },
  // Get agent name, contacts and so on in user file
  // Even creds : login and pw...gotten from user file
  // account : {type: Schema.ObjectId, ref: 'Account', required: true },
  User: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  Company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  details: String,
});

module.exports = mongoose.model('Agent', Agent);
