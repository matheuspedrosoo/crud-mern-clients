const { Router } = require('express')

const ClienteController = require('../Controllers/ClienteController')

const routes = Router()

routes.post('/clientes', ClienteController.create)
routes.get('/clientes', ClienteController.index)
routes.put('/clientes/:cliente_id', ClienteController.edit)
routes.delete('/clientes/:cliente_id', ClienteController.delete)

module.exports = routes
