const { ObjectID } = require('mongodb');
const { port } = require('./config/environment');
const {
  ClientError,
  Informational,
  Redirection,
  ServerError,
  Success,
} = require('./utils/httpStatusCodes');
const bodyParser = require('body-parser');
const express = require('express');

let { Deputy } = require('./models/deputy');
let { Senator } = require('./models/senator');
let server = express();

if (process.env.NODE_ENV === 'production') {
  server.use(express.static('client/build'));
}

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

let router = express.Router();

router.route('/deputados').get((request, response) => {
  Deputy.find().then((deputies) => {
    response.status(Success.OK).send(deputies);
  }).catch((error) => {
    response.status(ClientError.BadRequest).send(error);
  });
});

router.route('/deputados/:_id').get((request, response) => {
  let _id = request.params._id;

  if (!ObjectID.isValid(_id)) {
    return response.status(ClientError.BadRequest).send();
  }

  Deputy.findOne({ _id }).then((deputy) => {
    if (!deputy) {
      return response.status(ClientError.NotFound).send();
    }

    response.status(Success.OK).send(deputy);
  }).catch((error) => {
    response.status(ClientError.BadRequest).send(error);
  });
});

router.route('/senadores').get((request, response) => {
  Senator.find().then((senators) => {
    response.status(Success.OK).send(senators);
  }).catch((error) => {
    response.status(ClientError.BadRequest).send(error);
  });
});

router.route('/senadores/:_id').get((request, response) => {
  let _id = request.params._id;

  if (!ObjectID.isValid(_id)) {
    return response.status(ClientError.BadRequest).send();
  }

  Senator.findOne({ _id }).then((senator) => {
    if (!senator) {
      return response.status(ClientError.NotFound).send();
    }

    response.status(Success.OK).send(senator);
  }).catch((error) => {
    response.status(ClientError.BadRequest).send(error);
  });
});

server.use('/api', router);

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});

module.exports = server;
