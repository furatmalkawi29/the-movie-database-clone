import React from 'react'
import calender from '../assets/images/calender.svg'
export default function RecommendationCard() {

  function clipText(text,charactersNum) {
    let clippedText = text.substr(0,charactersNum);

    return clippedText+'... ';
  }

  let text = "Dan Brown's The Lost Symbol"

  return (
    <div className="recommendation-card">
      <div className="poster-container" title={"Dan Brown's The Lost Symbol"}>
        <img className="poster" src="https://www.themoviedb.org/t/p/w250_and_h141_face/hZ9MlxA80rLGh5OExoJEeIEBByD.jpg" alt="" />
        <div className="date-box">
          <img src={calender} alt="" />
          <span>2021-09-16</span>
        </div>
      </div>
      <div className="bottom-info">
        <p>{text.length>27?
          clipText(text, 26):text}
          </p>
        <p>76%</p>
      </div>
    </div>
  )
}
