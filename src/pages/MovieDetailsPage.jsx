import React, { useEffect, useState, useReducer } from "react";
import BottomMenu from "../components/BottomMenu";
import MovieDetailsHeader from "../components/MovieDetailsHeader";
import MovieFacts from "../components/MovieFacts";
import TopMenu from "../components/TopMenu";
import CastCard from "../components/CastCard";
import rightArrow from '../assets/images/right-arrow.svg'
import RecommendationCard from "../components/RecommendationCard";
import ReviewCard from "../components/ReviewCard";
import playIcon from '../assets/images/playIcon.svg'
import { useLocation, useParams, useNavigate } from 'react-router-dom'


export default function MovieDetailsPage() {

  const { id } = useParams();
  const navigate = useNavigate();
  let location = useLocation();

  useEffect(()=>{
    if(location&&location.pathname){
      if(location.pathname.includes('movie')){
        navigate(`/movie/${id}`);
      }else {
        navigate(`/tv/${id}`);
      }
    }
  },[id])
  return (
    <>
      <TopMenu />
      <MovieDetailsHeader id={id}/>
      <section className="info-content">
        <div>
          <section className="cards-wrapper">
            <h3>Series Cast</h3>
            {/* <h3>Top Billed Cast</h3> */}
            <div className="cast-cards-container">
              <CastCard />
              <CastCard />
              <CastCard />
              <CastCard />
              <CastCard />
              <CastCard />
              <CastCard />
              <CastCard />
              <div className="view-more"><span>View More</span><img src={rightArrow}/></div>
            </div>
            <p className="wrapper-link">Full Cast & Crew</p>
          </section>

          <section className="cards-wrapper">
            <div className="wrapper-top">
            <h3>Social</h3>
            <div className="tabs-menu">
              <div className="active-tab-underline">
                <p>Reviews</p>
                <span>0</span>
              </div>
              <div>
                <p> Discussions</p>
                <span>2</span>
              </div>
            </div>
            </div>
            <div>
              <ReviewCard/>
              <p>We don't have any reviews for The Night House.</p>
            </div>
            <p className="wrapper-link">Read All Reviews</p>
          </section>


          <section className="cards-wrapper">
          <div className="wrapper-top">
            <h3>Media</h3>
            <div className="tabs-menu">
              <div className="active-tab-underline">
                <p>Most Popular</p>
              </div>
              <div>
                <p>Videos</p>
                <span>2</span>
              </div>
              <div>
                <p>Backdrops</p>
                <span>9</span>
              </div>
              <div>
                <p>Posters</p>
                <span>10</span>
              </div>
            </div>
            </div>
            <div className="media-cards-container">
              <div className="thumbnail">
                <img className="thumbnail-img" src={"https://img.youtube.com/vi/mKB57L2MfXY/sddefault.jpg"} alt="" />
                <div className="thumbnail-btn">
                  <img src={playIcon} alt="" />
                </div>
              </div>
              <img className="media-img" src="https://www.themoviedb.org/t/p/w533_and_h300_bestv2/3SRGKDVUmZ98Ak3zCvmwq3QGxfS.jpg" alt="" />
              <img className="media-img" src="https://www.themoviedb.org/t/p/w220_and_h330_face/wlsivaJuU6HScCFKcgv1cgtdmQt.jpg" alt="" />
            </div>
          </section>

          <section className="cards-wrapper recommendation">
            <h3>Recommendations</h3>
            <div className="cast-cards-container">
             <RecommendationCard/>
             <RecommendationCard/>
             <RecommendationCard/>
             <RecommendationCard/>
             <RecommendationCard/>
            </div>
            <p>We don't have enough data to suggest any TV shows based on People Puzzler. You can help by rating TV shows you've seen.</p>
          </section>


        </div>
        <div>
          <MovieFacts />
        </div>
      </section>
      <BottomMenu />
    </>
  );
}
