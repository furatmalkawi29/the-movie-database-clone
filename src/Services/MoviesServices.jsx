import {CustomAxios} from './CustomAxios'
import {config} from './config'

 const GetMovieDetails = async (id)=>{

    const result = await CustomAxios.get(`${config.server_address}/movie/${id}`)
        .then((response) => response.data)
        .catch((error) => error.response);

    return result;
}

 const GetWeekTrendingMovies = async ()=>{

    const result = await CustomAxios.get(`${config.server_address}/trending/movie/week`)
        .then((response) => response.data)
        .catch((error) => error.response);

    return result;
}

 const GetPopularMovies = async ()=>{


    const result = await CustomAxios.get(`${config.server_address}/movie/popular`)
        .then((response) => response.data)
        .catch((error) => error.response);

    return result;
}


 const GetNowPlayingMovies = async ()=>{


    const result = await CustomAxios.get(`${config.server_address}/movie/now_playing`)
        .then((response) => response.data)
        .catch((error) => error.response);

    return result;
}

 const GetMovieCredits = async (id)=>{


    const result = await CustomAxios.get(`${config.server_address}/movie/${id}/credits`)
        .then((response) => response.data)
        .catch((error) => error.response);

    return result;
}


 const GetMovieImages = async (id)=>{


    const result = await CustomAxios.get(`${config.server_address}/movie/${id}/images`)
        .then((response) => response.data)
        .catch((error) => error.response);

    return result;
}


 const GetMovieVideos = async (id)=>{


    const result = await CustomAxios.get(`${config.server_address}/movie/${id}/videos`)
        .then((response) => response.data)
        .catch((error) => error.response);

    return result;
}

 const GetMovieRecommendations = async (id)=>{


    const result = await CustomAxios.get(`${config.server_address}/movie/${id}/recommendations`)
        .then((response) => response.data)
        .catch((error) => error.response);

    return result;
}

 const GetMovieReviews = async (id)=>{


    const result = await CustomAxios.get(`${config.server_address}/movie/${id}/reviews`)
        .then((response) => response.data)
        .catch((error) => error.response);

    return result;
}


 const GetMovieKeywords = async (id)=>{


    const result = await CustomAxios.get(`${config.server_address}/movie/${id}/keywords`)
        .then((response) => response.data)
        .catch((error) => error.response);

    return result;
}

 const RateMovie = async ({movieId,sessionId, body})=>{

  const queryList = []
  if(sessionId)
  queryList.push(`session_id=${sessionId}`);

    const result = await CustomAxios.post(`${config.server_address}/movie/${movieId}/rating?${queryList.join('&')}`, body)
        .then((response) => response.data)
        .catch((error) => error.response);

    return result;
}

const RemoveMovieRating = async ({movieId,sessionId})=>{
    
  const queryList = []
  if(sessionId)
  queryList.push(`session_id=${sessionId}`);
  
  const result = await CustomAxios.delete(`${config.server_address}/movie/${movieId}/rating?${queryList.join('&')}`)
  .then((response) => response.data)
  .catch((error) => error.response);
  
  return result;
}

const GetMovieAccountState = async ({movieId,sessionId})=>{

 const queryList = [];
 if(sessionId)
 queryList.push(`session_id=${sessionId}`);

   const result = await CustomAxios.get(`${config.server_address}/movie/${movieId}/account_states`)
       .then((response) => response.data)
       .catch((error) => error.response);

   return result;
}

export {
  GetMovieDetails,
  GetWeekTrendingMovies,
  GetPopularMovies,
  GetNowPlayingMovies,
  GetMovieCredits,
  GetMovieImages,
  GetMovieVideos,
  GetMovieRecommendations,
  GetMovieReviews,
  GetMovieKeywords,
  RateMovie,
  RemoveMovieRating,
  GetMovieAccountState
}
