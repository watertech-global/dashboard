//
//
const mongoose = require('mongoose');
// The Role

const Role = new mongoose.Schema({
  idRole: Number,
  roleCode: String,
  roleTitle: String,
  // The access lists here
  roleAccessList: [],
});

module.exports = mongoose.model('Role', Role);
