import React, {useState, useEffect, useReducer} from 'react'
import { ClickAwayListener } from "@mui/material";
import circleDotted from "../assets/images/circle-dotted.svg";
import playIcon from "../assets/images/playIcon.svg";
import MovieCardDropdown from "./MovieCardDropdown";
import {Link} from 'react-router-dom';
import $ from 'jquery'
import {GetMovieVideos, GetTvShowVideos} from '../Services'
import {ImagesPathEnum} from '../Enums'

export default function TrailerCard({
  id,
  changeModalUrl,
  changeModalVisibility,
  mediaData,
  activeOption
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

  const [trailerData,setTrailerData] = useState([]);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  console.log('trailerData',trailerData);

  const getMoviesAndSeiresVedios = async (id) => {

      const response =
        activeOption === 1
          ? await GetMovieVideos(id)
          : await GetTvShowVideos(id);

      if (!(response && response.status && response.status !== 200)) {
        const test =  response.results.find(item=>item.site === 'YouTube'&&(item.type==="Trailer"||item.type==="Clip"))
        console.log('test',test);
        test.id = id;
    setTrailerData(test)  
    }
  };

  useEffect(()=>{
    getMoviesAndSeiresVedios();
},[mediaData])

  useEffect(()=>{
    if(trailerData&&mediaData){
      setState({
        id:"trailerUrl",
        value:(trailerData&&trailerData.key&& `https://www.youtube.com/embed/${trailerData.key}`)
      })
      setState({
        id:"thumbnailUrl",
        value:(mediaData&&mediaData.poster_path&& `${ImagesPathEnum.multi_faces.w355_and_h200.value}/${mediaData.poster_path}`)
      })
      setState({
        id:"backdrop",
        value:(mediaData&&mediaData.backdrop_path&& `${ImagesPathEnum.backdrop.w780.value}/${mediaData.backdrop_path}`)
      })
      setState({
        id:"name",
        value:mediaData.original_title||mediaData.name||''
      })
    }
  },[trailerData,mediaData,id])
  
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
      <p>Preview - Best Christmas Party Ever</p>
    </div>
   </div>
   </div>||null
  )
}
