import React, { useState, useReducer, useEffect } from "react";
import {RateCircle, MediaCardDropdown} from ".";
import { ClickAwayListener } from "@mui/material";
import movieImagePlaceholder from '../assets/images/movie-image-placeholder.svg';
import moment from 'moment';
import {ImagesPathEnum, AssetImagesEnums} from '../Enums'
import { Link } from "react-router-dom";

export const MediaCard = ({ 
  mediaId,
  movieData,
  mediaType
  }) => {

  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const initialState={
    name:null,
    imageUrl:null,
    date:null,
    votes:null,
  }

  const roundRatingNumber = (number) =>{
    return Math.round(number)
  }
  const reducer = (state, action) => {
    return { ...state, [action.id]: action.value };
  };

  const [state,setState]=useReducer(reducer,initialState)
  const handleClick = () => {
    setIsDropDownOpen((prevState) => !prevState);
  };

  const handleClickAway = () => {
    setIsDropDownOpen(false);
  };

useEffect(()=>{
  if(movieData){
setState({
  id:"name",
  value:movieData.name || movieData.title||null
})
setState({
  id:"date",
  value:movieData.first_air_date||movieData.release_date||null
})

setState({
  id:"votes",
  value:(movieData.vote_average&&roundRatingNumber(movieData.vote_average*10)
  )||null
})

setState({
  id:"imageUrl",
  value:(movieData.backdrop_path&&`${ImagesPathEnum.face.w220_and_h330.value}/${movieData.backdrop_path}`)||null
})

  }
},[movieData])

  return (
    <div id={mediaId} className="movie-card">
    <div className='movie-card-img-container'>
    <Link to={`/${mediaType}/${mediaId}`}>
        <img
          src={state.imageUrl||movieImagePlaceholder} alt="" 
          className={(!state.imageUrl&&'search-default-image')||'movie-poster'}
        />
      </Link>
    </div>

      {/* hide dropdown when it detects clicks outside dropdown component*/}
      <ClickAwayListener onClickAway={handleClickAway}>
        <div>
          <img
            className="dotted-circle"
            src={AssetImagesEnums.circleDotted.Img}
            onClick={handleClick}
            />
          {isDropDownOpen&&<MediaCardDropdown 
            mediaId={mediaId}
            mediaType={mediaType}
          />}
        </div>
      </ClickAwayListener>
      <div className="movie-info">
        <a href="">
          <h3>{state.name}</h3>
        </a>
        <p>{(state.date&&moment(state.date).format('LL'))}</p></div>

      <RateCircle percentage={state.votes} size={"small"} />
    </div>
  );
}
