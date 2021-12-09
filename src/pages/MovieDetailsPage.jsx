import React from "react";
import BottomMenu from "../components/BottomMenu";
import MovieDetailsHeader from "../components/MovieDetailsHeader";
import MovieFacts from "../components/MovieFacts";
import TopMenu from "../components/TopMenu";
import CastCard from "../components/CastCard";
import rightArrow from '../assets/images/right-arrow.svg'
import RecommendationCard from "../components/RecommendationCard";

export default function MovieDetailsPage() {
  return (
    <>
      <TopMenu />
      <MovieDetailsHeader />
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
            <div className="social-cards-container">

            </div>
            <p className="wrapper-link">Read All Reviews</p>
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
