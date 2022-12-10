import axios from 'axios'

axios.interceptors.request.use( configurations => {
    const localConfigurations = configurations;
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
