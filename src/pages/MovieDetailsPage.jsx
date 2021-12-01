import React from "react";
import RateCircle from "../components/RateCircle";
import TopMenu from "../components/TopMenu";

import {FaHeart} from 'react-icons/fa'
import {ImList2} from 'react-icons/im'
import {IoBookmark} from 'react-icons/io5'
import {AiFillStar} from 'react-icons/ai'
import {FaPlay} from 'react-icons/fa'
import {HiArrowsExpand} from 'react-icons/hi'

export default function MovieDetailsPage() {
  return (
    <>
      <TopMenu />

      <section className="movie-overview-banner">

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

        <div className="movie-overview">
          <div className="line-1">
            <h2>Emily in Paris</h2>
            <span>(2020)</span>
          </div>


          <div className="line-2">
            <p className="movie-safety">TV-MA</p>
            <p className="movie-category"><span>Drama</span>, <span>Comedy</span></p>
            <span className="dot"></span>
            <p>30m</p>
          </div>


          <div className="line-3">
            <div className="rate-circle-wrapper">
              <RateCircle percentage={80} smallSize={false}/>
              <span className="circle-title">User Score</span>
            </div>

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
      </section>
    </>
  );
}
