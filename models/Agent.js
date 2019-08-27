//
// Agent
const mongoose = require('mongoose');
// Instantiate a mongoose object
// Then invoke the Schema method
// P assing the JSON representation of the Agent Entity
const Agent = new mongoose.Schema({
  // Get agent name, contacts and so on in user file
  // Even creds : login and pw...gotten from user file
  // account : {type: Schema.ObjectId, ref: 'Account', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  account: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true },
  agentOtherDetails: String,
});

module.exports = mongoose.model('Agent', Agent);
