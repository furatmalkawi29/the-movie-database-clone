import React, {useEffect, useState} from 'react'
import $ from 'jquery'
import MovieCard from './MovieCard';
import TrailerCard from './TrailerCard';
// import useGetRequest from '../assets/helpers/useGetRequest.jsx'
import getRequest from '../assets/helpers/useGetRequest.jsx'
import ToggleButton from './ToggleButton'
import axios from 'axios'
import {Link} from 'react-router-dom'

const CardsReel = ({reelId,
  heading,
  reelType,
trailers,
changeModalVisibility,
changeModalUrl})=> { 
  const defaultRoute= `/tv/popular`;
  const [dynamicRoute, setDynamicRoute] = useState(defaultRoute);
  // let data = useGetRequest(dynamicRoute);
  const [reelData, setReelData] = useState(null)
  const [isLoading, setIsLoading]= useState(true);
  const [activeScreenType,setActiveScreenType] = useState('tv');
  const [activeTimeWindow,setActiveTimeWindow] = useState(reelType==='trending'?'day':null);
  const [moviesAndSeiresTrailers,setMoviesAndSeiresTrailers] = useState({});


  useEffect(async () => {
    setIsLoading(true);
    let data = await getRequest(dynamicRoute);
    setReelData(data)
    setIsLoading(false);

  }, [dynamicRoute])
  

  const getActiveSelection = (selection)=>{
switch (selection) {
  case 'On TV':
      setActiveScreenType('tv')
    break;
  case 'In Theaters':
      setActiveScreenType('movie')
      break;
  case 'This Week':
    setActiveTimeWindow('week')
    break;
  case  'Today':
    setActiveTimeWindow('day')
    break;

}
  }


  const getMoviesAndSeiresVedios = async (id,isMovie) =>{
    try{
      const res = await axios.get(`https://api.themoviedb.org/3/${(isMovie&&'movie')||'tv'}/${id}/videos?api_key=12bc6ecb9c283f7d949b6d6c91e417ac&language=en-US`)


      if (res&&res.data&&res.data.results){
        res.data.results.length&&res.data.results.forEach(item=>{
          if (item.site === 'YouTube'&&(item.type=="Trailer"||item.type=="Clip"))
          setMoviesAndSeiresTrailers(prevState => ({...prevState,[`${id}`]:item}))
        })
      }
      
    } catch(error){
      return null;
    }

  }

  
  const getMoviesAndSeiresTrailers = async () =>{
    reelData&&reelData.forEach(item=>{
  getMoviesAndSeiresVedios(item.id,!item.first_air_date)
    })
  }

  //replace this with services function
  useEffect(()=>{
    if (reelType&&(activeScreenType|| activeTimeWindow)) {
      switch(reelType){
        case 'trending':{setDynamicRoute(activeTimeWindow?`/trending/${activeScreenType}/${activeTimeWindow}`:defaultRoute)
      }
        break;
        case 'popular' : {setDynamicRoute(`/${activeScreenType}/popular`)
    }
        break;
        case 'now_playing' : {
          if(activeScreenType==="tv"){
            setDynamicRoute(`/${activeScreenType}/on_the_air`)
          }else if(activeScreenType==="movie"){
        
          setDynamicRoute(`/${activeScreenType}/now_playing`)
        }
      }
        break;
}
    }
  }, [activeScreenType, activeTimeWindow])
    
  useEffect(()=>{
    if(trailers){
      getMoviesAndSeiresTrailers();
    }
  },[reelData])


  return (
    <section id={`cards-reel-${reelId}`} className='cards-reel' >

      <div className="reel-top-container">
      <h2>{heading}</h2>

       {/* large screen selector*/}
      <ToggleButton reelId={reelId} 
      getActiveSelection={getActiveSelection}/>

       {/* small screen selector */}
      {/* <ToggleButton
      reelId={reelId}
      size="small" /> */}
      </div>


      <div className='cards-container'>
{
  isLoading?<p>loading..</p>:(

    (reelData&&reelData.map((movieData, index)=>{
      return ((trailers&&<TrailerCard
      id={`${movieData.id}`}
      // cover={movieData.cover}
      // trailerUrl={movieData.trailer_url}
      // thumbnailPath={movieData.poster_path}
      movieData={movieData}
      moviesAndSeiresTrailers={moviesAndSeiresTrailers}
      changeModalUrl={changeModalUrl}
      changeModalVisibility={changeModalVisibility}/>)||
      <Link to={`/${activeScreenType}/${movieData.id}`}>
      <MovieCard
       key={`${movieData.id}`} 
       movieData={movieData}
       id={`${movieData.id}`}
       />
       </Link>
    )})
    )
    ||null
  )
}
      </div>
    </section>
  )
}

export {CardsReel}
