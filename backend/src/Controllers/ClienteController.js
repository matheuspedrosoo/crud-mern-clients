const Cliente = require('../Models/Clientes')

module.exports = {
  async create(req, res) {
    const { nome, cpf, telefone, email, endereco } = req.body

    console.log(nome, cpf, telefone, email, endereco)

    try {
      const clientAlreadyExists = await Cliente.findOne({ email })

      if (clientAlreadyExists)
        return res.status(400).send({ message: 'Cliente já existe.' })

      const createdClient = await Cliente.create({
        nome,
        cpf,
        telefone,
        email,
        endereco,
      })

      return res.status(201).send(createdClient)
    } catch (err) {
      res.status(400).send(err)
    }
  },

  async delete(req, res) {
    const { cliente_id } = req.params

    try {
      const deletedClient = await Cliente.findByIdAndDelete(cliente_id)

      return res.status(200).send({ status: 'deleted', user: deletedClient })
    } catch (err) {
      res.status(400).send(err)
    }
  },

  async edit(req, res) {
    try {
      if (!req.body) {
        return res
          .status(400)
          .send({ message: 'Nenhum campo pode estar vazio para edição.' })
      }
      const { cliente_id } = req.params

      await Cliente.findByIdAndUpdate(cliente_id, req.body, {
        useFindAndModify: false,
      }).then(data => {
        if (!data) {
          res.status(404).send({
            message: `Não foi possível editar cliente com id ${cliente_id}`,
          })
        } else {
          res.send(data)
        }
      })

      // return res.status(200).send({ status: 'Alterado', user: editCliente })
    } catch (err) {
      res
        .status(500)
        .send({ message: 'Erro ao atualizar informação de cliente.' })
    }
  },

  async index(req, res) {
    try {
      const allClients = await Cliente.find()

      return res.status(200).send(allClients)
    } catch (err) {
      res.status(400).send(err)
    }
  },
}
