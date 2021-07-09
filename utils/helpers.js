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
      console.log(`Time: ${formatDateTime(new Date())} - User: ${req.decoded.user} - Route: ${req.originalUrl}`);
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

exports.formatDateTime = formatDateTime;
exports.validateToken = validateToken;
