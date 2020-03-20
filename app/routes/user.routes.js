const users = require('../controllers/user.controller.js');

module.exports = (app) => {
  app.post('/users', users.addUser);
};
