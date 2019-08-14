//watertech models
//Company

const mongoose = require('mongoose');

const Company = new mongoose.Schema({
    //Here gotta should use the mongodb default on data seeding...
    //For all IDs
    companyName: {type : String, required: true},
    companyAdress: 
    {
        country:{type: Schema.ObjectId, ref: 'Country', required: true },
        number:{type:Number, default:1},
        street:String,
        zipCode:String,
        stateProvince:String
    },
    companyContact: 
    {
        contact:String,
        email:String,
    },
    //A company has an account on wt
    //Add account model
    account : {type: Schema.ObjectId, ref: 'Account', required: true },
    tariffCode : Number
});

module.exports = mongoose.model('Company', Company);
