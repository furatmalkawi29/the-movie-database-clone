import React, {useEffect, useState} from 'react'
import $ from 'jquery'
import MovieCard from './MovieCard';
import TrailerCard from './TrailerCard';
// import useGetRequest from '../assets/helpers/useGetRequest.jsx'
import getRequest from '../assets/helpers/useGetRequest.jsx'
import ToggleButton from './ToggleButton'
export default function CardsReel({reelId,
  heading,
  reelType}) { 
  const defaultRoute= `/tv/popular`;
  const [dynamicRoute, setDynamicRoute] = useState(defaultRoute);
  // let data = useGetRequest(dynamicRoute);
  // console.log(data);
  const [reelData, setReelData] = useState(null)
  const [isLoading, setIsLoading]= useState(true);
  const [activeScreenType,setActiveScreenType] = useState('tv');
  const [activeTimeWindow,setActiveTimeWindow] = useState(reelType==='trending'?'day':null);
  

  useEffect(async () => {
    
    setIsLoading(true);
    
    let data = await getRequest(dynamicRoute);
    
    setReelData(data)
setIsLoading(false);


  }, [dynamicRoute])
  
  // console.log(isLoading);
  // useEffect(()=>{
  //   let data = getRequest(dynamicRoute);
  //   setReelData(data)
  // }, [dynamicRoute])



  function getActiveSelection (selection){
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
console.log(activeScreenType);
console.log(activeTimeWindow);
  }


  useEffect(()=>{
    if ((activeScreenType|| activeTimeWindow) && reelType){
      switch(reelType){
        case 'trending':{setDynamicRoute(activeTimeWindow?`/trending/${activeScreenType}/${activeTimeWindow}`:defaultRoute)
      }
        break;
        case 'popular' : {setDynamicRoute(`/${activeScreenType}/popular`)
    }
        break;
        case 'now_playing' : {setDynamicRoute(defaultRoute)
        // case 'now_playing' : {setDynamicRoute(activeScreenType?`/${activeScreenType}/now_playing`:defaultRoute)
  }
        break;
      }
    }
  }, [activeScreenType, activeTimeWindow])
    


  return (
    <section id={`cards-reel-${reelId}`} className='cards-reel' >

      <div className="reel-top-container">
      <h2>{heading}</h2>

       {/* large screen selector*/}
      <ToggleButton reelId={reelId} 
      getActiveSelection={getActiveSelection}/>

       {/* small screen selector */}
      <ToggleButton getActiveSelection={getActiveSelection}
      reelId={reelId}
      size="small" />
      </div>


      <div className='cards-container'>
{
  isLoading?<p>loading..</p>:(

    reelData.map((movieData, index)=>{
      return <MovieCard key={`popular-${movieData.id}`} movieData={movieData} id={`popular-${movieData.id}`}/>
      
  })
  )
}
      </div>
    </section>
  )
}