const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const stage = require('../../config/env.config')[process.env.NODE_ENV];

const UserSchema = mongoose.Schema({
  username: {
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

UserSchema.pre('save', function save(next) {
  const user = this;
  if (!user.isModified('password') || !user.isNew) {
    next();
  } else {
    bcrypt.hash(user.password, stage.saltingRounds, (err, hash) => {
      if (err) {
        console.log('Error hashing password for user', user.username);
        next();
      } else {
        user.password = hash;
        next();
      }
    });
  }
});

module.exports = mongoose.model('User', UserSchema);
