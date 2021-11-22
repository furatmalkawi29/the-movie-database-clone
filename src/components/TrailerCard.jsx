import React, {useState, useEffect} from 'react'
import { ClickAwayListener } from "@mui/material";
import circleDotted from "../assets/images/circle-dotted.svg";
import MovieCardDropdown from "./MovieCardDropdown";
import {Link} from 'react-router-dom';
import $ from 'jquery'

export default function TrailerCard(props) {

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  useEffect(()=>{

    /*set default background to the first trailer thumbnail */
    var firstThumb = 'https://www.themoviedb.org/t/p/w1920_and_h427_multi_faces/eyG9srihv68ScRdEbJZj66WT4O0.jpg';

    $('#cards-reel-3').css({backgroundImage:`linear-gradient(to right, rgba(3, 37, 65, 0.8) 0%, rgba(3, 37, 65, .75) 100%), url(${firstThumb})`,backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    })



    /*change background to the trailer thumbnail when hovering over the card  */
    $(`#trailer-container-${props.id}`).on("mouseover",function(){
      $('#cards-reel-3').css({backgroundImage:`linear-gradient(to right, rgba(3, 37, 65, 0.8) 0%, rgba(3, 37, 65, .75) 100%), url(${props.cover})`,backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "center",
     }) 
  });
  
  });

  return (
    <div id={`trailer-container-${props.id}`}className="trailer-container">
      {/* hide dropdown when it detects clicks outside dropdown component*/}

    <div className="trailer-card">
    <div className="movie-trailer">
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
          <Link to="/">
      <img id={`trailer-thumbnail-${props.id}`} className="trailer-thumbnail" src={props.thum}/>
       </Link>
    </div>

    <div className="trailer-info">
      <h3><Link to="">The Making of Happier Than Ever: A Love Letter to Los Angeles</Link></h3>
      <p>Preview - Best Christmas Party Ever</p>
    </div>
   </div>
   </div>
  )
}