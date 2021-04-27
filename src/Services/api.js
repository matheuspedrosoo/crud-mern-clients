import axios from 'axios'
var url = 'http://localhost:3333/'

const api = axios.create({
  baseURL: url,
})

export default api
