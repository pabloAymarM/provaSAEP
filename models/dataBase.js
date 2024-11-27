const sequelizeDb = require('sequelize')
const sequelizeConfig = new sequelizeDb(
    'empresa', //nome do Data Base
    'root', //nome de usuário do Db
    '', //senha do Db
    {
        dialect: 'sqlite',
        storage: './empresa.sqlite' //nome do arquivo para criação do Db
    }
)

module.exports = {sequelizeDb, sequelizeConfig}