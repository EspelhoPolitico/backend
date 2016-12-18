const {port} = require('./config/environment');

const express = require('express');


let server = express();

if (process.env.NODE_ENV === 'production') {
  server.use(express.static('client/build'));
}

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});

module.exports = server;
