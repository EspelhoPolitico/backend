const { mongodb_uri } = require('./../config/environment');

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(mongodb_uri);

module.exports = {
  mongoose,
  closeDBConnection: () => mongoose.disconnect(),
}
