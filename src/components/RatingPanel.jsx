import React, { useState, useEffect } from 'react'
import { IconsEnums } from '../Enums';
import { useSelector } from 'react-redux';


export const RatingPanel = ({
  setMediaRating,
  removeMediaRating,
  mediaRating,
  mobilePanel
}) => {
  
  const [starsFillValues, setStarsFillValues] = useState({
    starOne: 0,
    starTwo: 0,
    starThree: 0,
    starFour: 0,
    starFive: 0,
  });



  const starFillHandler = (mediaRate) => {
    if (mediaRate) {
      setStarsFillValues({
        starOne: (mediaRate - 1 < 0) ? 0 : 1,
        starTwo: (mediaRate - 2 < 0) ? 0 : 1,
        starThree: (mediaRate - 3 < 0) ? 0 : 1,
        starFour: (mediaRate - 4 < 0) ? 0 : 1,
        starFive: (mediaRate - 5 < 0) ? 0 : 1,
      })
    } else {
      setStarsFillValues({
        starOne: 0,
        starTwo: 0,
        starThree: 0,
        starFour: 0,
        starFive: 0,
      })
    }

  }

  const ratingStarsHoverHandler = (event) => {
    const starUnderMouseId = event.target.id;
    starFillHandler(starUnderMouseId)
  }

  const ratingStarsClickHandler = (event) => {
    const starUnderMouseId = event.target.id;
    setMediaRating(starUnderMouseId);
  }

  const ratingRemoveClickHandler = () => {
    setMediaRating(null);
    starFillHandler();
    removeMediaRating();
  }

  const ratingStarsLeaveHandler = () => {
      starFillHandler(mediaRating)   
  }
  
  useEffect(()=>{
    starFillHandler(mediaRating)
  },[])

  return (
    <div className={mobilePanel&&'mobile-rating-panel'}>
    <div className='rating-panel'>
      <img src={IconsEnums.removeIcon.Img}
        className="rating-panel-remove-btn"
        onClick={ratingRemoveClickHandler}
      />
      <div id='1'
        className="rating-panel-star"
        style={{ "--rating": `${starsFillValues.starOne}` }}
        onMouseEnter={ratingStarsHoverHandler}
        onMouseLeave={ratingStarsLeaveHandler}
        onClick={ratingStarsClickHandler}
      />
      <div id='2'
        className="rating-panel-star"
        style={{ "--rating": `${starsFillValues.starTwo}` }}
        onMouseEnter={ratingStarsHoverHandler}
        onMouseLeave={ratingStarsLeaveHandler}
        onClick={ratingStarsClickHandler}
      />
      <div id='3'
        className="rating-panel-star"
        style={{ "--rating": `${starsFillValues.starThree}` }}
        onMouseEnter={ratingStarsHoverHandler}
        onMouseLeave={ratingStarsLeaveHandler}
        onClick={ratingStarsClickHandler}
      />
      <div id='4'
        className="rating-panel-star"
        style={{ "--rating": `${starsFillValues.starFour}` }}
        onMouseEnter={ratingStarsHoverHandler}
        onMouseLeave={ratingStarsLeaveHandler}
        onClick={ratingStarsClickHandler}
      />
      <div id='5'
        className="rating-panel-star"
        style={{ "--rating": `${starsFillValues.starFive}` }}
        onMouseEnter={ratingStarsHoverHandler}
        onMouseLeave={ratingStarsLeaveHandler}
        onClick={ratingStarsClickHandler}
      />

    </div>
    </div>)

}
