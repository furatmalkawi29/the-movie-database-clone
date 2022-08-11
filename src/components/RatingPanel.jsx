import React, {useState} from 'react'

export const RatingPanel = ({
  setMediaRating,
  mediaRating
  })=>{

  const [starsFillValues, setStarsFillValues] = useState({
    starOne: 0,
    starTwo: 0,
    starThree: 0,
    starFour: 0,
    starFive: 0, 
    });


    const starFillHandler = (starUnderMouseId) =>{

      if(starUnderMouseId){
        setStarsFillValues({
          starOne: (starUnderMouseId-1 < 0)? 0 : 1,
          starTwo: (starUnderMouseId-2 < 0)? 0 : 1,
          starThree: (starUnderMouseId-3 < 0)? 0 : 1,
          starFour: (starUnderMouseId-4 < 0)? 0 : 1,
          starFive: (starUnderMouseId-5 < 0)? 0 : 1, 
        })
      }else {
        setStarsFillValues({
          starOne: 0,
          starTwo: 0,
          starThree: 0,
          starFour: 0,
          starFive: 0, 
          })
      }
        
    }

    const ratingStarsHoverHandler = (event) =>{
      const starUnderMouseId = event.target.id;
      starFillHandler(starUnderMouseId)
    }
    
    const ratingStarsClickHandler = (event) =>{
      const starUnderMouseId = event.target.id;
      setMediaRating(starUnderMouseId);
    }

    const ratingStarsLeaveHandler = () =>{
      if(!mediaRating){
        starFillHandler()
      }else{
        starFillHandler(mediaRating)
      }
    }

    return (
        <div className='rating-panel'>
          <div id='1'
           className="rating-panel-star"
           style={{"--rating":`${starsFillValues.starOne}`}}
           onMouseEnter={ratingStarsHoverHandler}
           onMouseLeave={ratingStarsLeaveHandler}
           onClick={ratingStarsClickHandler}
           />
          <div id='2'
           className="rating-panel-star"
           style={{"--rating":`${starsFillValues.starTwo}`}}
           onMouseEnter={ratingStarsHoverHandler}
           onMouseLeave={ratingStarsLeaveHandler}
           onClick={ratingStarsClickHandler}
           />
          <div id='3'
           className="rating-panel-star"
           style={{"--rating":`${starsFillValues.starThree}`}}
           onMouseEnter={ratingStarsHoverHandler}
           onMouseLeave={ratingStarsLeaveHandler}
           onClick={ratingStarsClickHandler}
           />
          <div id='4'
           className="rating-panel-star"
           style={{"--rating":`${starsFillValues.starFour}`}}
           onMouseEnter={ratingStarsHoverHandler}
           onMouseLeave={ratingStarsLeaveHandler}
           onClick={ratingStarsClickHandler}
           />
          <div id='5'
           className="rating-panel-star"
           style={{"--rating":`${starsFillValues.starFive}`}}
           onMouseEnter={ratingStarsHoverHandler}
           onMouseLeave={ratingStarsHoverHandler}
           />
        </div>    )
}
