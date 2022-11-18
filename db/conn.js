const mongoose = require('mongoose');
const cli = require('cli-color')

mongoose.connect("mongodb+srv://admin:admin@cluster0.sy8wpn9.mongodb.net/myDB?retryWrites=true&w=majority");

const userSchema = new mongoose.Schema({
  username: String,
  email: String
}, { collection: 'users' }
);

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
  valor: String
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
  anoIsencao: Number
}, { collection: 'isencao'});



module.exports = { Mongoose: mongoose, UserSchema: userSchema,  UserSchemaValorVenal: userSchemaValorVenal, SchemaIsencao: schemaIsencao }

