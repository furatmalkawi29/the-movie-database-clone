import React, { useState, useReducer, useEffect } from "react";
import MovieCardDropdown from "./MovieCardDropdown";
import RateCircle from "./RateCircle";
import { ClickAwayListener } from "@mui/material";
import circleDotted from "../assets/images/circle-dotted.svg";
import movieImagePlaceholder from '../assets/images/movie-image-placeholder.svg';
import moment from 'moment';
// import { useSelector } from 'react-redux';
import {Skeleton} from './SkeletonComponents';

export default function MovieCard({ 
  id,
  movieData,
  activeScreenType
  }) {

  const [open, setOpen] = useState(false);
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
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
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
  value:(movieData.backdrop_path&&`https://www.themoviedb.org/t/p/w220_and_h330_face/${movieData.backdrop_path}`)||null
})

  }
},[movieData])
//redux
    // const birds = useSelector(state => state.birds);

  return (
    (movieData&&
    <div id={id} className="movie-card">
    <div className='movie-card-img-container'>
      <a href="">
        <img
          src={state.imageUrl||movieImagePlaceholder} alt="" 
          className={(!state.imageUrl&&'search-default-image')||'movie-poster'}
        />
      </a>
    </div>

      {/* hide dropdown when it detects clicks outside dropdown component*/}
      <ClickAwayListener onClickAway={handleClickAway}>
        <div>
          <img
            className="dotted-circle"
            src={circleDotted}
            onClick={handleClick}
            />
          {open ? <MovieCardDropdown /> : null}
        </div>
      </ClickAwayListener>
      <div className="movie-info">
        <a href="">
          <h3>{state.name}</h3>
        </a>
        <p>{(state.date&&moment(state.date).format('LL'))}</p></div>

      <RateCircle percentage={state.votes} size={"small"} />
    </div>)||<Skeleton/>
  );
}
