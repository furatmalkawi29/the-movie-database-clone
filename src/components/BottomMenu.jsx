import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { IconsEnums } from '../Enums';
import { showSuccessMessage } from '../Helper';
import {
  MarkAsFavorite,
  AddToWatchlist,
  RateTvShow,
  RateMovie,
  RemoveMovieRating,
  RemoveTvShowRating,
  GetMovieAccountState,
  GetTvShowAccountState,
} from '../Services';
import { RatingPanel } from '../components';
import $ from 'jquery';
// import logo from '%PUBLIC_URL%/logo192.png'

export const BottomMenu = ({ mediaId, mediaType }) => {


  const { logIn, userAccount } = useSelector((state) => state);

  const [mediaRating, setMediaRating] = useState(null);
  const [isRatingPanelOpen, setIsRatingPanelOpen] = useState(false);
  const [apiMediaAccountState, setApiMediaAccountState] = useState(null);
  const [mediaAccountState, setMediaAccountState] = useState(null);

  const markAsFavorite = async () => {
    const accountId = userAccount && userAccount.id;
    const sessionId = logIn && logIn.sessionId;
    const isFavorite = !(mediaAccountState && mediaAccountState.favorite);

    const body = {
      media_type: mediaType,
      media_id: mediaId,
      favorite: isFavorite,
    };

    const response = await MarkAsFavorite(accountId, sessionId, body);

    if (!(response && response.status && response.status !== 200)) {
      getMediaAccountState();
      if(isFavorite){
        showSuccessMessage('Added To Favorites!')
      }else{
        showSuccessMessage('Removed From Favorites')
      }
    }
  };

  const addToWatchList = async () => {
    const accountId = userAccount && userAccount.id;
    const sessionId = logIn && logIn.sessionId;
    const isWatchlisted = !(mediaAccountState && mediaAccountState.watchlist);

    const body = {
      media_type: mediaType,
      media_id: mediaId,
      watchlist: isWatchlisted,
    };

    const response = await AddToWatchlist(accountId, sessionId, body);
    if (!(response && response.status && response.status !== 200)) {
      getMediaAccountState();
      getMediaAccountState()
      if(isWatchlisted){
        showSuccessMessage('Added To Watchlist!')
      }else{
        showSuccessMessage('Removed From Watchlist')
      }
    }
  };

  const rateMovie = async (mediaRating) => {
    const sessionId = logIn && logIn.sessionId;

    const body = {
      value: mediaRating * 2,
    };
    const response = await RateMovie({ movieId: mediaId, body, sessionId });
    if (!(response && response.status && response.status !== 200)) {
      getMediaAccountState();
      showSuccessMessage('Rated Successfully!')

    }
  };

  const removeMovieRating = async () => {
    const sessionId = logIn && logIn.sessionId;

    const response = await RemoveMovieRating({ movieId: mediaId, sessionId });
    if (!(response && response.status && response.status !== 200)) {
      getMediaAccountState();
      showSuccessMessage('Rating Removed')
    }
  };

  const rateTvShow = async (mediaRating) => {
    const sessionId = logIn && logIn.sessionId;

    const body = {
      value: mediaRating * 2,
    };

    const response = await RateTvShow({ tvShowId: mediaId, body, sessionId });
    if (!(response && response.status && response.status !== 200)) {
      getMediaAccountState();
      showSuccessMessage('Rated Successfully!')
    }
  };

  const removeTvShowRating = async () => {
    const sessionId = logIn && logIn.sessionId;

    const response = await RemoveTvShowRating({ tvShowId: mediaId, sessionId });
    if (!(response && response.status && response.status !== 200)) {
      getMediaAccountState();
      showSuccessMessage('Rating Removed')
    }
  };

  const convertInitalRateRange = (rateData) => {
    if (!mediaRating) {
      const newRatingValue = rateData && rateData.value ? Math.floor(rateData.value / 2) : null;

      setMediaRating(newRatingValue);
    }
  };

  const getMovieAccountState = async () => {
    const sessionId = logIn && logIn.sessionId;

    const response = await GetMovieAccountState({
      movieId: mediaId,
      sessionId,
    });

    if (!(response && response.status && response.status !== 200)) {
      setApiMediaAccountState(response);

      if (!mediaAccountState) {
        setMediaAccountState(response);
      }

      convertInitalRateRange(response.rated);
    }
  };

  const getTvShowAccountState = async () => {
    const sessionId = logIn && logIn.sessionId;

    const response = await GetTvShowAccountState({
      tvShowId: mediaId,
      sessionId,
    });

    if (!(response && response.status && response.status !== 200)) {
      setApiMediaAccountState(response);

      if (!mediaAccountState) {
        setMediaAccountState(response);
      }

      convertInitalRateRange(response.rated);
    }
  };

  const getMediaAccountState = () => {
    if (mediaType === 'tv') {
      getTvShowAccountState();
    } else if (mediaType === 'movie') {
      getMovieAccountState();
    }
  };

  const trackMenuScroll =() =>{
    var previousScroll = 0;

    $(window).on('scroll', function () {
      var currentScroll = $(this).scrollTop();
      if (currentScroll > previousScroll) {
        $('.bottom-menu-wrapper').removeClass('menu-padding');
      } else {
        $('.bottom-menu-wrapper').addClass('menu-padding');
      }
      previousScroll = currentScroll;
    });
  }

  useEffect(() => {
    getMediaAccountState();
  }, []);


  useEffect(() => {
    trackMenuScroll();
  });
  
  return (
    <div className='bottom-menu-wrapper'>
      <div className='bottom-menu'>
      <div
        className='bottom-menu-item'
        onClick={() => {
          setMediaAccountState((state) => ({
            ...state,
            favorite: state && !state.favorite,
          }));
          markAsFavorite();
          setIsRatingPanelOpen(false);
        }}>
        <img
          src={
            apiMediaAccountState && apiMediaAccountState.favorite
              ? IconsEnums.pinkHeartIcon.Img
              : IconsEnums.heartIcon.Img
          }
          className={apiMediaAccountState && !apiMediaAccountState.favorite&&'white-heart-icon'}
        />
      </div>
      <div
        className='bottom-menu-item'
        onClick={() => {
          setMediaAccountState((state) => ({
            ...state,
            watchlist: state && !state.watchlist,
          }));
          addToWatchList();
          setIsRatingPanelOpen(false);
        }}>
        <img
          className={
            apiMediaAccountState && apiMediaAccountState.watchlist
              ? 'red-bookmark-icon'
              : 'white-bookmark-icon'
          }
          src={IconsEnums.bookmarkIcon.Img}
        />
      </div>
      <div
        className='bottom-menu-item'
        onClick={() => {
          setIsRatingPanelOpen((state) => !state);
        }}>
        <img
          className={
            apiMediaAccountState && apiMediaAccountState.rated
              ? 'yellow-star-icon'
              : 'white-star-icon'
          }
          src={'%PUBLIC_URL%/logo192.png'}
        />
        {isRatingPanelOpen && (
          <RatingPanel
            mobilePanel
            mediaType={mediaType}
            mediaId={mediaId}
            mediaRating={mediaRating}
            setMediaRating={(value) => {
              setMediaAccountState((state) => ({
                ...state,
                rated: { value: +value * 2 },
              }));

              //is this state neccessary? refactor code to only use setMediaAccountState?
              setMediaRating(value);

              if (value && mediaType === 'tv') {
                rateTvShow(value);
              } else if (value && mediaType === 'movie') {
                rateMovie(value);
              }
            }}
            removeMediaRating={() => {
              setMediaAccountState((state) => ({
                ...state,
                rated: null,
              }));

              if (mediaType === 'tv') {
                removeTvShowRating();
              } else if (mediaType === 'movie') {
                removeMovieRating();
              }
            }}
          />
        )}
      </div>
      </div>
    </div>
  );
};
