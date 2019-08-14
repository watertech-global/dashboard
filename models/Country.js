const mongoose = require('mongoose');

const Country = new mongoose.Schema(
    {
        idCountry : {type:Number, default:'0'},
        countryName : {type:String, default: 'DR Congo'},
        countryCode: {type:String, default: 'CD'}
    }
);

module.exports = mongoose.model('Country', Country);