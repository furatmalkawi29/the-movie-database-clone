import React, { useState, useReducer, useEffect } from "react";
import MovieCardDropdown from "./MovieCardDropdown";
import RateCircle from "./RateCircle";
import { ClickAwayListener } from "@mui/material";
import circleDotted from "../assets/images/circle-dotted.svg";
import moment from 'moment';
// import { useSelector } from 'react-redux';

export default function MovieCard({ id, movieData }) {
  


  const [open, setOpen] = useState(false);
  const initialState={
    name:null,
    imageUrl:null,
    date:null,
    votes:null,
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
  value:(movieData.vote_average&&movieData.vote_average*10)||null
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
    <div id={id} className="movie-card">
      <a href="">
        <img
          className="movie-poster"
          src={state.imageUrl||''}
        />
      </a>
      <div className="movie-info">
        <a href="">
          <h3>{state.name}</h3>
        </a>
        <p>{(state.date&&moment(state.date).format('LL'))}</p></div>

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

      <RateCircle percentage={state.votes} size={"small"} />
    </div>
  );
}
