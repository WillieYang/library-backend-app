const User = require('../models/user.model');

// // Create and Save a new user
// exports.create = (req, res) => {
//   if (!req.body.description) {
//     return res.status(400).send({
//       message: 'User description can not be empty',
//     });
//   }

//   // Create a User
//   const user = new User({
//     name: req.body.name || 'Untitled User',
//     description: req.body.description,
//     storage: req.body.storage,
//   });


//   // Save user to database
//   user.save()
//     .then((data) => {
//       res.send(data);
//     }).catch((err) => {
//       res.status(500).send({
//         message: err.message || 'Some error occurred while creating the User.',
//       });
//     });
//   return true;
// };

const addUser = (req, res) => {
  const result = {};
  let status = 201;
  const { name, password } = req.body;
  const user = new User({ name, password });
  user.save((err, user) => {
    if (!err) {
      result.status = status;
      result.result = user;
    } else {
      status = 500;
      result.status = status;
      result.error = err;
    }
    res.status(status).send(result);
  });
};

exports.addUser = addUser;

// // Retrieve and return all users from the database.
// exports.findAll = (req, res) => {
//   // console.log('access test')
//   User.find()
//     .then((users) => {
//       res.send(users);
//     }).catch((err) => {
//       res.status(500).send({
//         message: err.message || 'Some error occurred while retrieving users.',
//       });
//     });
// };

// // Find a single user with a userId
// exports.findOne = (req, res) => {
//   User.findById(req.params.userId)
//     .then((user) => {
//       if (!user) {
//         return res.status(404).send({
//           message: `User not found with id ${req.params.userId}`,
//         });
//       }
//       res.send(user);
//       return true;
//     }).catch((err) => {
//       if (err.kind === 'ObjectId') {
//         return res.status(404).send({
//           message: `User not found with id ${req.params.userId}`,
//         });
//       }
//       return res.status(500).send({
//         message: `Error retrieving user with id ${req.params.userId}`,
//       });
//     });
//   return true;
// };

// // Update a user identified by the userId in the request
// exports.update = (req, res) => {
//   if (!req.body.description) {
//     return res.status(400).send({
//       message: 'User description can not be empty',
//     });
//   }

//   User.findByIdAndUpdate(req.params.userId, {
//     name: req.body.name || 'Untitled User',
//     description: req.body.description,
//     storage: req.body.storage,
//   }, { new: true })
//     .then((user) => {
//       if (!user) {
//         return res.status(404).send({
//           message: `User not found with id ${req.params.userId}`,
//         });
//       }
//       res.send(user);
//       return true;
//     }).catch((err) => {
//       if (err.kind === 'ObjectId') {
//         return res.status(404).send({
//           message: `User not found with id ${req.params.userId}`,
//         });
//       }
//       return res.status(500).send({
//         message: `Error updating user with id ${req.params.userId}`,
//       });
//     });
//   return true;
// };

// // Delete a user with the specified userId in the request
// exports.delete = (req, res) => {
//   User.findByIdAndRemove(req.params.userId)
//     .then((user) => {
//       if (!user) {
//         return res.status(404).send({
//           message: `User not found with id ${req.params.userId}`,
//         });
//       }
//       res.send({ message: 'User deleted successfully!' });
//       return true;
//     }).catch((err) => {
//       if (err.kind === 'ObjectId' || err.name === 'NotFound') {
//         return res.status(404).send({
//           message: `User not found with id ${req.params.userId}`,
//         });
//       }
//       return res.status(500).send({
//         message: `Could not delete user with id ${req.params.userId}`,
//       });
//     });
// };
