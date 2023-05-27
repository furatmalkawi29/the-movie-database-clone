import {CustomAxios} from './CustomAxios'
import {config} from './config'


const GetTvShowDetails = async (id)=>{

      const result = await CustomAxios.get(`${config.server_address}/tv/${id}`)
          .then((response) => response.data)
          .catch((error) => error.response);
  
      return result;
  }

  const GetTodayTrendingTvShows = async ()=>{

      const result = await CustomAxios.get(`${config.server_address}/trending/tv/week`)
          .then((response) => response.data)
          .catch((error) => error.response);
  
      return result;
  }

  const GetPopularTvShows = async ()=>{

      const result = await CustomAxios.get(`${config.server_address}/tv/popular`)
          .then((response) => response.data)
          .catch((error) => error.response);
  
      return result;
  }
  const GetOnAirTvShows = async ()=>{

      const result = await CustomAxios.get(`${config.server_address}/tv/on_the_air`)
          .then((response) => response.data)
          .catch((error) => error.response);
  
      return result;
  }

 const GetTvShowCredits = async (id)=>{

    const result = await CustomAxios.get(`${config.server_address}/tv/${id}/credits`)
        .then((response) => response.data)
        .catch((error) => error.response);

    return result;
}


 const GetTvShowImages = async (id)=>{

    const result = await CustomAxios.get(`${config.server_address}/tv/${id}/images`)
        .then((response) => response.data)
        .catch((error) => error.response);

    return result;
}


 const GetTvShowVideos = async (id)=>{

    const result = await CustomAxios.get(`${config.server_address}/tv/${id}/videos`)
        .then((response) => response.data)
        .catch((error) => error.response);

    return result;
}

 const GetTvShowRecommendations = async (id)=>{

    const result = await CustomAxios.get(`${config.server_address}/tv/${id}/recommendations`)
        .then((response) => response.data)
        .catch((error) => error.response);

    return result;
}

 const GetTvShowReviews = async (id)=>{

    const result = await CustomAxios.get(`${config.server_address}/tv/${id}/reviews`)
        .then((response) => response.data)
        .catch((error) => error.response);

    return result;
}
 const GetTvShowKeywords = async (id)=>{

    const result = await CustomAxios.get(`${config.server_address}/tv/${id}/keywords`)
        .then((response) => response.data)
        .catch((error) => error.response);

    return result;
}

const RateTvShow = async ({tvShowId,sessionId, body})=>{

    const queryList = [];
    if(sessionId)
    queryList.push(`session_id=${sessionId}`);
  
      const result = await CustomAxios.post(`${config.server_address}/tv/${tvShowId}/rating?${queryList.join('&')}`, body)
          .then((response) => response.data)
          .catch((error) => error.response);
  
      return result;
  }

  const RemoveTvShowRating = async ({tvShowId,sessionId})=>{

    const queryList = [];
    if(sessionId)
    queryList.push(`session_id=${sessionId}`);
  
      const result = await CustomAxios.delete(`${config.server_address}/tv/${tvShowId}/rating?${queryList.join('&')}`)
          .then((response) => response.data)
          .catch((error) => error.response);
  
      return result;
  }
  
  const GetTvShowAccountState = async ({tvShowId,sessionId})=>{

    const queryList = [];
    if(sessionId)
    queryList.push(`session_id=${sessionId}`);
   
      const result = await CustomAxios.get(`${config.server_address}/tv/${tvShowId}/account_states?${queryList.join('&')}`)
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
