import axios from 'axios'
import {config} from './config'


 const GetCreditsDetails = async (id)=>{

    const queryList = [];
    queryList.push(`api_key=${config.api_key}`);
  
      const result = await axios.get(`${config.server_address}/credit/${id}?${queryList.join('&')}`)
          .then((response) => response.data)
          .catch((error) => error.response);
  
      return result;
}
  

export {
    GetCreditsDetails,
}
