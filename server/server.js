const {port} = require('./config/environment');

const express = require('express');

let app = express();

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});