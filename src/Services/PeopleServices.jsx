import {CustomAxios} from './CustomAxios'
import {config} from './config'


 const GetCreditsDetails = async (id)=>{
  
      const result = await CustomAxios.get(`${config.server_address}/credit/${id}`)
          .then((response) => response.data)
          .catch((error) => error.response);
  
      return result;
}
  

export {
    GetCreditsDetails,
}
