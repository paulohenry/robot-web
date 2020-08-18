import axios from 'axios'


const app = axios.create({
  baseURL:'http://localhost:3002'
})

export default app