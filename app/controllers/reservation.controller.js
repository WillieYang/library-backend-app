const Reservation = require('../models/reservation.model');

// Create and Save a new reservation
exports.create = (req, res) => {
  // console.log('req', req.body);
  if (!req.body.description) {
    return res.status(400).send({
      message: 'Reservation description can not be empty',
    });
  }

  // Create a Reservation
  const reservation = new Reservation({
    bookId: req.body.bookId,
    bookName: req.body.bookName,
    username: req.body.username || 'Doctor Who',
    description: req.body.description,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
  });


  // Save reservation to database
  reservation.save()
    .then((data) => {
      res.send(data);
    }).catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the Reservation.',
      });
    });
  return true;
};

// Retrieve and return all reservations from the database.
exports.findAll = (req, res) => {
  Reservation.find()
    .then((reservations) => {
      res.send(reservations);
    }).catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving reservations.',
      });
    });
};

// Find a single reservation with a reservationId
exports.findOne = (req, res) => {
  Reservation.findById(req.params.reservationId)
    .then((reservation) => {
      if (!reservation) {
        return res.status(404).send({
          message: `Reservation not found with id ${req.params.reservationId}`,
        });
      }
      res.send(reservation);
      return true;
    }).catch((err) => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: `Reservation not found with id ${req.params.reservationId}`,
        });
      }
      return res.status(500).send({
        message: `Error retrieving reservation with id ${req.params.reservationId}`,
      });
    });
};

// Update a reservation identified by the reservationId in the request
exports.update = (req, res) => {
  if (!req.body.description) {
    return res.status(400).send({
      message: 'Reservation description can not be empty',
    });
  }

  Reservation.findByIdAndUpdate(req.params.reservationId, {
    bookId: req.body.bookId,
    bookName: req.body.bookName,
    username: req.body.username || 'Doctor Who',
    description: req.body.description,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
  }, { new: true })
    .then((reservation) => {
      if (!reservation) {
        return res.status(404).send({
          message: `Reservation not found with id ${req.params.reservationId}`,
        });
      }
      res.send(reservation);
      return true;
    }).catch((err) => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: `Reservation not found with id ${req.params.reservationId}`,
        });
      }
      return res.status(500).send({
        message: `Error updating reservation with id ${req.params.reservationId}`,
      });
    });
  return true;
};

// Delete a reservation with the specified reservationId in the request
exports.delete = (req, res) => {
  Reservation.findByIdAndRemove(req.params.reservationId)
    .then((reservation) => {
      if (!reservation) {
        return res.status(404).send({
          message: `Reservation not found with id ${req.params.reservationId}`,
        });
      }
      res.send({ message: 'Reservation deleted successfully!' });
      return true;
    }).catch((err) => {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).send({
          message: `Reservation not found with id ${req.params.reservationId}`,
        });
      }
      return res.status(500).send({
        message: `Could not delete reservation with id ${req.params.reservationId}`,
      });
    });
};
