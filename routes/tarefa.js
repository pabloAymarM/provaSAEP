const express = require('express')
const router = express.Router() //módulo para trabalhar com rotas

const usuario = require('../models/usuario')
const tarefa = require('../models/tarefa')
const { where } = require('sequelize')

//criando rotas
//1 - inserir dados na tabela
router.post('/store', async function(req, res){ //o sequelize recebe o conteúdo assíncrono
    const resultado = await tarefa.create({//esperar até a função dar resultado
        nomeSetor: req.body.nomeSetor,
        descricao: req.body.descricao,
        prioridade: req.body.prioridade,
        dataCadastro: req.body.dataCadastro,
        status: req.body.status,
        usuarioId: req.body.usuario
    })
    console.log(req.body)  
    if(resultado){
        res.redirect('/')
    }else{
        res.json({erro:'Erro.'})
    }
})

//2 - exibir página raíz de usuario
router.get('/show', function(req, res){
    res.render('tarefa/index')
})

//3 - consultar Db
router.get('/', async function(req, res){           
    let resultado = await tarefa.findAll() //o include é como o sequelize faz para realizar consultas com join
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
    const resultado = await tarefa.destroy({
        where: {id:req.params.id} //recebendo o id via parâmetro que está na rota
    })
    res.redirect('/tarefa')
})

//5 - exibir formulário de cadastro
router.get('/create', async function(req, res){
    let resultado = await usuario.findAll()
    if(resultado){
        console.log(resultado)
        res.render('tarefa/addTarefa', {dados:resultado})
    }else{
        console.log('Não foi possível carregar nenhum dado.')
        res.redirect('/') //redirecionando para a página inicial
    }
    res.render('tarefa/addTarefa')
})

module.exports = router