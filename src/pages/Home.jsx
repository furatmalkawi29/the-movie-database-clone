import React, {useState, useEffect} from 'react'
import CardsReel from "../components/CardsReel";
import Header from '../components/Header';
import TrailerModal from "../components/TrailerModal";


export default function Home() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [trailerUrl, setTrailerUrl] = useState('');

  function changeModalVisibility (){
    setIsModalVisible(!isModalVisible);
  }

  function changeModalUrl (newUrl){
    setTrailerUrl(newUrl);
  }


  return (
    <>

    <Header/>
      <CardsReel type="popular" heading="What's Popular" reelId="1"/>

      <CardsReel type="trailers" heading="Latest Trailers"
        reelId="3"
        changeModalVisibility={changeModalVisibility}
        changeModalUrl={changeModalUrl}
        trailers="true" />

      <CardsReel type="trending" heading="Trending" reelId="4"/>

      {isModalVisible?(<TrailerModal changeModalVisibility={changeModalVisibility} trailerUrl={trailerUrl}/>):null}

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
