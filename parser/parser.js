const { updateDeputies } = require('./webservices/deputiesChamber');
const { updateSenators } = require('./webservices/senate');
const { closeDBConnection } = require('../server/db/mongoose');

let updateFromWebservices = [
  updateSenators,
  updateDeputies,
];

Promise.all(updateFromWebservices)
  .then(closeDBConnection)
  .catch((error) => {
    console.log(error);
    closeDBConnection();
  });
