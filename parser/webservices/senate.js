const axios = require('axios');

const { Senator } = require('./../../server/models/senator');

const webServerUrl = 'http://legis.senado.leg.br/dadosabertos/senador/lista/atual';

let updateSenators = new Promise((resolve, reject) => {
  axios.get(webServerUrl).then((response) => {
    let senators = response
      .data
      .ListaParlamentarEmExercicio
      .Parlamentares
      .Parlamentar;

    Promise.all(senators.map((senator) => {
      senator = senator.IdentificacaoParlamentar;

      return Senator.findOneAndUpdate({
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
        return Promise.resolve(doc);
      }).catch((error) => {
        console.log(error);
        return Promise.reject(error);
      });
    })).then(promises => resolve(promises)).catch(error => reject(error));
  }).catch(error => reject(error));
});

module.exports = {
  updateSenators,
}
