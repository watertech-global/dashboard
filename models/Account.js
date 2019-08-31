// Watertech models
// Meter

const mongoose = require('mongoose');

const Account = new mongoose.Schema({
      Name: { type: String, required: true },
      login: String,
      password: String,
      roleCode: { type: String, default: 'INDFND' },
      accessType: String,
      access: String,
      createdAt: { type: Date, default: Date.now },
      updateAt: { type: Date, default: null },
      User: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Account', Account);
