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

  const GetRatedMovies = async (accountId,sessionId)=>{

    const queryList = [];
    queryList.push(`api_key=${config.api_key}`);
    if(sessionId)
    queryList.push(`session_id=${sessionId}`);

      const result = await axios.get(`${config.server_address}/account/${accountId}/rated/movies?${queryList.join('&')}`)
          .then((response) => response.data)
          .catch((error) => error.response);
  
      return result;
  }

  const GetRatedTvShows = async (accountId,sessionId)=>{

    const queryList = [];
    queryList.push(`api_key=${config.api_key}`);
    if(sessionId)
    queryList.push(`session_id=${sessionId}`);

      const result = await axios.get(`${config.server_address}/account/${accountId}/rated/tv?${queryList.join('&')}`)
          .then((response) => response.data)
          .catch((error) => error.response);
  
      return result;
  }


  const GetWatchlistMovies = async (accountId,sessionId)=>{

    const queryList = [];
    queryList.push(`api_key=${config.api_key}`);
    if(sessionId)
    queryList.push(`session_id=${sessionId}`);

      const result = await axios.get(`${config.server_address}/account/${accountId}/watchlist/movies?${queryList.join('&')}`)
          .then((response) => response.data)
          .catch((error) => error.response);
  
      return result;
  }

  const GetWatchlistTvShows = async (accountId,sessionId)=>{

    const queryList = [];
    queryList.push(`api_key=${config.api_key}`);
    if(sessionId)
    queryList.push(`session_id=${sessionId}`);

      const result = await axios.get(`${config.server_address}/account/${accountId}/watchlist/tv?${queryList.join('&')}`)
          .then((response) => response.data)
          .catch((error) => error.response);
  
      return result;
  }

  const GetFavoriteMovies = async (accountId,sessionId, page)=>{

    const queryList = [];
    queryList.push(`api_key=${config.api_key}`);
    if(sessionId)
    queryList.push(`session_id=${sessionId}`);
    if(page)
    queryList.push(`page=${page}`);

      const result = await axios.get(`${config.server_address}/account/${accountId}/favorite/movies?${queryList.join('&')}`)
          .then((response) => response.data)
          .catch((error) => error.response);
  
      return result;
  }

  const GetFavoriteTvShows = async (accountId,sessionId, page)=>{

    const queryList = [];
    queryList.push(`api_key=${config.api_key}`);
    if(sessionId)
    queryList.push(`session_id=${sessionId}`);
    if(page)
    queryList.push(`page=${page}`);

      const result = await axios.get(`${config.server_address}/account/${accountId}/favorite/tv?${queryList.join('&')}`)
          .then((response) => response.data)
          .catch((error) => error.response);
  
      return result;
  }

export {
    GetAccountDetails,
    MarkAsFavorite,
    AddToWatchlist,
    GetRatedMovies,
    GetRatedTvShows,
    GetWatchlistMovies,
    GetWatchlistTvShows,
    GetFavoriteTvShows,
    GetFavoriteMovies
}
