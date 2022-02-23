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
      <CardsReel 
       reelType="popular"
        heading="What's Popular"
        reelId="1"/>

      <CardsReel 
       reelType="now_playing"
        heading="Latest Trailers"
        reelId="3"
        changeModalVisibility={changeModalVisibility}
        changeModalUrl={changeModalUrl}
        trailers="true" />
{/* 
to get videos of movie, using moviie id :
https://api.themoviedb.org/3/movie/634649/videos?api_key=12bc6ecb9c283f7d949b6d6c91e417ac&language=en-US 

response : 
[
{
"iso_639_1": "en",
"iso_3166_1": "US",
"name": "Walking Corpses Clip",
"key": "GGe_h2MWMrs", <=============
"site": "YouTube",
"size": 1080,
"type": "Clip",
"official": true,
"published_at": "2022-01-29T17:00:39.000Z",
"id": "61f77629bb105700a0b16a3f"
},



you use the video key in a youtube url, if the site was youtube:

https://www.youtube.com/watch?v=GGe_h2MWMrs
  ,....
]

*/}
      <CardsReel 
       reelType="trending"
        heading="Trending"
        reelId="4"/>

      {isModalVisible?(
      <TrailerModal 
      changeModalVisibility={changeModalVisibility} 
      trailerUrl={trailerUrl}/>
      ):null}

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
