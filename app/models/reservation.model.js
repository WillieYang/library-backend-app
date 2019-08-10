const mongoose = require('mongoose');

const ReservationSchema = mongoose.Schema({
  bookId: String,
  username: String,
  bookName: String,
  description: String,
  startDate: String,
  endDate: String,
}, {
  timestamps: true,
});

module.exports = mongoose.model('Reservation', ReservationSchema);
