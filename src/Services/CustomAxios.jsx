import axios from 'axios'
import { config } from './config'


axios.defaults.headers.common['Authorization'] = `Bearer ${config.access_token}` 



export const CustomAxios = {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
}
