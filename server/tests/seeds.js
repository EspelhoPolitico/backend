import { Deputy } from '../models/deputy';
import { ObjectID } from 'mongodb';
import { Senator } from '../models/senator';
import { mongoose } from '../db/mongoose';

let senators = [{
  _id: new ObjectID().toString(),
  __v: 0,
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
}, {
  _id: new ObjectID().toString(),
  __v: 0,
  cod: 945,
  name: 'Alvaro Dias',
  fullName: 'Alvaro Fernandes Dias',
  gender: 'Masculino',
  title: 'Senador ',
  photo: 'http://www.senado.leg.br/senadores/img/fotos-oficiais/senador945.jpg',
  webPage: 'http://www25.senado.leg.br/web/senadores/senador/-/perfil/945',
  email: 'alvarodias@senador.leg.br',
  party: 'PV',
  state: 'PR',
}, {
  _id: new ObjectID().toString(),
  __v: 0,
  cod: 4988,
  name: 'Ana Amélia',
  fullName: 'Ana Amélia de Lemos',
  gender: 'Feminino',
  title: 'Senadora',
  photo: 'http://www.senado.leg.br/senadores/img/fotos-oficiais/senador4988.jpg',
  webPage: 'http://www25.senado.leg.br/web/senadores/senador/-/perfil/4988',
  email: 'ana.amelia@senadora.leg.br',
  party: 'PP',
  state: 'RS',
}];

let deputies = [{
  _id: new ObjectID().toString(),
  __v: 0,
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
}, {
  _id: new ObjectID().toString(),
  __v: 0,
  cod: 141335,
  annex: 4,
  cabinet: 723,
  condition: 'Titular',
  email: 'dep.betofaro@camara.gov.br',
  fullName: 'José Roberto Oliveira Faro',
  gender: 'Masculino',
  name: 'Beto Faro',
  party: 'PT',
  photo: 'http://www.camara.gov.br/internet/deputado/bandep/141335.jpg',
  state: 'PA',
  telephone: '3215-5723',
}];


function populateDeputies(done) {
  Deputy.remove({}).then(() => {
    return Deputy.insertMany(deputies);
  }).then(() => done());
};

function populateSenators(done) {
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
