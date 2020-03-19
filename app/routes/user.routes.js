const users = require('../controllers/user.controller.js');

module.exports = (app) => {
  // Create a new user
  app.post('/users', users.addUser);

  // // Retrieve all users
  // app.get('/users', users.findAll);

  // // Retrieve a single user with userId
  // app.get('/users/:userId', users.findOne);

  // // Update a user with userId
  // app.put('/users/:userId', users.update);

  // // Delete a user with userId
  // app.delete('/users/:userId', users.delete);
};
