const env = process.env.NODE_ENV || 'development';

if (env === 'development') {
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/ep-dev';
} else if (env === 'test') {
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/ep-test';
}

module.exports = {
  port: process.env.PORT,
  mongodb_uri: process.env.MONGODB_URI,
};