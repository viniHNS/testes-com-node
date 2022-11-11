const express = require('express');
const path = require('path');
const clc = require('cli-color');
const mongoose = require('mongoose');
const db = require('./db/conn');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));
app.use(express.static(__dirname + '/public'));
app.use(express.json()) ;
app.use(express.urlencoded({ extended: true }));

app.get('/users', async (req, res) => {
  const Users = db.Mongoose.model('users', db.UserSchema, 'users');
  const docs = await Users.find({}).lean().exec();
  res.render('form', { docs });
});

//Rota HomePage
app.get('/', (req, res) => {
  res.render('home');
});
//----------------------

//Rota mensagem whatsapp
app.get('/zap', (req, res) => {
  res.render('msgZap');
})
//----------------------

//Rota Valor venal rural
app.get('/rural', (req, res) => {
  res.render('rural');
})
//----------------------

//Rota Valor venal urbano
app.get('/valorvenal', async (req, res) => {

  //consulta BD
  const valorVenal = db.Mongoose.model('valorVenal', db.UserSchemaValorVenal, 'valorVenal');
  const consulta = await valorVenal.find({}).lean().exec();
  //-----------
  
  res.render('valorVenal', { consulta });
})
//----------------------

app.patch('/valorvenal:id', async (req, res) => {

  //consulta BD
  const valorVenal = db.Mongoose.model('valorVenal', db.UserSchemaValorVenal, 'valorVenal');
  const consulta = await valorVenal.find({}).lean().exec();
  //-----------
  res.redirect('valorVenal', { consulta });
})

//Rota Valor venal urbano cadastro POST

app.post('/valorvenal', async (req, res) => {

  const nome = req.body.nome;
  const endereco = req.body.endereco;
  const lote = req.body.lote;
  const quadra = req.body.quadra;
  const area = req.body.area;
  const bairro = req.body.bairro;
  const cadImob = req.body.cadImob;
  const finalidade = req.body.finalidade;
  const telefone = req.body.telefone;
  const cpf = req.body.cpf;

  if(req.body.situacao == "1"){
    situacao = "Em análise"
  }
  if(req.body.situacao == "2"){
    situacao = "Pronto"
  }
  if(req.body.situacao == "3"){
    situacao = "Entregue"
  }

  const valorVenal = db.Mongoose.model('valorVenal', db.UserSchemaValorVenal, 'valorVenal');
  const valorvenal = new valorVenal({ nome, endereco, lote, quadra, area, bairro, cadImob, finalidade, telefone, cpf, situacao });
  
  try {
    await valorvenal.save();
    res.redirect('/valorvenal');
  } catch (err) {
    next(err);
  }

});

//---------------------------

app.listen(port, () => {
  console.log(clc.green(`Servidor rodando na porta ${port}`));

});


