// watertech models
// User

const mongoose = require('mongoose');

const User = new mongoose.Schema({
  // Here gotta should use the mongodb default on data seeding...
  // For all IDs
  idUser: { type: Number, default: 0 },
  username: String,
  password: String,
  roleCode: { type: String, default: 'INDFND' },
  location: {
    idCountry: Number,
    number: { type: Number, default: 0 },
    street: String,
    zipCode: String,
    stateProvince: String,
  },
  accessType: String,
  access: String,
  createdAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: null },
  typeUser: String,
  // From the account entity
});

/*
User.pre('save', function(next) {
   var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

User.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};
*/
module.exports = mongoose.model('User', User);
