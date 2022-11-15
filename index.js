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

//Rota Valor venal urbano GET
app.get('/valorvenal', async (req, res) => {

  //consulta BD
  const valorVenal = db.Mongoose.model('valorVenal', db.UserSchemaValorVenal, 'valorVenal');
  const consulta = await valorVenal.find({}).lean().exec();
  //-----------
  
  res.render('valorVenal', { consulta } );
})
//----------------------


//Rota Valor venal urbano cadastro POST

app.post('/valorvenal', async (req, res, next) => {

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
  let valor = req.body.valorAvaliacao;

  if(req.body.valor == undefined || req.body.valor == NaN || req.body.valor == ""){
    valor = "Vistoria"
  }

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
  const valorvenal = new valorVenal({ nome, endereco, lote, quadra, area, bairro, cadImob, finalidade, telefone, cpf, situacao, valor});
  

  try {
    await valorvenal.save();
    res.redirect('/valorvenal');
  } catch (err) {
    next(err);
  }

});

app.post('/valorvenaldel/:id', async (req, res) => {

  //consulta BD
  const valorVenal = db.Mongoose.model('valorVenal', db.UserSchemaValorVenal, 'valorVenal');

  let id = req.params.id;
  await valorVenal.findByIdAndRemove(id).exec();
  //-----------
  res.redirect('/valorVenal');
})

app.post('/valorvenaledit/:id', async (req, res) => {

  //consulta BD
  const valorVenal = db.Mongoose.model('valorVenal', db.UserSchemaValorVenal, 'valorVenal');
  let id = req.params.id;
  const consulta = await valorVenal.findById(id).lean().exec();

  

  
  //-----------
  res.render('/valorVenal');
})



app.get('/isencao', async (req, res) => {

  //consulta BD
  const isencao = db.Mongoose.model('isencao', db.SchemaIsencao, 'isencao');
  const consultaIsencao = await isencao.find({}).lean().exec();
  //-----------
  res.render('isencao', { consultaIsencao });
})

app.post('/isencao', async (req, res, next) => {

  const requerente = req.body.requerente;
  const endereco = req.body.endereco;
  const cadImob = req.body.cadImob;
  const telefone = req.body.telefone;
  const sexo = req.body.sexo;
  const anoIsencao = req.body.anoIsencao;
  const cpf = req.body.cpf;
  const rg = req.body.rg;
  const tipoBeneficio = req.body.tipoBeneficio;
  const valorBeneficio = req.body.valorBeneficio;
  const estadoCivil = req.body.estadoCivil;
  const conjugeBeneficio = req.body.conjugeBeneficio;
  const unicoImovel = req.body.unicoImovel;
  const possuiDebito = req.body.possuiDebito;
  const debitos = req.body.debitos;
  const resideImovel = req.body.resideImovel;


  


 /* if(req.body.situacao == "1"){
    situacao = "Em análise"
  }
  if(req.body.situacao == "2"){
    situacao = "Pronto"
  }
  if(req.body.situacao == "3"){
    situacao = "Entregue"
  }*/

  const Isencao = db.Mongoose.model('isencao', db.SchemaIsencao, 'isencao');
  const isencao = new Isencao({ requerente, endereco, cadImob, telefone, sexo, anoIsencao, cpf, rg, tipoBeneficio, valorBeneficio, estadoCivil, conjugeBeneficio, unicoImovel, possuiDebito, debitos, resideImovel, anoIsencao});
  
  try {
    await isencao.save();
    res.redirect('/isencao');
  } catch (err) {
    next(err);
  }

});

//---------------------------

app.listen(port, () => {
  console.log("");
  console.log(clc.white('----------------------------------'));
  console.log(clc.blue(`Servidor rodando na porta ${port}`));
  console.log(clc.blue(`Local: https://localhost:${port}`));
  console.log(clc.white('----------------------------------'));
  console.log("");
});

