const {updateDeputies} = require('./webservices/deputiesChamber');
const {updateSenators} = require('./webservices/senate');

updateDeputies();
updateSenators();