const database = require('./dataBase')//importando o arquivo
const usuario = require('./usuario')//importando a tabela departamento

const tarefa = database.sequelizeConfig.define(
    'tarefa',
    {
        nomeSetor: {type: database.sequelizeDb.STRING},
        descricao: {type: database.sequelizeDb.TEXT},
        prioridade: {type: database.sequelizeDb.STRING},
        dataCadastro: {type: database.sequelizeDb.DATE},
        status: {type: database.sequelizeDb.STRING}
    }
)

//criando a chave estranegeira
usuario.hasMany(tarefa,{ //usuario pode ter muuitas tarefas
    onDelete: 'CASCADE', //deleta em um, deleta em todos
    onUpdate: 'CASCADE' //atualiza em um, atualiza em todos
})

tarefa.belongsTo(usuario) //usuario pertence a 1 departamento

tarefa.sync()
module.exports = tarefa