const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    require: true
  },
  name: {
    type: String,
    required: true
  },
  hash: String,
  salt: String
});

/**
* Sets the salt/hash properties based on password given
*/
userSchema.methods.setPassword = (password) => {
  this.salt = crypto.randomBytes(16).toString('hex');
  // crypto.pbkdf2Sync(password, salt, iterations, keylen, digest)
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

/**
* Tests the hash/salt combination based on password provided
*/
userSchema.methods.validPassword = (password) => {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
  return this.hash === hash;
};

userSchema.methods.generateJwt = () => {
  let expire_date = new Date();
  expire_date.setDate(expire_date.getDate() + 7);

  return jwt.sign({
    _id: this._id,
    email: this.email,
    name: this.name,
    exp: parseInt(expire_date.getTime() / 1000)
  }, "BLUE_BOX");
};

let User = mongoose.model('User', userSchema);
module.exports = User;
