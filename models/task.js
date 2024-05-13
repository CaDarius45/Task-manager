const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
  name: {type: String, required: true},
  description: String,
  complete: Boolean,
  owner: {type: mongoose.Schema.Types.ObjectId,ref: 'User'}
})

module.exports = mongoose.model('Task', taskSchema);