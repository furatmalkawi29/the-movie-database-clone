import React, {useEffect, useState} from 'react'
import TrailerCard from './TrailerCard';
import ToggleButton2 from './ToggleButton2'
import {Link} from 'react-router-dom'
import {GetMovieVideos, GetTvShowVideos} from '../Services'

const CardsReel = ({reelId,
changeModalVisibility,
changeModalUrl,
containerTitleText,
optionOneServiceFunction,
optionTwoServiceFunction,
optionOneText,
optionTwoText,
})=> { 
  const [data, setData] = useState(null)
  const [moviesAndSeiresTrailers,setMoviesAndSeiresTrailers] = useState([]);

  const [activeOption, setActiveOption] = useState(1);
  const [mediaType, setMediaType] = useState("movie");
 

  const getMediaCardsData = async () => {
    if (activeOption && optionOneServiceFunction && optionOneServiceFunction) {
      const response =
        activeOption === 1
          ? await optionOneServiceFunction()
          : await optionTwoServiceFunction();

      if (!(response && response.status && response.status !== 200)) {
        setData((response && response.results) || []);
      }
    }
  };

  const getMediaType = () => {
    const tvMediaType = data&&data.find((item) => item.first_air_date);
    const movieMediaType = data&&data.find((item) => item.release_date);

    if (tvMediaType) {
      setMediaType("tv");
    } else if (movieMediaType) {
      setMediaType("movie");
    }
  };


  const getMoviesAndSeiresVedios = async (id) => {
    if (activeOption && optionOneServiceFunction && optionOneServiceFunction) {
      const response =
        activeOption === 1
          ? await GetMovieVideos(id)
          : await GetTvShowVideos(id);

      if (!(response && response.status && response.status !== 200)) {
        const test =  response.results.find(item=>item.site === 'YouTube'&&(item.type==="Trailer"||item.type==="Clip"))
  console.log(test);
        test.id = id;
        // test.name = data.name;
    setMoviesAndSeiresTrailers(prevState => ([...prevState,test]))   
      }
    }
  };

  
  const getMoviesAndSeiresTrailers = async () =>{
    data&&data.forEach(item=>{
  getMoviesAndSeiresVedios(item.id)
    })
  }

  useEffect(() => {
    getMediaCardsData();
  }, [activeOption, optionOneServiceFunction, optionOneServiceFunction]);


    
  useEffect(()=>{
      getMoviesAndSeiresTrailers();
      getMediaType();
  },[data])
console.log(moviesAndSeiresTrailers);

  return (
    <section id={`cards-reel-${reelId}`} className='cards-reel' >

      <div className="reel-top-container">
      <h2>{containerTitleText}</h2>

      <ToggleButton2 reelId={reelId} 
      optionOneText={optionOneText}
      optionTwoText={optionTwoText}
      setActiveOption={setActiveOption}
      />
      </div>


      <div className='cards-container'>
{data&&data.map(item=><TrailerCard
      id={`${item.id}`}
      movieData={item}
      moviesAndSeiresTrailers={moviesAndSeiresTrailers}
      changeModalUrl={changeModalUrl}
      changeModalVisibility={changeModalVisibility}
      />
    )
}
      </div>
    </section>
  )
}

export {CardsReel}
