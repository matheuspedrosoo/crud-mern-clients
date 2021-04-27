const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    lowercase: true,
  },
  cpf: {
    type: Number,
    required: true,
  },
  telefone: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  endereco: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model('clientes', Schema)
