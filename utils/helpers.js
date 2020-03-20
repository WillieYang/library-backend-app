const jwt = require('jsonwebtoken');

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
      next();
    } catch (err) {
      throw new Error(err);
    }
  } else {
    result = {
      error: 'Authentication error, Token Required',
      status: 401,
    };
    res.status(401).send(result);
  }
};

exports.validateToken = validateToken;
