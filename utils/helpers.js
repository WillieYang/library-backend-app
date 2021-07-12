const jwt = require('jsonwebtoken');

const formatDateTime = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
};

const validateToken = (req, res, next) => {
  const authenticationHeader = req.headers.authentication;
  let result;
  if (authenticationHeader) {
    const token = req.headers.authentication;
    const options = {
      expiresIn: '1d',
      issuer: 'https://willieyang.github.io/',
    };
    try {
      result = jwt.verify(token, process.env.JWT_SECRET, options);
      req.decoded = result;
      console.log(`Time: ${formatDateTime(new Date())} - User: ${req.decoded.user} - Route: ${req.method} ${req.originalUrl}`);
      next();
    } catch (err) {
      throw new Error(err);
    }
  } else {
    result = {
      error: 'Authentication error, token Required',
      status: 401,
    };
    res.status(401).send(result);
  }
};

const createCustomItem = (req, res, Item) => {
  const result = {};
  let status = 201;
  const item = new Item(req.body);
  item.save((err, item) => {
    try {
      if (!err) {
        result.status = status;
        result.result = item;
      } else {
        status = 404;
        result.status = status;
        result.error = err;
      }
    } catch (err) {
      status = 500;
      result.status = status;
      result.error = err;
    }
    res.status(status).send(result);
  });
};

const getCustomItemList = (req, res, Item) => {
  const result = {};
  let status = 200;
  Item.find({}, (err, items) => {
    try {
      if (!err) {
        result.status = status;
        result.result = items;
        res.status(status).send(result);
      } else {
        status = 404;
        result.status = status;
        result.error = err;
        res.status(status).send(result);
      }
    } catch (err) {
      status = 500;
      result.status = status;
      result.error = err;
    }
  });
};

const getCustomItemById = (req, res, Item) => {
  const result = {};
  const idKey = Object.keys(req.params)[0];
  const idValue = req.params[idKey];
  let status = 200;
  Item.findById(idValue, (err, item) => {
    try {
      if (!err) {
        result.status = status;
        result.result = item;
      } else {
        status = 404;
        result.status = status;
        result.error = err;
      }
    } catch (err) {
      status = 500;
      result.status = status;
      result.error = err;
    }
    res.status(status).send(result);
  });
};

const updateCustomItemById = (req, res, Item) => {
  const result = {};
  const idKey = Object.keys(req.params)[0];
  const idValue = req.params[idKey];
  let status = 200;
  Item.findByIdAndUpdate(idValue, req.body, (err, item) => {
    try {
      if (!err) {
        result.status = status;
        result.message = 'This Item has been updated successfully';
      } else {
        status = 404;
        result.status = status;
        result.error = err;
      }
    } catch (err) {
      status = 500;
      result.status = status;
      result.error = err;
    }
    res.status(status).send(result);
  });
};

const deleteCustomItemById = (req, res, Item) => {
  const result = {};
  const idKey = Object.keys(req.params)[0];
  const idValue = req.params[idKey];
  let status = 200;
  Item.findByIdAndRemove(idValue, req.body, (err, item) => {
    try {
      if (!err) {
        result.status = status;
        result.message = 'This Item has been deleted successfully';
      } else {
        status = 404;
        result.status = status;
        result.error = err;
      }
    } catch (err) {
      status = 500;
      result.status = status;
      result.error = err;
    }
    res.status(status).send(result);
  });
};

exports.formatDateTime = formatDateTime;
exports.validateToken = validateToken;
exports.createCustomItem = createCustomItem;
exports.getCustomItemList = getCustomItemList;
exports.getCustomItemById = getCustomItemById;
exports.updateCustomItemById = updateCustomItemById;
exports.deleteCustomItemById = deleteCustomItemById;
