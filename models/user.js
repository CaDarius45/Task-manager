const mongoose = require('mongoose');

const accountSchema = mongoose.Schema({
  name: {type: String, required: true},
  age: Number,
  gender: String,
  info: String,
  picture: String,
})

const userSchema = mongoose.Schema({
  username: {type: String,unique: true,required: true},
  password: {type: String,required: true},
  account: accountSchema
});

module.exports = mongoose.model('User', userSchema);