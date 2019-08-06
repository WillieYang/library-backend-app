const mongoose = require('mongoose');

const BookSchema = mongoose.Schema({
  name: String,
  description: String,
  storage: Number,
}, {
  timestamps: true
});

module.exports = mongoose.model('Book', BookSchema);