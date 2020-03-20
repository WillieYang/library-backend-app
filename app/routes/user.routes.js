const users = require('../controllers/user.controller.js');
const helpers = require('../../utils/helpers');

module.exports = (app) => {
  app.post('/users', users.addUser);
  app.post('/login', users.login);
  app.get('/users', helpers.validateToken, users.getAll);
};
