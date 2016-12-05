require('./../utils/utils');

const soap = require('soap');

const {Deputy} = require('./../../server/models/deputy');

let webServerUrl = 'http://www.camara.leg.br/SitCamaraWS/Deputados.asmx?wsdl';

function updateDeputies() {
  soap.createClient(webServerUrl, function(err, client) {
    client.ObterDeputados({}, function(err, result) {
      let deputados = result.ObterDeputadosResult.deputados.deputado;

      for (deputado of deputados) {
        Deputy.findOneAndUpdate({
          cod: deputado.ideCadastro,
        },{
          annex: deputado.anexo,
          cabinet: deputado.gabinete,
          condition: deputado.condicao,
          email: deputado.email,
          fullName: deputado.nome.capitalize(),
          gender: deputado.sexo.capitalize(),
          name: deputado.nomeParlamentar.capitalize(),
          party: deputado.partido,
          photo: deputado.urlFoto,
          state: deputado.uf,
          telephone: deputado.fone,
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