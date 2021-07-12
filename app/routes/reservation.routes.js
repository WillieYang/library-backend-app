const reservations = require('../controllers/reservation.controller.js');
const helpers = require('../../utils/helpers');

module.exports = (app) => {
  app.post('/reservations', helpers.validateToken, reservations.createReservation);

  app.get('/reservations', helpers.validateToken, reservations.getReservationList);

  app.get('/reservations/:reservationId', helpers.validateToken, reservations.getReservationById);

  app.put('/reservations/:reservationId', helpers.validateToken, reservations.updateReservationById);

  app.delete('/reservations/:reservationId', helpers.validateToken, reservations.deleteReservationById);
};
