const mongoose = require('mongoose');

const Country = new mongoose.Schema({
  countryName: { type: String, default: 'DR Congo' },
  countryCode: { type: String, default: 'CD' },
  countryOther : String
});
module.exports = mongoose.model('Country', Country);
