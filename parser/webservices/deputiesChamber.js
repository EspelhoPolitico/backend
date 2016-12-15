require('./../utils/utils');

const soap = require('soap');

const { Deputy } = require('./../../server/models/deputy');

let webServerUrl = 'http://www.camara.leg.br/SitCamaraWS/Deputados.asmx?wsdl';

let updateDeputies = new Promise((resolve, reject) => {
  soap.createClient(webServerUrl, function (error, client) {
    if (error) reject(error);

    client.ObterDeputados({}, function (error, response) {
      if (error) reject(error);

      let deputies = response.ObterDeputadosResult.deputados.deputado;

      Promise.all(deputies.map((deputy) => {
        return Deputy.findOneAndUpdate({
          cod: deputy.ideCadastro,
        }, {
          annex: deputy.anexo,
          cabinet: deputy.gabinete,
          condition: deputy.condicao,
          email: deputy.email,
          fullName: deputy.nome.capitalize(),
          gender: deputy.sexo.capitalize(),
          name: deputy.nomeParlamentar.capitalize(),
          party: deputy.partido,
          photo: deputy.urlFoto,
          state: deputy.uf,
          telephone: deputy.fone,
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
      })).then(res => resolve(res)).catch(error => reject(error));
    });
  });
});

module.exports = {
  updateDeputies,
}
