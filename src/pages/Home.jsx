import React, {useState, useEffect} from 'react'
import {TrailerCardsContainer,Header,TrailerModal} from "../components";
import {MediaCardsContainer} from '../components/MediaCardsContainer'
import { useTitle } from '../assets/Hookes';
import {GetWeekTrendingMovies,
  GetPopularMovies,
  GetNowPlayingMovies,
  GetTodayTrendingTvShows,
  GetOnAirTvShows,
  GetPopularTvShows,} from '../Services'
import {MediaCardsEnums} from '../Enums'

export default function Home() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [trailerUrl, setTrailerUrl] = useState('');

  function changeModalVisibility (){
    setIsModalVisible(!isModalVisible);
  }

  function changeModalUrl (newUrl){
    setTrailerUrl(newUrl);
  }



  useTitle("TMDB")

  return (
    <>

    <Header/>

    <MediaCardsContainer 
    containerTitleText={MediaCardsEnums.PopularContainer.title}
    optionOneText={MediaCardsEnums.PopularContainer.optionOneText}
    optionTwoText={MediaCardsEnums.PopularContainer.optionTwoText}
    optionOneServiceFunction={GetPopularMovies}
    optionTwoServiceFunction={GetPopularTvShows}
    />

      <TrailerCardsContainer 
        reelType="now_playing"
        heading="Latest Trailers"
        reelId="3"
        changeModalVisibility={changeModalVisibility}
        changeModalUrl={changeModalUrl}
        trailers="true" 
        containerTitleText={MediaCardsEnums.TrailersContainer.title}
        optionOneText={MediaCardsEnums.TrailersContainer.optionOneText}
        optionTwoText={MediaCardsEnums.TrailersContainer.optionTwoText}
        optionOneServiceFunction={GetNowPlayingMovies}
        optionTwoServiceFunction={GetOnAirTvShows}
        />

    <MediaCardsContainer 
    containerTitleText={MediaCardsEnums.PlayingContainer.title}
    optionOneText={MediaCardsEnums.PlayingContainer.optionOneText}
    optionTwoText={MediaCardsEnums.PlayingContainer.optionTwoText}
    optionOneServiceFunction={GetTodayTrendingTvShows}
    optionTwoServiceFunction={GetWeekTrendingMovies}
    />

      {isModalVisible&&(
      <TrailerModal 
      changeModalVisibility={changeModalVisibility} 
      trailerUrl={trailerUrl}/>
      )||null}

      <section className="join-banner">
        <h2>Join Today</h2>

        <div className="banner-content">
          <div>
            <p>
              Get access to maintain your own <span>custom personal lists</span>
              , <span>track what you've seen </span> and search and filter for
              what to watch next—regardless if it's in theatres, on TV or
              available on popular streaming services like Netflix, Disney Plus,
              and Amazon Prime Video.
            </p>

            <button>Sign Up</button>
          </div>
          <div>
            <ul>
              <li>Enjoy TMDB ad free</li>
              <li>Maintain a personal watchlist</li>
              <li>
                Filter by your subscribed streaming services and find something
                to watch
              </li>
              <li>Log the movies and TV shows you've seen</li>
              <li>Build custom lists</li>
              <li>Contribute to and improve our database</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
