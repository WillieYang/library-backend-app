const localUrl = 'mongodb://localhost:27017/library';
const remoteUrl = 'mongodb://34.82.248.74:27017/library';

module.exports = {
  url: process.env.NODE_ENV === 'development' ? localUrl : remoteUrl,
};

// remote mongodb url: mongodb://34.82.248.74:27017/library
// local mongodb url: mongodb://localhost:27017/library
