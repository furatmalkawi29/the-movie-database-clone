import React from 'react'
import calender from '../assets/images/calender.svg'
export default function RecommendationCard() {
  return (
    <div className="recommendation-card">
      <div className="poster-container">
        <img className="poster" src="https://www.themoviedb.org/t/p/w250_and_h141_face/hZ9MlxA80rLGh5OExoJEeIEBByD.jpg" alt="" />
        <div className="date-box">
          <img src={calender} alt="" />
          <span>2021-09-16</span>
        </div>
      </div>
      <div className="bottom-info">
        <p>Dan Brown's The Lost Symbol</p>
        <p>76%</p>
      </div>
    </div>
  )
}
