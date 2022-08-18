import axios from 'axios'
import { CONSTANTS } from "../constants/index"

const axiosCatIns = axios.create({
  // You can add your headers here
  // ================================
  baseURL: CONSTANTS.baseCatFatUrl,
  // timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
})

const axiosApiIns = axios.create({
  // You can add your headers here
  // ================================
  baseURL: CONSTANTS.localUrl,
  // timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
})

// Vue.prototype.$http = axiosIns

export { axiosCatIns, axiosApiIns }
