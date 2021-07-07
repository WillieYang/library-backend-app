const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const addUser = (req, res) => {
  const result = {};
  let status = 201;
  const { username, password } = req.body;
  const user = new User({ username, password });
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

const login = (req, res) => {
  const result = {};
  let status = 200;
  const { username, password } = req.body;
  User.findOne({ username }, (err, user) => {
    if (!err && user) {
      bcrypt.compare(password, user.password).then((match) => {
        if (match) {
          const payload = { user: user.username };
          const options = { expiresIn: '1d', issuer: 'https://willieyang.github.io/' };
          const secret = process.env.JWT_SECRET;
          const token = jwt.sign(payload, secret, options);

          result.status = status;
          result.token = token;
          result.result = user;
        } else {
          status = 401;
          result.status = status;
          result.error = 'Authentication Error';
        }
        res.status(status).send(result);
      });
    } else {
      status = 404;
      result.status = status;
      result.error = 'The user was not found, please register';
      res.status(status).send(result);
    }
  });
};

const getAll = (req, res) => {
  const result = {};
  let status = 200;
  const payload = req.decoded;
  if (payload && payload.user === 'admin') {
    User.find({}, (err, users) => {
      if (!err) {
        result.status = status;
        result.result = users;
        res.status(status).send(result);
      } else {
        status = 404;
        result.status = status;
        result.result = '404 Not found';
        res.status(status).send(result);
      }
    });
  } else {
    status = 401;
    result.status = status;
    result.error = 'Authentication Error';
    res.status(status).send(result);
  }
};

exports.addUser = addUser;
exports.login = login;
exports.getAll = getAll;

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
//     username: req.body.username || 'Untitled User',
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
//       if (err.kind === 'ObjectId' || err.username === 'NotFound') {
//         return res.status(404).send({
//           message: `User not found with id ${req.params.userId}`,
//         });
//       }
//       return res.status(500).send({
//         message: `Could not delete user with id ${req.params.userId}`,
//       });
//     });
// };
