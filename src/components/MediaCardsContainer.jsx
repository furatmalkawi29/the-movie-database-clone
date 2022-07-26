// import React from "react"

import React, { useEffect, useState } from "react";
import {MovieCard} from "./MovieCard";
import {ToggleButton} from "./ToggleButton";
import { Link } from "react-router-dom";

export const MediaCardsContainer = ({
  containerTitleText,
  optionOneServiceFunction,
  optionTwoServiceFunction,
  optionOneText,
  optionTwoText,
}) => {
  const [data, setData] = useState([]);
  const [mediaType, setMediaType] = useState("movie");
  const [activeOption, setActiveOption] = useState(1);

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

  useEffect(() => {
    getMediaCardsData();
  }, [activeOption, optionOneServiceFunction, optionOneServiceFunction]);
  
  useEffect(() => {
    getMediaType();
  }, [data]);

  return (
    <section id={`cards-reel-${4}`} className="cards-reel">
      <div className="reel-top-container">
        <h2>{containerTitleText}</h2>

        <ToggleButton
          optionOneText={optionOneText}
          optionTwoText={optionTwoText}
          setActiveOption={setActiveOption}
        />
      </div>

      <div className="cards-container">
        {data &&
          data.map((item) => {
            return (
              <Link to={`/${mediaType}/${item.id}`}>
                <MovieCard
                  key={`${item.id}`}
                  movieData={item}
                  id={`${item.id}`}
                />
              </Link>
            );
          })}
      </div>
    </section>
  );
};
