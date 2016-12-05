const axios = require('axios');

const {Senator} = require('./../../server/models/senator');

let webServerUrl = 'http://legis.senado.leg.br/dadosabertos/senador/lista/atual';

function updateSenators() {
  axios.get(webServerUrl).then((response) => {
    let senators = response
      .data
      .ListaParlamentarEmExercicio
      .Parlamentares
      .Parlamentar;

    for (senator of senators) {
      senator = senator.IdentificacaoParlamentar;

      Senator.findOneAndUpdate({
        cod: senator.CodigoParlamentar,
      }, {
          name: senator.NomeParlamentar,
          fullName: senator.NomeCompletoParlamentar,
          gender: senator.SexoParlamentar,
          title: senator.FormaTratamento,
          photo: senator.UrlFotoParlamentar,
          webPage: senator.UrlPaginaParlamentar,
          email: senator.EmailParlamentar,
          party: senator.SiglaPartidoParlamentar,
          state: senator.UfParlamentar,
        }, {
          new: true,
          upsert: true
        }).then((doc) => {
          console.log(`Os dados de ${doc.name} foram atualizados com sucesso!`);
        }).catch((error) => {
          console.log(error);
        });
    }
  });
}

module.exports = {
  updateSenators,
}