const mongoose = require('mongoose');
const cli = require('cli-color')

mongoose.connect("mongodb+srv://admin:admin@cluster0.sy8wpn9.mongodb.net/myDB?retryWrites=true&w=majority");

const userSchemaValorVenal = new mongoose.Schema({
  nome: String,
  endereco: String,
  lote: String,
  quadra: String,
  area: String,
  bairro: String,
  cadImob: Number,
  finalidade: String,
  telefone: String,
  cpf: String,
  situacao: String,
  valor: String,
  valorExtenso: String,
  responsavel: String,
  cargo: String
  
}, { collection: 'valorVenal' });

const schemaIsencao = new mongoose.Schema({
  requerente: String,
  cpf: String,
  rg: String,
  sexo: String,
  telefone: String,
  cadImob: Number,
  endereco: String,
  tipoBeneficio: String,
  valorBeneficio: String,
  estadoCivil: String,
  conjugeBeneficio: String,
  unicoImovel: Boolean,
  possuiDebito: Boolean,
  debitos: String,
  resideImovel: Boolean,
  anoIsencao: Number,
  parecerAssistencia: String,
  todosDocs: Boolean,
}, { collection: 'isencao'});



module.exports = { Mongoose: mongoose, UserSchemaValorVenal: userSchemaValorVenal, SchemaIsencao: schemaIsencao }

