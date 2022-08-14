import axios from 'axios'
import {config} from './config'


const GetTvShowDetails = async (id)=>{

    const queryList = [];
    queryList.push(`api_key=${config.api_key}`);
  
      const result = await axios.get(`${config.server_address}/tv/${id}?${queryList.join('&')}`)
          .then((response) => response.data)
          .catch((error) => error.response);
  
      return result;
  }

  const GetTodayTrendingTvShows = async ()=>{

    const queryList = [];
    queryList.push(`api_key=${config.api_key}`);
  
      const result = await axios.get(`${config.server_address}/trending/tv/week?${queryList.join('&')}`)
          .then((response) => response.data)
          .catch((error) => error.response);
  
      return result;
  }

  const GetPopularTvShows = async ()=>{

    const queryList = [];
    queryList.push(`api_key=${config.api_key}`);
  
      const result = await axios.get(`${config.server_address}/tv/popular?${queryList.join('&')}`)
          .then((response) => response.data)
          .catch((error) => error.response);
  
      return result;
  }
  const GetOnAirTvShows = async ()=>{

    const queryList = [];
    queryList.push(`api_key=${config.api_key}`);
  
      const result = await axios.get(`${config.server_address}/tv/on_the_air?${queryList.join('&')}`)
          .then((response) => response.data)
          .catch((error) => error.response);
  
      return result;
  }

 const GetTvShowCredits = async (id)=>{

  const queryList = [];
  queryList.push(`api_key=${config.api_key}`);

    const result = await axios.get(`${config.server_address}/tv/${id}/credits?${queryList.join('&')}`)
        .then((response) => response.data)
        .catch((error) => error.response);

    return result;
}


 const GetTvShowImages = async (id)=>{

  const queryList = [];
  queryList.push(`api_key=${config.api_key}`);

    const result = await axios.get(`${config.server_address}/tv/${id}/images?${queryList.join('&')}`)
        .then((response) => response.data)
        .catch((error) => error.response);

    return result;
}


 const GetTvShowVideos = async (id)=>{

  const queryList = [];
  queryList.push(`api_key=${config.api_key}`);

    const result = await axios.get(`${config.server_address}/tv/${id}/videos?${queryList.join('&')}`)
        .then((response) => response.data)
        .catch((error) => error.response);

    return result;
}

 const GetTvShowRecommendations = async (id)=>{

  const queryList = [];
  queryList.push(`api_key=${config.api_key}`);

    const result = await axios.get(`${config.server_address}/tv/${id}/recommendations?${queryList.join('&')}`)
        .then((response) => response.data)
        .catch((error) => error.response);

    return result;
}

 const GetTvShowReviews = async (id)=>{

  const queryList = [];
  queryList.push(`api_key=${config.api_key}`);

    const result = await axios.get(`${config.server_address}/tv/${id}/reviews?${queryList.join('&')}`)
        .then((response) => response.data)
        .catch((error) => error.response);

    return result;
}
 const GetTvShowKeywords = async (id)=>{

  const queryList = [];
  queryList.push(`api_key=${config.api_key}`);

    const result = await axios.get(`${config.server_address}/tv/${id}/keywords?${queryList.join('&')}`)
        .then((response) => response.data)
        .catch((error) => error.response);

    return result;
}

const RateTvShow = async ({tvShowId,sessionId, body})=>{

    const queryList = [];
    queryList.push(`api_key=${config.api_key}`);
    if(sessionId)
    queryList.push(`session_id=${sessionId}`);
  
      const result = await axios.post(`${config.server_address}/tv/${tvShowId}/rating?${queryList.join('&')}`, body)
          .then((response) => response.data)
          .catch((error) => error.response);
  
      return result;
  }

  const RemoveTvShowRating = async ({tvShowId,sessionId})=>{

    const queryList = [];
    queryList.push(`api_key=${config.api_key}`);
    if(sessionId)
    queryList.push(`session_id=${sessionId}`);
  
      const result = await axios.delete(`${config.server_address}/tv/${tvShowId}/rating?${queryList.join('&')}`)
          .then((response) => response.data)
          .catch((error) => error.response);
  
      return result;
  }
  
  const GetTvShowAccountState = async ({tvShowId,sessionId})=>{

    const queryList = [];
    queryList.push(`api_key=${config.api_key}`);
    if(sessionId)
    queryList.push(`session_id=${sessionId}`);
   
      const result = await axios.get(`${config.server_address}/tv/${tvShowId}/account_states?${queryList.join('&')}`)
          .then((response) => response.data)
          .catch((error) => error.response);
   
      return result;
   }


export {
  GetTvShowDetails,
  GetTodayTrendingTvShows,
  GetOnAirTvShows,
  GetPopularTvShows,
  GetTvShowCredits,
  GetTvShowImages,
  GetTvShowVideos,
  GetTvShowRecommendations,
  GetTvShowReviews,
  GetTvShowKeywords,
  RateTvShow,
  RemoveTvShowRating,
  GetTvShowAccountState
}
