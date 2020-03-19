const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  name: {
    type: 'String',
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: 'String',
    required: true,
    trim: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('User', UserSchema);
