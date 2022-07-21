import React, { useEffect, useState, useReducer, useCallback } from "react";
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
import {GetMovieCredits, GetTvShowCredits ,GetMovieImages,
  GetMovieVideos, GetMovieRecommendations, GetMovieReviews,GetTvShowImages,
  GetTvShowVideos, GetTvShowRecommendations, GetTvShowReviews,
   GetMovieDetails, GetTvShowDetails} from '../Services'

export default function MovieDetailsPage() {

  const { id } = useParams();
  const { mediaType } = useParams();
  const navigate = useNavigate();
  const {pathname} = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [movieData, setMovieData] = useState({});
  const [movieCast, setMovieCast] = useState([]);
  const [movieReviews, setMediaReviews] = useState([5]);
  const [movieMediaImages, setMovieMediaImages] = useState([])
  const [movieMediaVedio, setMovieMediaVedio] = useState(null)
  const [mediaRecommendations, setMediaRecommendations] = useState([])
  // const [mediaType, setMediaType] = useState('movie')

  const getMovieCredits = async ()=>{
    console.log('mediaType',mediaType);
    if(movieData.id) {
        if(pathname){
        if(pathname.includes('movie')){
    const response = await GetMovieCredits(movieData.id);

    if (!(response && response.status && response.status !== 200)) {
        setMovieCast(response.cast||[]);
        console.log('response',response);
      }
    }else {
      const response = await GetTvShowCredits(movieData.id);

      if(!(response&&response.success===false)){
        setMovieCast(response.cast||[]);
      }
    }
    }
  }
  }
  const getMovieMediaImages = async ()=>{

    if(movieData.id) {
      if(pathname){
        if(pathname.includes('movie')){
      const response = await GetMovieImages(movieData.id);

      if(!(response&&response.success===false)){
        setMovieMediaImages(response.posters||[]);
      }
    }else {
      const response = await GetTvShowImages(movieData.id);

      if(!(response&&response.success===false)){
        setMovieMediaImages(response.posters||[]);
      }
    }
    }
  }
  }
  const getMovieMediaVideos = async ()=>{

    if(movieData.id) {
      if(pathname){
        if(pathname.includes('movie')){
          const response = await GetMovieVideos(movieData.id);

      if(!(response&&response.success===false)){
        setMovieMediaVedio((response.length>0&&response[0])||null);
      }
    }else {
      const response = await GetTvShowVideos(movieData.id);

      if(!(response&&response.success===false)){
        setMovieMediaVedio((response.length>0&&response[0])||null);
      }
    }
    }
  }
  }
  
  const getMediaRecommendations = async ()=>{

    const response = mediaType==="movie"? await GetMovieRecommendations(id):await GetTvShowRecommendations(id);
    
    if (!(response && response.status &&response.status !== 200)) {
        setMediaRecommendations(response.length>0&&response||null);
      }
  }

  const getMediaReviews = async ()=>{

      const response = mediaType==="movie"? await GetMovieReviews(id):await GetTvShowReviews(id);
    
      if (!(response && response.status &&response.status !== 200)) {
          setMediaReviews(response||[]);
          }
  }

  const getMediaDetails =  useCallback(async ()=>{

    const response = mediaType==="movie"? await GetMovieDetails(id):await GetTvShowDetails(id);
    
         if (!(response && response.status &&response.status !== 200 && typeof response.status === 'number')) {
          setMovieData(response||{});
          }
  })

    useEffect(()=>{
      navigate(`/${mediaType}/${id}`);
      getMediaDetails();
    },[id])

  useEffect(() => {
  getMovieCredits();
  getMovieMediaImages();
  getMovieMediaVideos();
  getMediaRecommendations();
  getMediaReviews();
  }, [movieData])






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
                )||<p>{`We don't have any reviews for ${(movieData?.name||movieData?.title)}.`}</p>
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
                <span>1</span>
              </div>
              <div>
                <p>Backdrops</p>
                <span>9</span>
              </div>
              <div>
                <p>Posters</p>
                <span>{movieMediaImages&&movieMediaImages.length}</span>
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
                mediaRecommendations&&(mediaRecommendations.map(item=><RecommendationCard data={item}/>))||(
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
