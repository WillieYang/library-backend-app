const reservations = require('../controllers/reservation.controller.js');

module.exports = (app) => {
  // Create a new reservation
  app.post('/reservations', reservations.create);

  // Retrieve all reservations
  app.get('/reservations', reservations.findAll);

  // Retrieve a single reservation with reservationId
  app.get('/reservations/:reservationId', reservations.findOne);

  // Update a reservation with reservationId
  app.put('/reservations/:reservationId', reservations.update);

  // Delete a reservation with reservationId
  app.delete('/reservations/:reservationId', reservations.delete);
};
