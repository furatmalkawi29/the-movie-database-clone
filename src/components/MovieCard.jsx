import React, { useState } from "react";
import MovieCardDropdown from "./MovieCardDropdown";
import RateCircle from "./RateCircle";
import { ClickAwayListener } from "@mui/material";
import circleDotted from "../assets/images/circle-dotted.svg";

export default function MovieCard({ id }) {
  
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  return (
    <div id={`movie-${id}`} className="movie-card">
      <a href="">
        <img
          className="movie-poster"
          src="https://www.themoviedb.org/t/p/w220_and_h330_face/5AaKulwpUtkscAokKWtLenGTfVS.jpg"
        />
      </a>
      <div className="movie-info">
        <a href="">
          <h3>The Princess Switch 3: Romancing the Star</h3>
        </a>
        <p>Oct 07, 2014</p>
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

      <RateCircle percentage={8} size={"small"} />
    </div>
  );
}
