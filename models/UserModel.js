var mongoose = require('mongoose'),
    bcrypt   = require('bcrypt-nodejs');

var UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String },
  creationDate: { type: Date, default: Date.now }
});

// methods ======================

// generate hash
UserSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

//checking if password is validPassword
UserSchema.methods.validPassord = function(password) {
  return bcrypt.compareSync(passowrd, this.passowrd);
};

module.exports = mongoose.model('User', UserSchema);
