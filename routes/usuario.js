const express = require('express')
const router = express.Router() //módulo para trabalhar com rotas

const usuario = require('../models/usuario')
const tarefa = require('../models/tarefa')
const { where } = require('sequelize')

//criando rotas
//1 - inserir dados na tabela
router.post('/store', async function(req, res){ //o sequelize recebe o conteúdo assíncrono
    const resultado = await usuario.create({//esperar até a função dar resultado
        nome: req.body.nome,
        email: req.body.email
    })
    //console.log(req.body)  
    if(resultado){
        res.redirect('/')
    }else{
        res.json({erro:'Erro.'})
    }
})

//3 - consultar Db
router.get('/', async function(req, res){           
    let resultado = await usuario.findAll({include:tarefa}) //o include é como o sequelize faz para realizar consultas com join
    if(resultado){
        console.log(resultado)
        res.render('usuario/index',{dados:resultado})
    }
    else{
        console.log('Não foi possível exibir os dados.')
    }
})

//4- deletar Db
// :id iremos passar um valor na rota
router.get('/destroy/:id', async function(req, res){
    const resultado = await usuario.destroy({
        where:{
            id:req.params.id //recebendo o id via parâmetro que está na rota
        }
    })
    res.redirect('/usuario')
})

//5 - exibir formulário de cadastro
router.get('/create', async function(req, res){
    let resultado = await usuario.findAll()
    if(resultado){
        console.log(resultado)
        res.render('usuario/addUsuario', {dados:resultado})
    }else{
        console.log('Não foi possível carregar nenhum dado.')
        res.redirect('/') //redirecionando para a página inicial
    }
    res.render('usuario/addUsuario')
})

module.exports = router