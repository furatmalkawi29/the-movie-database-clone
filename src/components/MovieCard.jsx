import React, { useState } from "react";
import MovieCardDropdown from "./MovieCardDropdown";
import RateCircle from "./RateCircle";
import { ClickAwayListener } from "@mui/material";
import circleDotted from "../assets/images/circle-dotted.svg";
// import { useSelector } from 'react-redux';

export default function MovieCard({ id, movieData }) {
  
  let monthsList = ["","Jan","Feb","Mar","Apr","May","Jun","Jul",
  "Aug","Sep","Oct","Nov","Dec"]

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  function getDateNewFormat(){
let dateArr = movieData.first_air_date.split('-');

let monthNum = dateArr[1];

let monthNumChecked = monthNum.split('')[0]!=='0'?monthNum:monthNum.split('')[1];

let monthName = monthsList[monthNumChecked]

let newFormateDate = `${monthName} ${dateArr[1]}, ${dateArr[0]}`
return newFormateDate;

  }

  getDateNewFormat()
//redux
    // const birds = useSelector(state => state.birds);

  return (
    <div id={id} className="movie-card">
      <a href="">
        <img
          className="movie-poster"
          src={`https://www.themoviedb.org/t/p/w220_and_h330_face/${movieData.backdrop_path}`}
        />
      </a>
      <div className="movie-info">
        <a href="">
          <h3>{movieData.name?movieData.name:null}</h3>
        </a>
        <p>{movieData.first_air_date?getDateNewFormat():null}</p></div>

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

      <RateCircle percentage={movieData.vote_average*10} size={"small"} />
    </div>
  );
}
