import React, { useEffect, useState } from 'react'
import Header from '../components/Header/Header'
import api from '../Services/api'

import 'bootstrap/dist/css/bootstrap.min.css'
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap'

import '../Styles/main.scss'

function Home() {
  const dataClientes = [
    {
      id: 1,
      nome: 'joao',
      cpf: 99999999999,
      telefone: 47888888,
      email: 'joao@gmail.com',
      endereco: 'Rua dos Mares',
    },
    {
      id: 2,
      nome: 'joao',
      cpf: 99999999999,
      telefone: 47888888,
      email: 'joao@gmail.com',
      endereco: 'Rua dos Mares',
    },
    {
      id: 3,
      nome: 'Lucas',
      cpf: 555555555,
      telefone: 47888888,
      email: 'Lucas@gmail.com',
      endereco: 'Rua dos Mares',
    },
    {
      id: 4,
      nome: 'joao',
      cpf: 99999999999,
      telefone: 47888888,
      email: 'joao@gmail.com',
      endereco: 'Rua dos Mares',
    },
    {
      id: 5,
      nome: 'Maria',
      cpf: 1111111111,
      telefone: 47888888,
      email: 'maria@gmail.com',
      endereco: 'Rua dos Mares',
    },
  ]

  const [data, setData] = useState(dataClientes)
  const [modalInserir, setModalInserir] = useState(false)
  const [modalEditar, setModalEditar] = useState(false)
  const [modalExcluir, setModalExcluir] = useState(false)
  const [modalConfirma, setModalConfirma] = useState(false)
  const [buscaCliente, setbuscaCliente] = useState('')
  const [filtroCliente, setfiltroCliente] = useState([])
  const [clienteSelecionado, setClienteSelecionado] = useState({
    nome: '',
    cpf: '',
    telefone: '',
    email: '',
    endereco: '',
  })

  const handleChange = e => {
    const { name, value } = e.target
    setClienteSelecionado(prevState => ({
      ...prevState,
      [name]: value,
    }))
  }

  const SelectClient = (elemento, caso) => {
    setClienteSelecionado(elemento)
    caso === 'Editar' ? setModalEditar(true) : setModalExcluir(true)
  }

  const abrirModalInserir = () => {
    setClienteSelecionado(null)
    setModalInserir(true)
  }

  const EditarCliente = async () => {
    await api
      .put('clientes/' + clienteSelecionado._id, clienteSelecionado)
      .then(reponse => {
        let novaData = filtroCliente
        novaData.forEach(cli => {
          if (clienteSelecionado._id === cli._id) {
            cli.nome = clienteSelecionado.nome
            cli.cpf = clienteSelecionado.cpf
            cli.telefone = clienteSelecionado.telefone
            cli.email = clienteSelecionado.email
            cli.endereco = clienteSelecionado.endereco
          }
        })
        setfiltroCliente(novaData)

        setModalEditar(false)
      })
  }

  const NovoCliente = async () => {
    await api.post('clientes', clienteSelecionado).then(response => {
      setData(data.concat(response.data))
      setModalInserir(false)
    })
  }

  const deletarCliente = async () => {
    await api.delete('clientes/' + clienteSelecionado._id).then(response => {
      setData(filtroCliente.filter(cli => cli._id !== clienteSelecionado._id))
    })
    setModalExcluir(false)
    setModalConfirma(true)
  }
  // eslint-disable-next-line
  useEffect(async () => {
    await api.get('clientes').then(response => {
      setData(response.data)
    })
    const filtro = data.filter(cli =>
      cli.nome.toLowerCase().includes(buscaCliente.toLowerCase())
    )
    setfiltroCliente(filtro)
  }, [buscaCliente, data])

  return (
    <div>
      <Header />

      <div className="lista-clientes">
        <div className="container">
          <input
            placeholder="buscar nome..."
            value={buscaCliente}
            onChange={e => setbuscaCliente(e.target.value)}
          />
          <button
            className="btn btn-success"
            onClick={() => abrirModalInserir()}
          >
            Novo Cliente
          </button>
        </div>

        {data.length > 0 ? (
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Nome </th>
                <th>E-mail </th>
                <th>CPF </th>
                <th>Telefone </th>
                <th>Endereço </th>
                <th>Acão </th>
              </tr>
            </thead>
            <tbody>
              {filtroCliente.map((cli, index) => (
                <tr key={index}>
                  <td>{cli.nome}</td>
                  <td>{cli.email}</td>
                  <td>{cli.cpf}</td>
                  <td>{cli.telefone}</td>
                  <td>{cli.endereco}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => SelectClient(cli, 'Editar')}
                    >
                      Editar
                    </button>
                    {'  '}

                    <button
                      className="btn btn-danger"
                      onClick={() => SelectClient(cli, 'Excluir')}
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <span>Carregando lista de clientes....</span>
        )}
      </div>

      <Modal isOpen={modalInserir}>
        <ModalHeader>
          <div>
            <h3>Novo Cliente</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Nome</label>
            <input
              className="form-control"
              type="text"
              name="nome"
              //  value={clienteSelecionado ? clienteSelecionado.nome : ''}
              onChange={handleChange}
            />
            <br />

            <label>CPF</label>
            <input
              className="form-control"
              type="text"
              name="cpf"
              // value={clienteSelecionado ? clienteSelecionado.cpf : ''}
              onChange={handleChange}
            />
            <br />

            <label>Telefone</label>
            <input
              className="form-control"
              type="text"
              name="telefone"
              //  value={clienteSelecionado ? clienteSelecionado.telefone : ''}
              onChange={handleChange}
            />
            <br />

            <label>email</label>
            <input
              className="form-control"
              type="text"
              name="email"
              //  value={clienteSelecionado ? clienteSelecionado.email : ''}
              onChange={handleChange}
            />
            <br />

            <label>Endereço</label>
            <input
              className="form-control"
              type="text"
              name="endereco"
              // value={clienteSelecionado ? clienteSelecionado.endereco : ''}
              onChange={handleChange}
            />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={() => NovoCliente()}>
            Salvar
          </button>
          <button
            className="btn btn-danger"
            onClick={() => setModalInserir(false)}
          >
            Cancelar
          </button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalEditar}>
        <ModalHeader>
          <div>
            <h3>Editar Cliente</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Nome</label>
            <input
              className="form-control"
              type="text"
              name="nome"
              value={clienteSelecionado && clienteSelecionado.nome}
              onChange={handleChange}
            />
            <br />

            <label>CPF</label>
            <input
              className="form-control"
              type="text"
              name="cpf"
              value={clienteSelecionado && clienteSelecionado.cpf}
              onChange={handleChange}
            />
            <br />

            <label>Telefone</label>
            <input
              className="form-control"
              type="text"
              name="telefone"
              value={clienteSelecionado && clienteSelecionado.telefone}
              onChange={handleChange}
            />
            <br />

            <label>email</label>
            <input
              className="form-control"
              type="text"
              name="email"
              value={clienteSelecionado && clienteSelecionado.email}
              onChange={handleChange}
            />
            <br />

            <label>Endereço</label>
            <input
              className="form-control"
              type="text"
              name="endereco"
              value={clienteSelecionado && clienteSelecionado.endereco}
              onChange={handleChange}
            />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={() => EditarCliente()}>
            Atualizar
          </button>
          <button
            className="btn btn-danger"
            onClick={() => setModalEditar(false)}
          >
            Cancelar
          </button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalExcluir}>
        <ModalBody>
          Tem certeza que deseja excluir o cliente{' '}
          {clienteSelecionado && clienteSelecionado.nome} ?
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-danger" onClick={() => deletarCliente()}>
            Sim
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => setModalExcluir(false)}
          >
            Não
          </button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalConfirma}>
        <ModalBody>Cliente excluído com sucesso. </ModalBody>
        <ModalFooter>
          <button
            className="btn btn-danger"
            onClick={() => setModalConfirma(false)}
          >
            ok
          </button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default Home
