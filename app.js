//carregando módulos
const express = require('express')
const handlebars = require('express-handlebars')

const app = express()
const porta = 5000

//configurar express para receber dados do formulário
app.use(express.urlencoded({extended:true}))
app.use(express.json())

//configurando o handlebars
app.engine('handlebars', handlebars.engine.apply({extend:true}))
app.set('view engine', 'handlebars')//definindo o handlebars comoo mecanismo de visualização padrão

//carregando rotas
const usuarioRouter = require('./routes/usuario')
const tarefaRouter = require('./routes/tarefa')
//utilizando rotas
app.use('/usuario', usuarioRouter)
app.use('/tarefa', tarefaRouter)

//exibir informações na tela
app.get('/', function(req, res){
    res.render('home')
})

//executando o servidor
app.listen(porta, function(){   
    console.log('Servidor executado na porta:', porta)
})