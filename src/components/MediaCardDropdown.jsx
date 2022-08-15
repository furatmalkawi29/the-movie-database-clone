import React, { useState, useEffect } from 'react'
import { AssetImagesEnums } from '../Enums'
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { IconsEnums } from '../Enums';
import {
  MarkAsFavorite, AddToWatchlist, RateTvShow,
  RateMovie, RemoveMovieRating, RemoveTvShowRating,
  GetMovieAccountState, GetTvShowAccountState
} from '../Services'
import { RatingPanel } from '../components'

export const MediaCardDropdown = ({
  mediaId,
  mediaType
}) => {

  const { logIn, userAccount } = useSelector(state => state);
  const [mediaRating, setMediaRating] = useState(null)
  const [isRatingPanelOpen, setIsRatingPanelOpen] = useState(false)
  const [apiMediaAccountState, setApiMediaAccountState] = useState(null)
  const [mediaAccountState, setMediaAccountState] = useState(null)

  const markAsFavorite = async () => {

    const accountId = userAccount && userAccount.id;
    const sessionId = logIn && logIn.sessionId;
    const favoriteValue = !(mediaAccountState && mediaAccountState.favorite);

    const body = {
      media_type: mediaType,
      media_id: mediaId,
      favorite: favoriteValue,
    }

    const response = await MarkAsFavorite(accountId, sessionId, body);

    if (!(response && response.status && response.status !== 200)) {
      getMediaAccountState()
    } 
  }

  const addToWatchList = async () => {

    const accountId = userAccount && userAccount.id;
    const sessionId = logIn && logIn.sessionId;
    const watchlistValue = !(mediaAccountState && mediaAccountState.watchlist);

    const body = {
      media_type: mediaType,
      media_id: mediaId,
      watchlist: watchlistValue
    }

    const response = await AddToWatchlist(accountId, sessionId, body);
    if (!(response && response.status && response.status !== 200)) {
      getMediaAccountState()

    } 
  }

  const rateMovie = async (mediaRating) => {

    const sessionId = logIn && logIn.sessionId;

    const body = {
      value: mediaRating * 2
    }
    const response = await RateMovie({movieId: mediaId, body, sessionId});
    if (!(response && response.status && response.status !== 200)) {
      getMediaAccountState()
    } 
  }

  const removeMovieRating = async () => {

    const sessionId = logIn && logIn.sessionId;

    const response =  await RemoveMovieRating({movieId: mediaId, sessionId});
    if (!(response && response.status && response.status !== 200)) {
      getMediaAccountState()
    } 

  }

  const rateTvShow = async (mediaRating) => {

    const sessionId = logIn && logIn.sessionId;

    const body = {
      value: mediaRating * 2
    }

    const response =  await RateTvShow({tvShowId: mediaId, body, sessionId });
    if (!(response && response.status && response.status !== 200)) {
      getMediaAccountState()
    } 
  }

  const removeTvShowRating = async () => {

    const sessionId = logIn && logIn.sessionId;

    const response =  await RemoveTvShowRating({tvShowId: mediaId, sessionId});
    if (!(response && response.status && response.status !== 200)) {
      getMediaAccountState()

    } 
  }

  const convertInitalRateRange = (rateData)=>{

    if(!mediaRating){
      const newRatingValue = rateData&&rateData.value? Math.floor(rateData.value/2) : null

      setMediaRating(newRatingValue)
    }
  }

  
  const getMovieAccountState = async () =>{
    const sessionId = logIn && logIn.sessionId;

    const response = await GetMovieAccountState({
      movieId: mediaId,
      sessionId
    });

    if (!(response && response.status && response.status !== 200)) {
      setApiMediaAccountState(response);

      if(!mediaAccountState){
        setMediaAccountState(response);
      }

      convertInitalRateRange(response.rated)
    } 
  }

  const getTvShowAccountState = async () =>{
    const sessionId = logIn && logIn.sessionId;

    const response = await GetTvShowAccountState({
      tvShowId: mediaId,
      sessionId
    });

    if (!(response && response.status && response.status !== 200)) {
      setApiMediaAccountState(response);

      if(!mediaAccountState){
        setMediaAccountState(response);
      }

      convertInitalRateRange(response.rated)

    } 
  }

  const getMediaAccountState = ()=>{
    if(mediaType==='tv'){
      getTvShowAccountState()
    }else if(mediaType==='movie'){
      getMovieAccountState()
    }
  }

  useEffect(()=>{
    getMediaAccountState()
  },[])
  

  return (
    logIn && logIn.isLoggedIn && (
      <div className="movie-card-dropdown actions-dropdown">
        <div className='dropdown-action-item' 
        onClick={()=>{
          setMediaAccountState(state=>({
            ...state, 
          favorite: state&&(!state.favorite)
        }));
          markAsFavorite();
          setIsRatingPanelOpen(false)
        }}>
        
          <div className='action-icon'>
            <img src={(apiMediaAccountState&&apiMediaAccountState.favorite)?IconsEnums.pinkHeartIcon.Img:IconsEnums.heartIcon.Img} />
          </div>
          <span>Favorite</span>
        </div>
        <div className='dropdown-action-item' 
        onClick={()=>{

          setMediaAccountState(state=>({
            ...state, 
          watchlist: state&&(!state.watchlist)
        }));
          addToWatchList();
          setIsRatingPanelOpen(false)
        }}>
          <div className='action-icon'>
            <img className={(apiMediaAccountState&&apiMediaAccountState.watchlist)?'red-bookmark-icon':'black-bookmark-icon'} 
            src={IconsEnums.bookmarkIcon.Img} />
          </div>
          <span>Watchlist</span>
        </div>
        <div className='dropdown-action-item last-action-item'
        onClick={()=>{
          setIsRatingPanelOpen(state=>!state)
        }}>
          <div className='action-icon'>
            <img className={(apiMediaAccountState&&apiMediaAccountState.rated)?'yellow-star-icon':'black-star-icon'}
            src={IconsEnums.star.Img} />
          </div>
          <span>Rate</span>
        </div>
        {isRatingPanelOpen&&
          <RatingPanel
          mediaType={mediaType}
          mediaId={mediaId}
          mediaRating={mediaRating}
          setMediaRating={(value) => {

            setMediaAccountState(state=>({
              ...state, 
            rated: {value: +value * 2}
          }));

          //is this state neccessary? refactor code to only use setMediaAccountState?
            setMediaRating(value)

            if (value && mediaType === 'tv') {
              rateTvShow(value)
            } else if (value && mediaType === 'movie') {
              rateMovie(value)
            }
          }}
          removeMediaRating={() => {

            setMediaAccountState(state=>({
              ...state, 
            rated: null
          }));

            if (mediaType === 'tv') {
              removeTvShowRating();
            } else if (mediaType === 'movie') {
              removeMovieRating();
            }
          }}
          />
        }
      </div>) ||
    (<div className="movie-card-dropdown login-dropdown">
      <div className="first-box">
        <h3>Want to rate or add this item to a list?</h3>
        <Link to="/login">
          <div>
            <p>Login</p>
            <img src={AssetImagesEnums.leftArrow.Img} />
          </div>
        </Link>
      </div>
      <div className="second-box">
        <h3>Not a member?</h3>
        <div><p>Sign up and join the community</p><img src={AssetImagesEnums.leftArrow.Img} /></div>
      </div>
    </div>)
  )
}
