const {
  deputies,
  populateSenators,
  populateDeputies,
  senators,
} = require('./../db/seed');

const {ObjectID} = require('mongodb');

populateSenators();
populateDeputies();