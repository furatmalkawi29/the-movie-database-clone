import React from 'react'
import star from '../assets/images/star.svg'

export default function ReviewCard() {

  let reviewBody =`
  Given I wasn't a big fan of Halloween 2018, the bar on Halloween Kills was rather low and... pretty much met it. While some of the deaths were pretty gruesome, the rest was kind of bland and character decisions as dumb as others. Like the initial sequel, Halloween II, Jamie Lee Curtis spends the bulk of her time in the hospital.

  clumsily choreographed, showed him taking on 5-6 people; just looked so good`

  function clipText(text,charactersNum) {
    let clippedText = text.substr(0,charactersNum);

    return clippedText+'... ';
  }


  return (
    <div className="review-card">
      <div className="author">
        <img className="author-avatar" src="https://www.themoviedb.org/t/p/w64_and_h64_face/hlNmfiWN5ytcfvsonoteiDC90ua.jpg" alt=""/>

        <div className="author-info">
          <div>
            <p>A review by RADIO1'S MR. MOVIE!-MAD AMI</p>
            <div className="star-rate">
              <img src={star} alt=""/>
              <span>10.0</span></div>
          </div>
          <p className="review-date">Written by <span>raf qpsk</span> on October 24, 2021</p>
        </div>
      </div>

      <div className="review-body">
        { reviewBody.length>598?(
          <p>{clipText(reviewBody,598)}
        <a href="">read the rest.</a>
        </p>
        ):<p>{reviewBody}</p>}
        
      </div>
    </div>
  )
}
