import {Deputy} from '../models/deputy';
import {ObjectID} from 'mongodb';
import {Senator} from '../models/senator';
import {mongoose} from '../db/mongoose';

let senators = [{
  _id: new ObjectID(),
  cod: 846,
  name: 'Aloysio Nunes Ferreira',
  fullName: 'Aloysio Nunes Ferreira Filho',
  gender: 'Masculino',
  title: 'Senador',
  photo: 'http://www.senado.leg.br/senadores/img/fotos-oficiais/senador846.jpg',
  webPage: 'http://www25.senado.leg.br/web/senadores/senador/-/perfil/846',
  email: 'aloysionunes.ferreira@senador.leg.br',
  party: 'PSDB',
  state: 'SP',
}];

let deputies = [{
  _id: new ObjectID(),
  cod: 178980,
  annex: 4,
  cabinet: 533,
  condition: 'Titular',
  email: 'dep.goulart@camara.gov.br',
  fullName: 'ANTONIO GOULART DOS REIS',
  gender: 'masculino',
  name: 'GOULART',
  party: 'PSD',
  photo: 'http://www.camara.gov.br/internet/deputado/bandep/178980.jpg',
  state: 'SP',
  telephone: '3215-5533',
}];

function populateDeputies (done) {
  Deputy.remove({}).then(() => {
    return Deputy.insertMany(deputies);
  }).then(() => done());
};

function populateSenators (done) {
  Senator.remove({}).then(() => {
    return Senator.insertMany(senators);
  }).then(() => done());
};

module.exports = {
  deputies,
  senators,
  populateDeputies,
  populateSenators,
};
