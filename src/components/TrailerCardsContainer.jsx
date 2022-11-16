import React, { useEffect, useState } from 'react'
import {TrailerCard, ToggleButton} from '../components';

export const TrailerCardsContainer = ({ reelId,
  changeModalVisibility,
  changeModalUrl,
  containerTitleText,
  optionOneServiceFunction,
  optionTwoServiceFunction,
  optionOneText,
  optionTwoText,
}) => {
  const [data, setData] = useState(null)
  const [activeOption, setActiveOption] = useState(1);
  const [mediaType,setMediaType] = useState("movie");


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
    const tvMediaType = data && data.find((item) => item.first_air_date);
    const movieMediaType = data && data.find((item) => item.release_date);

    if (tvMediaType) {
      setMediaType("tv");
    } else if (movieMediaType) {
      setMediaType("movie");
    }
  };


  useEffect(() => {
    getMediaCardsData();
  }, [activeOption, optionOneServiceFunction, optionOneServiceFunction]);



  useEffect(() => {
    getMediaType();
  }, [data])

  return (
    <section id={`cards-reel-${reelId}`} className='cards-reel' >

      <div className="reel-top-container">
        <h2>{containerTitleText}</h2>

        <ToggleButton
          optionOneText={optionOneText}
          optionTwoText={optionTwoText}
          setActiveOption={setActiveOption}
        />
      </div>


      <div className='cards-container'>
        {data && data.map((item,index) => <TrailerCard
          key={index}
          mediaData={item}
          mediaType={mediaType}
          mediaId={item.id}
          changeModalUrl={changeModalUrl}
          changeModalVisibility={changeModalVisibility}
          activeOption={activeOption}
        />
        )
        }
      </div>
    </section>
  )
}

