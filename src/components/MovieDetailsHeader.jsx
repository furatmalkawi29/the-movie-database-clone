import React, { useState, useEffect, useReducer } from 'react'
import $ from 'jquery'
import {RateCircle} from "../components";
import { FaHeart } from 'react-icons/fa'
import { ImList2 } from 'react-icons/im'
import { IoBookmark } from 'react-icons/io5'
import { AiFillStar } from 'react-icons/ai'
import { FaPlay } from 'react-icons/fa'
import { HiArrowsExpand } from 'react-icons/hi'
import { useColor } from "color-thief-react";
import {GetCreditsDetails} from '../Services/PeopleServices'
import { ImagesPathEnum } from '../Enums';


export function MovieDetailsHeader({ id, movieData }) {

  const [rgbValue, setRgbValue] = useState([31, 36, 61])

  const [isLoading, setIsLoading] = useState(true);

  const initialState = {
    name: null,
    year: null,
    date: null,
    genres: [],
    posetrUrl: null,
    votes: null,
    overview: "",
    tagline: null,
    runtime: null,
    creditsFormatted:[],
  }



  const reducer = (state, action) => {
    return { ...state, [action.id]: action.value };
  };

  const [state, setState] = useReducer(reducer, initialState)


  const roundRatingNumber = (number) =>{
    return Math.round(number)
  }

  useEffect(() => {
    if (movieData) {

      setState({
        id: "name",
        value: movieData.name || movieData.title || null
      })
      setState({
        id: "date",
        value: ((movieData.first_air_date&&movieData.first_air_date.split('-').join('/')) || (movieData.release_date&&movieData.release_date.split('-').join('/'))) || null
      })
      setState({
        id: "year",
        value: (movieData.first_air_date && movieData.first_air_date.split('-')[0]) || (movieData.release_date && movieData.release_date.split('-')[0]) || null
      })
      setState({
        id: "genres",
        value: (movieData.genres && movieData.genres.map(item => item.name)) || []
      })
      setState({
        id: "votes",
        value: (movieData.vote_average && roundRatingNumber(movieData.vote_average * 10)) || null
      })
      setState({
        id: "posetrUrl",
        value: ((movieData.poster_path || movieData.backdrop_path) && `${ImagesPathEnum.face.w220_and_h330.value}/${movieData.poster_path || movieData.backdrop_path}`) || null
      })
      setState({
        id: "backdropUrl",
        value: ( movieData.backdrop_path && `${ImagesPathEnum.multi_faces.w1920_and_h800.value}/${movieData.backdrop_path}`) || null
      })
      setState({
        id: "overview",
        value: movieData.overview
      })
      setState({
        id: "tagline",
        value: movieData.tagline
      });
      setState({
        id: "runtime",
        value: movieData.runtime && (`${Math.floor(movieData.runtime / 60)}h ${movieData.runtime % 60}m`)
      });
      setState({
        id: "episodeRuntime",
        value: ((movieData.episode_run_time&&movieData.episode_run_time.length&&movieData.episode_run_time[0])&&(`${Math.floor(movieData.episode_run_time[0] / 60)}h ${movieData.episode_run_time[0] % 60}m`))
      });
      setState({
        id: "credits",
        value: movieData.created_by||[]
      })
    }
  }, [movieData])



  useEffect(async ()=>{

    if(state.credits&&state.credits.length>0){
      setIsLoading(true);

      for(const credit of state.credits){

          let response = await GetCreditsDetails(credit.credit_id);
          
          
          if(!(response&&response.success===false)){
            setState({
              id: "creditsFormatted",
              value: [...state.creditsFormatted, {
                name:credit.name,
                job:response&&response.job
              }]
            })
          }
        }
    setIsLoading(false);
  }
  },[state.credits])

  let quality = 10;
  let crossOrigin = "anonymous";
  let format = "rgbArray"
  const imgSrc =
    "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/rjkmN1dniUHVYAtwuV3Tji7FsDO.jpg";
  let src = imgSrc;

  const { data, loading, error } = useColor(src, format, { crossOrigin, quality })



  function changeBgColor() {
    if ($(window).width() <= 950) {
      $('.movie-overview-banner').css({ "backgroundImage": "none", "backgroundColor": `rgba(${rgbValue[0]},${rgbValue[1]},${rgbValue[2]}, 1.00)` });

      $('.line-2-wrapper').css({ "backgroundColor": `rgba(${rgbValue[0]},${rgbValue[1]},${rgbValue[2]}, 1.00)` })
    }
  }


  /* reset bg on large screen */
  function resetBgColor(params) {
    $('.line-2-wrapper').css({ "backgroundColor": "unset" });

    $('.movie-overview-banner').css(
      { "backgroundImage": `linear-gradient(to bottom right, rgba(${rgbValue[0]},${rgbValue[1]},${rgbValue[2]}, 1.00), rgba(${rgbValue[0]},${rgbValue[1]},${rgbValue[2]}, 0.84)), url(${state.backdropUrl})` });
  }




  /* pick black or white font based on bg color (light/drak)*/
  function decideFontColor() {

    if ((rgbValue[0] * 0.299 + rgbValue[1] * 0.587 + rgbValue[2] * 0.114) > 184) {
      $('.movie-overview').addClass('dark-font')
      $('.dot').css({ "background": "black" })
      $('.movie-safety').addClass('dark-border')
    }
  }




  useEffect(() => {

    /* when color thief loading is done call functions */
    if (!loading) {
      //  setRgbValue(data)


      /* change background color in case its small screen size */
      changeBgColor();

      /* decide font color */
      decideFontColor();


      /*change background color in case of resize */
      $(window).on('resize', function () {
        if ($(window).width() <= 950) {
          changeBgColor();
        } else {
          resetBgColor();
        }
      })
    }
  });



  let styleSmallScreen = {
    /* to get random header image each time you refresh */
    backgroundImage: `linear-gradient(to right, rgba(${rgbValue[0]},${rgbValue[1]},${rgbValue[2]}, 1.00) 20%, rgba(${rgbValue[0]},${rgbValue[1]},${rgbValue[2]}, 0.00) 50%), url(${state.backdropUrl})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    // backgroundPosition: "20px 0px",

  }


  let styleLargeScreen = {
    /* to get random header image each time you refresh */
    backgroundImage: `linear-gradient(to bottom right, rgba(${rgbValue[0]},${rgbValue[1]},${rgbValue[2]}, 1.00), rgba(${rgbValue[0]},${rgbValue[1]},${rgbValue[2]}, 0.84)), url(${state.backdropUrl})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center top",
  }




  return (
    <section className="movie-overview-banner" style={styleLargeScreen} >
      <div className="poster-wrapper-bg" style={styleSmallScreen}>
        <div className="poster-wrapper">
          <img className="header-movie-poster"
            src={state.posetrUrl}
          />
          <div className="poster-glass-cover" />
          <div className="poster-overlay">
            <HiArrowsExpand />
            <span>Expand</span>
          </div>
        </div>
      </div>

      <div className="movie-overview-wrapper" >
        <div className="movie-overview">
          <div className="line-1">
            <h2>{state.name}<span>({state.year})</span></h2>

          </div>

          <div className="flex-wrap">
            <div className="line-2-wrapper">
              <div className="line-2">
                <div>
                  <p className="movie-safety light-border">TV-MA</p>
                  <p className="movie-date-sm">{state.date} (US)</p>
                  <p className="movie-category">
                    {
                      state.genres && state.genres.map(item =>
                        <>
                          <span>{item}</span><span>,</span>
                        </>
                      )
                    }
                  </p>
                  {(state.runtime && (<>
                    <span className="dot"></span>
                    <p>{state.runtime}</p>
                  </>))||
                  (state.episodeRuntime && (<>
                    <span className="dot"></span>
                    <p>{state.episodeRuntime}</p>
                  </>))||null
                  }
                </div>
                <p className="movie-category-sm">
                {
                      state.genres && state.genres.map(item =>
                        <>
                          <span>{item}</span><span>,</span>
                        </>
                      )
                    }
                </p>
              </div>
            </div>


            <div className="line-3">
              <div className="rate-circle-wrapper large-circle">
                <RateCircle percentage={state.votes} size={"large"} className="" />
                <span className="circle-title">User Score</span>
              </div>
              <div className="rate-circle-wrapper medium-circle">
                <RateCircle percentage={state.votes || 100} size={"medium"} className="medium-circle" />
                <span className="circle-title">User Score</span>
              </div>

              <div className="separation-line" />

              <div className="icons-block">
                <div><ImList2 /></div>
                <div><FaHeart /></div>
                <div><IoBookmark /></div>
                <div><AiFillStar /></div>
              </div>

              <div className="play-btn">
                <FaPlay viewBox="0 0 600 512" />
                <span>Play Trailer</span>
              </div>

            </div>
          </div>

          {(state.tagline &&
            <div className="line-4">
              <h3>{state.tagline}</h3>
            </div>
          ) || null
          }

          {(state.overview && state.overview.length &&
            <div className="line-5">
              <h3>Overview</h3>
              <p>
                {state.overview}
              </p>

            </div>) || null
          }

          <div className="line-6">
            {
              state.creditsFormatted&&state.creditsFormatted.map(item=>(
            <div>
              <h4>{item.name}</h4>
              <p>{item.job}</p>
            </div>
              ))
            }
          </div>
        </div>
      </div>
    </section>
  )
}
