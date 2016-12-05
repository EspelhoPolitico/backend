require('./../utils/utils');

const soap = require('soap');

const {Deputy} = require('./../../server/models/deputy');

let webServerUrl = 'http://www.camara.leg.br/SitCamaraWS/Deputados.asmx?wsdl';

function updateDeputies() {
  soap.createClient(webServerUrl, function(err, client) {
    client.ObterDeputados({}, function(err, result) {
      let deputies = result.ObterDeputadosResult.deputados.deputado;

      for (deputy of deputies) {
        Deputy.findOneAndUpdate({
          cod: deputy.ideCadastro,
        },{
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
        },{
          new: true,
          upsert: true
        }).then((doc) => {
          console.log(`Os dados de ${doc.name} foram atualizados com sucesso!`);
        }).catch((error) => {
          console.log(error);
        });
      }
    });
  });
};

module.exports = {
  updateDeputies,
}