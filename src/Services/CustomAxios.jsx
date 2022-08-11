import axios from 'axios'
import config from './config'

axios.interceptors.request.use( configurations => {
    const localConfigurations = configurations;
    // configurationsLocal.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('token'))
    return localConfigurations;
},
(error) => {
    Promise.reject(error);
  }
)


export const CustomAxios ={
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
}
