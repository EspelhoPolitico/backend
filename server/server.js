const {port} = require('./config/environment');

const express = require('express');

let app = express();

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});