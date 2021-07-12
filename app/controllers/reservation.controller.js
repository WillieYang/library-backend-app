const Reservation = require('../models/reservation.model');
const helpers = require('../../utils/helpers');

const createReservation = (req, res) => { helpers.createCustomItem(req, res, Reservation); };

const getReservationList = (req, res) => { helpers.getCustomItemList(req, res, Reservation); };

const getReservationById = (req, res) => { helpers.getCustomItemById(req, res, Reservation); };

const updateReservationById = (req, res) => { helpers.updateCustomItemById(req, res, Reservation); };

const deleteReservationById = (req, res) => { helpers.deleteCustomItemById(req, res, Reservation); };

exports.createReservation = createReservation;
exports.getReservationList = getReservationList;
exports.getReservationById = getReservationById;
exports.updateReservationById = updateReservationById;
exports.deleteReservationById = deleteReservationById;
