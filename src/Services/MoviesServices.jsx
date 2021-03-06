import axios from 'axios'
import {config} from './config'

 const GetMovieDetails = async (id)=>{

  const queryList = [];
  queryList.push(`api_key=${config.api_key}`);

    const result = await axios.get(`${config.server_address}/movie/${id}?${queryList.join('&')}`)
        .then((response) => response.data)
        .catch((error) => error.response);

    return result;
}

 const GetWeekTrendingMovies = async ()=>{

  const queryList = [];
  queryList.push(`api_key=${config.api_key}`);

    const result = await axios.get(`${config.server_address}/trending/movie/week?${queryList.join('&')}`)
        .then((response) => response.data)
        .catch((error) => error.response);

    return result;
}

 const GetPopularMovies = async ()=>{

  const queryList = [];
  queryList.push(`api_key=${config.api_key}`);

    const result = await axios.get(`${config.server_address}/movie/popular?${queryList.join('&')}`)
        .then((response) => response.data)
        .catch((error) => error.response);

    return result;
}


 const GetNowPlayingMovies = async ()=>{

  const queryList = [];
  queryList.push(`api_key=${config.api_key}`);

    const result = await axios.get(`${config.server_address}/movie/now_playing?${queryList.join('&')}`)
        .then((response) => response.data)
        .catch((error) => error.response);

    return result;
}

 const GetMovieCredits = async (id)=>{

  const queryList = [];
  queryList.push(`api_key=${config.api_key}`);

    const result = await axios.get(`${config.server_address}/movie/${id}/credits?${queryList.join('&')}`)
        .then((response) => response.data)
        .catch((error) => error.response);

    return result;
}


 const GetMovieImages = async (id)=>{

  const queryList = [];
  queryList.push(`api_key=${config.api_key}`);

    const result = await axios.get(`${config.server_address}/movie/${id}/images?${queryList.join('&')}`)
        .then((response) => response.data)
        .catch((error) => error.response);

    return result;
}


 const GetMovieVideos = async (id)=>{

  const queryList = [];
  queryList.push(`api_key=${config.api_key}`);

    const result = await axios.get(`${config.server_address}/movie/${id}/videos?${queryList.join('&')}`)
        .then((response) => response.data)
        .catch((error) => error.response);

    return result;
}

 const GetMovieRecommendations = async (id)=>{

  const queryList = [];
  queryList.push(`api_key=${config.api_key}`);

    const result = await axios.get(`${config.server_address}/movie/${id}/recommendations?${queryList.join('&')}`)
        .then((response) => response.data)
        .catch((error) => error.response);

    return result;
}

 const GetMovieReviews = async (id)=>{

  const queryList = [];
  queryList.push(`api_key=${config.api_key}`);

    const result = await axios.get(`${config.server_address}/movie/${id}/reviews?${queryList.join('&')}`)
        .then((response) => response.data)
        .catch((error) => error.response);

    return result;
}


 const GetMovieKeywords = async (id)=>{

  const queryList = [];
  queryList.push(`api_key=${config.api_key}`);

    const result = await axios.get(`${config.server_address}/movie/${id}/keywords?${queryList.join('&')}`)
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
}
