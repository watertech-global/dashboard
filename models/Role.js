//
//
const mongoose = require('mongoose');
// The Role
//Made from the designation description in the specs documents
const Role = new mongoose.Schema({
  roleCode: String,
  roleTitle: String,
  // The access lists here
  roleAccessList: [],
});

module.exports = mongoose.model('Role', Role);
