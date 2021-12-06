import React, {useState, useEffect} from 'react'
import $ from 'jquery'

import RateCircle from "../components/RateCircle";
import {FaHeart} from 'react-icons/fa'
import {ImList2} from 'react-icons/im'
import {IoBookmark} from 'react-icons/io5'
import {AiFillStar} from 'react-icons/ai'
import {FaPlay} from 'react-icons/fa'
import {HiArrowsExpand} from 'react-icons/hi'
import {useColor} from "color-thief-react";




export default function MovieDetailsHeader() {
  
  const [rgbValue, setRgbValue] = useState([31, 36, 61])

  let quality =10;
  let crossOrigin ="anonymous";
  let format = "rgbArray"
  const imgSrc =
    "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/rjkmN1dniUHVYAtwuV3Tji7FsDO.jpg";
  let src= imgSrc;

  const { data, loading, error } = useColor(src, format, { crossOrigin, quality})



  function changeBgColor (){
    if($(window).width()<=950){
      $('.movie-overview-banner').css({"backgroundImage":"none","backgroundColor":`rgba(${rgbValue[0]},${rgbValue[1]},${rgbValue[2]}, 1.00)`});

      $('.line-2-wrapper').css({"backgroundColor":`rgba(${rgbValue[0]},${rgbValue[1]},${rgbValue[2]}, 1.00)`})
    }
  }



  function decideFontColor() {
    /* pick black or white font based on bg color (light/drak)*/

    if((rgbValue[0]*0.299 + rgbValue[1]*0.587 + rgbValue[2]*0.114) > 184){
      $('.movie-overview').addClass('dark-font')
    $('.dot').css({"background":"black"})
  $('.movie-safety').addClass('dark-border')
  }
  }




  useEffect(()=>{

/* when color thief loading is done call functions */
if(!loading){
     setRgbValue(data)
  
  
  /* change background color in case its small screen size */
    changeBgColor();

  /* decide font color */
     decideFontColor();


      /*change background color in case of resize */
      $(window).off().on('resize',function(){
        if($(window).width()<=950){
        changeBgColor();
        }else{
          /* reset bg on large screen */
          $('.movie-overview-banner').css(
            {"backgroundImage": `linear-gradient(to bottom right, rgba(${rgbValue[0]},${rgbValue[1]},${rgbValue[2]}, 1.00), rgba(${rgbValue[0]},${rgbValue[1]},${rgbValue[2]}, 0.84)), url(https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/urwz7vJ52QJnHH04zPNO1NKghyl.jpg)`});
        }
          })
        }
      });
          


  let styleSmallScreen ={
    /* to get random header image each time you refresh */    
    backgroundImage: `linear-gradient(to right, rgba(${rgbValue[0]},${rgbValue[1]},${rgbValue[2]}, 1.00) 20%, rgba(${rgbValue[0]},${rgbValue[1]},${rgbValue[2]}, 0.00) 50%), url(https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/urwz7vJ52QJnHH04zPNO1NKghyl.jpg)`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    // backgroundPosition: "20px 0px",

  }
  
  
  let styleLargeScreen ={
    /* to get random header image each time you refresh */
     backgroundImage: `linear-gradient(to bottom right, rgba(${rgbValue[0]},${rgbValue[1]},${rgbValue[2]}, 1.00), rgba(${rgbValue[0]},${rgbValue[1]},${rgbValue[2]}, 0.84)), url(https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/urwz7vJ52QJnHH04zPNO1NKghyl.jpg)`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center top",
  }




  return (
    <section className="movie-overview-banner" style={styleLargeScreen} >
    <div className="poster-wrapper-bg" style={styleSmallScreen}>
    <div className="poster-wrapper">
    <img className="movie-poster"
      src={
        "https://www.themoviedb.org/t/p/w300_and_h450_bestv2/xBaeUYKNJfX8VhIFvvgPpFSYxBZ.jpg"
      }
      />
      <div className="poster-glass-cover"/>
      <div className="poster-overlay">
        <HiArrowsExpand/>
        <span>Expand</span>
        </div>
      </div>
      </div>

    <div className="movie-overview-wrapper" >
    <div className="movie-overview">
      <div className="line-1">
        <h2>Time for Them to Come Home for Christmas <span>(2020)</span></h2>
        
      </div>

      <div className="flex-wrap">
      <div className="line-2-wrapper">
      <div className="line-2">
        <div>
        <p className="movie-safety light-border">TV-MA</p>
        <p className="movie-date-sm">10/22/2021 (US)</p>
        <p className="movie-category">
          <span>Drama</span>, 
          <span>Drama</span>, 
          <span>Drama</span>, 
          <span>Drama</span>, 
          <span>Comedy</span></p>
        <span className="dot"></span>
        <p>30m</p>
        </div>
        <p className="movie-category-sm">
          <span>Drama</span>,
          <span>Drama</span>,
          <span>Drama</span>,
          <span>Drama</span>,
          <span>Comedy</span>
          </p>
      </div>
      </div>


      <div className="line-3">
        <div className="rate-circle-wrapper large-circle">
          <RateCircle percentage={100} size={"large"} className=""/>
          <span className="circle-title">User Score</span>
        </div>
        <div className="rate-circle-wrapper medium-circle">
          <RateCircle percentage={100} size={"medium"} className="medium-circle"/>
          <span className="circle-title">User Score</span>
        </div>

        <div className="separation-line"/>

        <div className="icons-block">
          <div><ImList2/></div>
          <div><FaHeart/></div>
          <div><IoBookmark/></div>
          <div><AiFillStar/></div>
        </div>

        <div className="play-btn">
          <FaPlay viewBox="0 0 600 512"/>
          <span>Play Trailer</span>
        </div>

      </div>
      </div>


      <div className="line-4">
      <h3>Pardon her French.</h3>
      </div>

      <div className="line-5">
        <h3>Overview</h3>
        <p>
          When ambitious Chicago marketing exec Emily unexpectedly lands her
          dream job in Paris, she embraces a new life as she juggles work,
          friends and romance.
        </p>

      </div>

      <div className="line-6">
        <div>
          <h4>Kenji Kamiyama</h4>
          <p>Creator</p>
        </div>
        <div>
          <h4>Shinji Aramaki</h4>
          <p>Creator</p>
        </div>
        <div>
          <h4>Kenji Kamiyama</h4>
          <p>Creator</p>
        </div>
        <div>
          <h4>Kenji Kamiyama</h4>
          <p>Creator</p>
        </div>
      </div>
    </div>
    </div>
  </section>
  )
}
