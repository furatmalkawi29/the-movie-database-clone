import axios from 'axios'
import {config} from './config'



const GetRequestToken = async ()=>{

    const queryList = [];
    queryList.push(`api_key=${config.api_key}`);
  
      const result = await axios.get(`${config.server_address}/authentication/token/new?${queryList.join('&')}`)
          .then((response) => response.data)
          .catch((error) => error.response);
  
      return result;
  }
  
const ValidateWithLogin = async (body)=>{

    const queryList = [];
    queryList.push(`api_key=${config.api_key}`);

      const result = await axios.post(`${config.server_address}/authentication/token/validate_with_login?${queryList.join('&')}`, body)
          .then((response) => response.data)
          .catch((error) => error.response);
  
      return result;
  }

  
const CreateSession = async (body)=>{

    const queryList = [];
    queryList.push(`api_key=${config.api_key}`);

      const result = await axios.post(`${config.server_address}/authentication/session/new?${queryList.join('&')}`, body)
          .then((response) => response.data)
          .catch((error) => error.response);
  
      return result;
  }
const DeleteSession = async (body)=>{

    const queryList = [];
    queryList.push(`api_key=${config.api_key}`);

      const result = await axios.delete(`${config.server_address}/authentication/session?${queryList.join('&')}`, body)
          .then((response) => response.data)
          .catch((error) => error.response);
  
      return result;
  }
  

  export {
    GetRequestToken,
    CreateSession,
    DeleteSession,
    ValidateWithLogin,
  }
