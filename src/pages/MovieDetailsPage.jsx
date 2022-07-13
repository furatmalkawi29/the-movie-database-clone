import React, { useEffect, useState, useReducer } from "react";
import BottomMenu from "../components/BottomMenu";
import MovieDetailsHeader from "../components/MovieDetailsHeader";
import MovieFacts from "../components/MovieFacts";
import TopMenu from "../components/TopMenu";
import CastCard from "../components/CastCard";
import rightArrow from '../assets/images/right-arrow.svg'
import RecommendationCard from "../components/RecommendationCard";
import ReviewCard from "../components/ReviewCard";
import playIcon from '../assets/images/playIcon.svg'
import { useLocation, useParams, useNavigate } from 'react-router-dom'
import getRequest from '../assets/helpers/useGetRequest.jsx'


export default function MovieDetailsPage() {

  const { id } = useParams();
  const navigate = useNavigate();
  let location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [dynamicRoute, setDynamicRoute] = useState(null);
  const [movieData, setMovieData] = useState({});
  const [movieCast, setMovieCast] = useState([]);
  const [movieReviews, setMovieReviews] = useState([5]);
  const [movieMediaImages, setMovieMediaImages] = useState([])
  const [movieMediaVedio, setMovieMediaVedio] = useState(null)
  const [movieRecommendations, setMovieRecommendations] = useState([])

  useEffect(async () => {
    setIsLoading(true);
    if(dynamicRoute) {
      const response = await getRequest(dynamicRoute);

      if(!(response&&response.success===false)){
        setMovieData(response||[]);
      }
    }
    setIsLoading(false);  
  }, [dynamicRoute])

  const getMovieCredits = async ()=>{
    
    if(movieData.id) {
      setIsLoading(true);
      if(location&&location.pathname){
        if(location.pathname.includes('movie')){
      const response = await getRequest(`/movie/${movieData.id}/credits`);

      if(!(response&&response.success===false)){
        setMovieCast(response.cast||[]);
      }
    }else {
      const response = await getRequest(`/tv/${movieData.id}/credits`);

      if(!(response&&response.success===false)){
        setMovieCast(response.cast||[]);
      }
    }
    }
    setIsLoading(false);  
  }
  }
  const getMovieMediaImages = async ()=>{
    setIsLoading(true);

    if(movieData.id) {
      if(location&&location.pathname){
        if(location.pathname.includes('movie')){
      const response = await getRequest(`/movie/${movieData.id}/images`);

      if(!(response&&response.success===false)){
        setMovieMediaImages(response.posters||[]);
      }
    }else {
      const response = await getRequest(`/tv/${movieData.id}/images`);

      if(!(response&&response.success===false)){
        setMovieMediaImages(response.posters||[]);
      }
    }
    }
    setIsLoading(false);  
  }
  }
  const getMovieMediaVideos = async ()=>{
    setIsLoading(true);

    if(movieData.id) {
      if(location&&location.pathname){
        if(location.pathname.includes('movie')){
      const response = await getRequest(`/movie/${movieData.id}/videos`);

      if(!(response&&response.success===false)){
        setMovieMediaVedio((response.length>0&&response[0])||null);
      }
    }else {
      const response = await getRequest(`/tv/${movieData.id}/videos`);

      if(!(response&&response.success===false)){
        setMovieMediaVedio((response.length>0&&response[0])||null);
      }
    }
    }
    setIsLoading(false);  
  }
  }
  const getMovieRecommendations = async ()=>{
    setIsLoading(true);

    if(movieData.id) {
      if(location&&location.pathname){
        if(location.pathname.includes('movie')){
      const response = await getRequest(`/movie/${movieData.id}/recommendations`);

      if(!(response&&response.success===false)){
        setMovieRecommendations(response.length>0&&response||null);
      }
    }else {
      const response = await getRequest(`/tv/${movieData.id}/recommendations`);

      if(!(response&&response.success===false)){
        setMovieRecommendations(response.length>0&&response||null);
      }
    }
    }
    setIsLoading(false);  
  }
  }
  const getMovieReviews = async ()=>{
    setIsLoading(true);

    if(movieData.id) {
      if(location&&location.pathname){
        if(location.pathname.includes('movie')){
      const response = await getRequest(`/movie/${movieData.id}/reviews`);

      if(!(response&&response.success===false)){
        setMovieReviews(response.length>0&&response||null);
      }
    }else {
      const response = await getRequest(`/tv/${movieData.id}/reviews`);

      if(!(response&&response.success===false)){
        setMovieReviews(response.length>0&&response||null);
      }
    }
    }
    setIsLoading(false);  
  }
  }

  useEffect(() => {

  getMovieCredits();
  getMovieMediaImages();
  getMovieMediaVideos();
  getMovieRecommendations();
  getMovieReviews();
}, [movieData])

  useEffect(()=>{
    if(location&&location.pathname){
      if(location.pathname.includes('movie')){
        navigate(`/movie/${id}`);
        setDynamicRoute(`/movie/${id}`)
      }else {
        navigate(`/tv/${id}`);
        setDynamicRoute(`/tv/${id}`)
      }
    }
  },[id])


  return (
    <>
      <TopMenu />
      <MovieDetailsHeader 
      id={id}
      movieData={movieData}
      />
      <section className="info-content">
        <div>
          <section className="cards-wrapper">
            <h3>Series Cast</h3>
            {/* <h3>Top Billed Cast</h3> */}
            <div className="cast-cards-container">
              { movieCast&&movieCast.map(item=>(
                <CastCard castData={item} />
              ))
              }
              <div className="view-more"><span>View More</span><img src={rightArrow}/></div>
            </div>
            <p className="wrapper-link">Full Cast & Crew</p>
          </section>

          <section className="cards-wrapper">
            <div className="wrapper-top">
            <h3>Social</h3>
            <div className="tabs-menu">
              <div className="active-tab-underline">
                <p>Reviews</p>
                <span>{movieReviews&&movieReviews.length}</span>
              </div>
              <div>
                <p> Discussions</p>
                <span>2</span>
              </div>
            </div>
            </div>
            <div>
              {
                (movieReviews&&movieReviews.length>0&&<>
                  <ReviewCard 
                  data={movieReviews&&movieReviews.length>0&&movieReviews[0]}/>
                  <p className="wrapper-link">Read All Reviews</p>
                </>
                )||<p>{`We don't have any reviews for ${movieData?.name}.`}</p>
              }
            </div>
          </section>


          <section className="cards-wrapper">
          <div className="wrapper-top">
            <h3>Media</h3>
            <div className="tabs-menu">
              <div className="active-tab-underline">
                <p>Most Popular</p>
              </div>
              <div>
                <p>Videos</p>
                <span>2</span>
              </div>
              <div>
                <p>Backdrops</p>
                <span>9</span>
              </div>
              <div>
                <p>Posters</p>
                <span>10</span>
              </div>
            </div>
            </div>
            <div className="media-cards-container">
              {movieMediaVedio&&movieMediaVedio.site==="YouTube"&&
              (<div className="thumbnail">
                <img className="thumbnail-img" src={`https://img.youtube.com/vi/${movieMediaVedio.key}/sddefault.jpg`} alt="" />
                <div className="thumbnail-btn">
                  <img src={playIcon} alt="play-button" />
                </div>
              </div>)
              }
              {
                movieMediaImages&&movieMediaImages.map(item=><img className="media-img" src={`https://www.themoviedb.org/t/p/w533_and_h300_bestv2/${item.file_path}`} alt="" />)
              }
            </div>
          </section>

          <section className="cards-wrapper recommendation">
            <h3>Recommendations</h3>
            <div className="cast-cards-container">
              {
                movieRecommendations&&(movieRecommendations.map(item=><RecommendationCard data={item}/>))||(
                <p>We don't have enough data to suggest any TV shows based on People Puzzler. You can help by rating TV shows you've seen.</p>)
              }
              </div>
          </section>


        </div>
        <div>
          <MovieFacts movieData={movieData}/>
        </div>
      </section>
      <BottomMenu />
    </>
  );
}
