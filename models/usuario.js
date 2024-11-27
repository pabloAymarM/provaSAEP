const {sequelizeDb, sequelizeConfig} = require('./dataBase') //desmembrano o objeto para importar os módulos

//criando a tabela
const usuario = sequelizeConfig.define(
    'usuario', //nome da tabela
    {
        nome: {type: sequelizeDb.STRING},
        email: {type: sequelizeDb.TEXT}
    }
) //não iremos criar o idusuario e a chave estrangeira, pois o Sequelize vai criar automaticamente.

usuario.sync() //criar a tabela
module.exports = usuario