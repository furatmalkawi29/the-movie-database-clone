import React, {useState, useEffect, useReducer} from 'react'
import { ClickAwayListener } from "@mui/material";
import circleDotted from "../assets/images/circle-dotted.svg";
import playIcon from "../assets/images/playIcon.svg";
import MovieCardDropdown from "./MovieCardDropdown";
import {Link} from 'react-router-dom';
import $ from 'jquery'

export default function TrailerCard({
  id,
  changeModalUrl,
  changeModalVisibility,
  moviesAndSeiresTrailers,
  movieData

}) {

  const initialState ={
    backdrop:'',
    trailerUrl:'',
    thumbnailUrl:'',
    name:''
  }
  const reducer = (state, action) => {
    return { ...state, [action.id]: action.value };
  };
  const [open, setOpen] = useState(false);
  const [state, setState] = useReducer(reducer,initialState);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  // https://www.themoviedb.org/t/p/w355_and_h200_multi_faces/o56X5GUWgzkGJ90QDWn6NNkGEN7.jpg
  useEffect(()=>{
    if(moviesAndSeiresTrailers&&movieData){
      setState({
        id:"trailerUrl",
        value:(moviesAndSeiresTrailers[id]&&moviesAndSeiresTrailers[id].key&& `https://www.youtube.com/embed/${moviesAndSeiresTrailers[id]&&moviesAndSeiresTrailers[id].key}`)
      })
      setState({
        id:"thumbnailUrl",
        value:(movieData&&movieData.poster_path&& `https://www.themoviedb.org/t/p/w355_and_h200_multi_faces/${movieData.poster_path}`)
      })
      setState({
        id:"backdrop",
        value:(movieData&&movieData.backdrop_path&& `https://www.themoviedb.org/t/p/w780/${movieData.backdrop_path}`)
      })
      setState({
        id:"name",
        value:movieData.original_title||movieData.name||''
      })
    }
  },[moviesAndSeiresTrailers,movieData,id])
  
  useEffect(()=>{
    
    /*set default background to the first trailer thumbnail */
    var firstThumb = state.backdrop;
    $('#cards-reel-3').css({backgroundImage:`linear-gradient(to right, rgba(3, 37, 65, 0.8) 0%, rgba(3, 37, 65, .75) 100%), url(${firstThumb})`,backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  })
  
  
  
  /*change background to the trailer thumbnail when hovering over the card  */
  $(`#trailer-card-${id}`).off().on("mouseenter",function(){

    $('#cards-reel-3').css({backgroundImage:`linear-gradient(to right, rgba(3, 37, 65, 0.8) 0%, rgba(3, 37, 65, .75) 100%), url(${state.backdrop})`,backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  }) 
});



$(`#trailer-play-btn-${id}`).on('click',function(){

  /* render trailer modal */
  changeModalVisibility();

  /* add the clicked trailer url to modal */
  changeModalUrl(state.trailerUrl);


  /* turn everything behind modal into black and white */
  $("header,footer,.cards-reel,.join-banner").addClass("grayscale-filter");
  
})
});

return (
  state.trailerUrl&&
    <div id={`trailer-container-${id}`} className="trailer-container">
      {/* hide dropdown when it detects clicks outside dropdown component*/}

    <div id={`trailer-card-${id}`} className="trailer-card" >
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
      <img className="trailer-thumbnail" src={state.thumbnailUrl}/>
       </Link>
      <img id={`trailer-play-btn-${id}`} className="play-icon" src={playIcon}/>
    </div>

    <div className="trailer-info">
      <h3><Link to="">{state.name}</Link></h3>
      {/* <p>Preview - Best Christmas Party Ever</p> */}
    </div>
   </div>
   </div>||null
  )
}
