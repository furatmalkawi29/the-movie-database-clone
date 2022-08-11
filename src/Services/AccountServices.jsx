import axios from 'axios'
import {config} from './config'

 const GetAccountDetails = async (sessionId)=>{

  const queryList = [];
  queryList.push(`api_key=${config.api_key}`);
  if(sessionId)
  queryList.push(`session_id=${sessionId}`);

    const result = await axios.get(`${config.server_address}/account?${queryList.join('&')}`)
        .then((response) => response.data)
        .catch((error) => error.response);

    return result;
}

const MarkAsFavorite = async (accountId,sessionId, body)=>{

    const queryList = [];
    queryList.push(`api_key=${config.api_key}`);
    if(sessionId)
    queryList.push(`session_id=${sessionId}`);

      const result = await axios.post(`${config.server_address}/account/${accountId}/favorite?${queryList.join('&')}`, body)
          .then((response) => response.data)
          .catch((error) => error.response);
  
      return result;
  }

const AddToWatchlist= async (accountId,sessionId, body)=>{

    const queryList = [];
    queryList.push(`api_key=${config.api_key}`);
    if(sessionId)
    queryList.push(`session_id=${sessionId}`);

      const result = await axios.post(`${config.server_address}/account/${accountId}/watchlist?${queryList.join('&')}`, body)
          .then((response) => response.data)
          .catch((error) => error.response);
  
      return result;
  }

export {
    GetAccountDetails,
    MarkAsFavorite,
    AddToWatchlist   
}
