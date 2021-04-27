const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const router = require('./Routes/Router')

const app = express()

const dbURI = process.env.DB_URI

mongoose.connect(
  dbURI,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
  () => console.log('Conectado ao Banco de Dados...')
)
app.use(cors())
app.use(express.json())
app.use(router)

app.listen(3333, () => console.log('Servidor rodando na porta 3333!'))
