import {CustomAxios} from './CustomAxios'
import {config} from './config'



const GetRequestToken = async ()=>{

  
      const result = await CustomAxios.get(`${config.server_address}/authentication/token/new`)
          .then((response) => response.data)
          .catch((error) => error.response);
  
      return result;
  }
  
  const ValidateWithLogin = async (body)=>{
    

      const result = await CustomAxios.post(`${config.server_address}/authentication/token/validate_with_login`, body)
          .then((response) => response.data)
          .catch((error) => error.response);
  
      return result;
    }
    
    
   const CreateSession = async (body)=>{

      const result = await CustomAxios.post(`${config.server_address}/authentication/session/new`, body)
          .then((response) => response.data)
          .catch((error) => error.response);
          
          return result;
        }

  const GetGuestSession = async ()=>{
        
      const result = await CustomAxios.get(`${config.server_address}/authentication/guest_session/new`)
          .then((response) => response.data)
          .catch((error) => error.response);
        
        return result;
    }

  const DeleteSession = async (body)=>{

      const result = await CustomAxios.delete(`${config.server_address}/authentication/session`, body)
      .then((response) => response.data)
          .catch((error) => error.response);
  
      return result;
  }
  

  export {
    GetRequestToken,
    CreateSession,
    DeleteSession,
    ValidateWithLogin,
    GetGuestSession,
  }
