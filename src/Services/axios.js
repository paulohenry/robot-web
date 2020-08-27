import axios from 'axios'
import config from '../config/config'

const app = axios.create({
  baseURL:config.url
})

export default app