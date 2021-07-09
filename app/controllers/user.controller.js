const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const helpers = require('../../utils/helpers');

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
  console.log(`Time: ${helpers.formatDateTime(new Date())} - User: ${username} - Route: ${req.originalUrl}`);
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
          result.result = { username: user.username, id: user.id, createdDate: user.createdAt };
        } else {
          status = 401;
          result.status = status;
          result.error = 'Authentication Error, please check your password';
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

const getUserList = (req, res) => {
  const result = {};
  let status = 200;
  const payload = req.decoded;
  if (payload && (payload.user === 'admin' || payload.user === 'sheng.yang')) {
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
    result.error = 'Authentication Error, administrator required';
    res.status(status).send(result);
  }
};

exports.addUser = addUser;
exports.login = login;
exports.getUserList = getUserList;
