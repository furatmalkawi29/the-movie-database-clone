import React, {useEffect, useState} from 'react'
import $ from 'jquery'
import MovieCard from './MovieCard';
import TrailerCard from './TrailerCard';
import useGetRequest from '../assets/helpers/useGetRequest.jsx'
import ToggleButton from './ToggleButton'
export default function CardsReel(props) {


    
  const [route, setRoute] = useState("/tv/popular");
  let data = useGetRequest(route);
  
  const [defaultData, setDefaultData] = useState(null)
  const [isLoading, setIsLoading]= useState(true);

  useEffect(() => {
if(data &&isLoading){
  console.log(data);
  setDefaultData(data)
  setIsLoading(false)
}
  }, [data])
  
    


  return (
    <section id={`cards-reel-${props.reelId}`} className='cards-reel' >

      <div className="reel-top-container">
      <h2>{props.heading}</h2>

       {/* large screen selector*/}
      <ToggleButton reelId={props.reelId}/>

       {/* small screen selector */}
      <ToggleButton size="small" reelId={props.reelId}/>
      </div>


      <div className='cards-container'>
{
  isLoading?<p>loading..</p>:(

    defaultData.map((movieData, index)=>{
      return <MovieCard key={`popular-${movieData.id}`} movieData={movieData} id={`popular-${movieData.id}`}/>
      
  })
  )
}
      </div>
    </section>
  )
}