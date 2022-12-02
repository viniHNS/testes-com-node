const express = require('express');
const path = require('path');
const clc = require('cli-color');
const mongoose = require('mongoose');
const db = require('./db/conn');
const app = express();
const port = 3000;
const extenso = require('extenso');

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
});
//----------------------

//Rota Valor venal rural
app.get('/rural', (req, res) => {
  res.render('rural');
});
//----------------------

//Rota Valor venal urbano GET
app.get('/valorvenal', async (req, res) => {

  //consulta BD
  const valorVenal = db.Mongoose.model('valorVenal', db.UserSchemaValorVenal, 'valorVenal');
  const consulta = await valorVenal.find({}).sort({situacao: 1}).lean().exec();
  
  //-----------
  
  res.render('valorVenal', { consulta } );
});
//----------------------

app.get('/valorvenalprint/:id', async (req, res) => {
  //consulta BD
  const valorVenal = db.Mongoose.model('valorVenal', db.UserSchemaValorVenal, 'valorVenal');
  const id = req.params.id;
  const consultaPrint = await valorVenal.findById(id).lean().exec();
  //-----------

  res.render('impressaoValorVenal', { consultaPrint })
});

app.get('/valorvenaldeclaracao/:id', async (req, res) => {
  //consulta BD
  const valorVenal = db.Mongoose.model('valorVenal', db.UserSchemaValorVenal, 'valorVenal');
  const id = req.params.id;
  const consultaDeclaracao = await valorVenal.findById(id).exec();
  //------------
  let porExtenso = extenso(consultaDeclaracao.valor, {mode: 'currency'})
  consultaDeclaracao.valorExtenso = porExtenso;
  
  res.render('valorVenalDeclaracao', { consultaDeclaracao });
});

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

  if(req.body.situacao == "1"){
    situacao = "Avaliação sendo feita"
  }
  if(req.body.situacao == "2"){
    situacao = "Esperando retirada"
  }
  if(req.body.situacao == "3"){
    situacao = "Finalizado (entregue)"
  }

  if(req.body.responsavel == "1" && req.body.situacao != "-1"){
    responsavel = "DAIANA PRISCILA KUELKAMP ROSA";
    cargo = "Depto. de Tributação";
  }

  if(req.body.responsavel == "2" && req.body.situacao != "-1"){
    responsavel = "HAROLDO BREHM";
    cargo = "Depto. de Finanças";
  }
  
  if(req.body.responsavel == "3" && req.body.situacao != "-1"){
    responsavel = "HAROLDO DE LIMA";
    cargo = "Fiscal Tributário";
  }

  if(valor == ""){
    valor = 0;
  } else {
    valor = req.body.valorAvaliacao;
  }



  const valorVenal = db.Mongoose.model('valorVenal', db.UserSchemaValorVenal, 'valorVenal');
  const valorvenal = new valorVenal({ nome, endereco, lote, quadra, area, bairro, cadImob, finalidade, telefone, cpf, situacao, valor, responsavel, cargo});

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
});

app.get('/valorvenaledit/:id', async (req, res) => {

  //consulta BD
  const valorVenal = db.Mongoose.model('valorVenal', db.UserSchemaValorVenal, 'valorVenal');
  let id = req.params.id;
  const consulta = await valorVenal.findById(id).exec();

  //-----------
  
  res.render('valorVenalEdit', { consulta });
});

app.post('/valorvenaledit/:id', async (req, res, next) => {

  //consulta BD
  const valorVenal = db.Mongoose.model('valorVenal', db.UserSchemaValorVenal, 'valorVenal');
  let id = req.params.id;
  const consulta = await valorVenal.findById(id).exec();
  //-----------
  const nome = req.body.nome;
  consulta.nome = nome;

  const endereco = req.body.endereco;
  consulta.endereco = endereco;

  const lote = req.body.lote;
  consulta.lote = lote;

  const quadra = req.body.quadra;
  consulta.quadra = quadra;

  const area = req.body.area;
  consulta.area = area;

  const bairro = req.body.bairro;
  consulta.bairro = bairro;

  const cadImob = req.body.cadImob;
  consulta.cadImob = cadImob;

  const finalidade = req.body.finalidade;
  consulta.finalidade = finalidade;

  const telefone = req.body.telefone;
  consulta.telefone = telefone;

  const cpf = req.body.cpf;
  consulta.cpf = cpf;

  let valor = req.body.valorAvaliacao;
  consulta.valor = valor;

  if(req.body.situacao == "1"){
    situacao = "Avaliação sendo feita"
  }
  if(req.body.situacao == "2"){
    situacao = "Esperando retirada"
  }
  if(req.body.situacao == "3"){
    situacao = "Finalizado (entregue)"
  }
  consulta.situacao = situacao;

  if(req.body.responsavel == "1" && req.body.situacao != "-1"){
    responsavel = "DAIANA PRISCILA KUELKAMP ROSA";
    cargo = "Depto. de Tributação";
  }

  if(req.body.responsavel == "2" && req.body.situacao != "-1"){
    responsavel = "HAROLDO BREHM";
    cargo = "Depto. de Finanças";
  }
  
  if(req.body.responsavel == "3" && req.body.situacao != "-1"){
    responsavel = "HAROLDO DE LIMA";
    cargo = "Fiscal Tributário";
  }

  consulta.responsavel = responsavel;
  consulta.cargo = cargo;

  try {
    await consulta.save();
    res.redirect('/valorVenal');
  } catch (err) {
    next(err);
  }
});


//-------------------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------------------------


app.get('/isencao', async (req, res) => {

  //consulta BD
  const isencao = db.Mongoose.model('isencao', db.SchemaIsencao, 'isencao');
  const consultaIsencao = await isencao.find({}).lean().exec();
  //-----------
  res.render('isencao', { consultaIsencao });
});

app.get('/isencaoconsulta/:id', async (req, res) => {

  //consulta BD
  const isencao = db.Mongoose.model('isencao', db.SchemaIsencao, 'isencao');
  const consultaIsencao = await isencao.find({}).lean().exec();
  //-----------
  res.render('isencao', { consultaIsencao });
});

app.post('/isencao', async (req, res, next) => {

  let requerente = req.body.requerente; //ok
  let endereco = req.body.endereco; //ok
  let cadImob = req.body.cadImob; //ok
  let telefone = req.body.telefone; //ok
  let anoIsencao = req.body.anoIsencao; //ok
  let cpf = req.body.cpf; //ok
  let rg = req.body.rg; //ok
  let sexo;
  let tipoBeneficio = req.body.tipoBeneficio; //ok
  let valorBeneficio = req.body.valorBeneficio; //ok
  let estadoCivil = req.body.estadoCivil; //ok
  let conjugeBeneficio = req.body.conjugeBeneficio; //ok
  let unicoImovel = req.body.unicoImovel; // tratamento**
  let possuiDebito = req.body.possuiDebito; // tratamento**
  let debitos = req.body.debitos; //ok
  let resideImovel = req.body.resideImovel; // tratamento

  if(req.body.masculino == "1"){
    sexo = "masculino"
  }

  if(req.body.feminino == "1"){
    sexo = "feminino"
  }

  if(req.body.unicoImovel == "1"){
    unicoImovel = true;
  } else {
    unicoImovel = false;
  }

  if(req.body.possuiDebito == "1"){
    possuiDebito = true;
  } else {
    possuiDebito = false;
  }

  if(req.body.resideImovel == "1"){
    resideImovel = true;
  } else {
    resideImovel = false;
  }

  console.log(sexo);

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
