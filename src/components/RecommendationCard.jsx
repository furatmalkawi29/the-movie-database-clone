import React from 'react'
import calender from '../assets/images/calender.svg'
export default function RecommendationCard({
  data
}) {

  const roundRatingNumber = (number) =>{
    return Math.round(number)
  }

  return (
    <div className="recommendation-card">
      <div className="poster-container" title={data&&data.name || data&&data.title||null}>
        <img className="poster" src={`https://www.themoviedb.org/t/p/w250_and_h141_face/${data&&data.poster_path}`} alt="" />
        <div className="date-box">
          <img src={calender} alt="" />
          <span>{data&&data.first_air_date||data&&data.release_date||null}</span>
        </div>
      </div>
      <div className="bottom-info">
        <p>{data&&data.name || data&&data.title||null}
          </p>
        <p>{data&&data.vote_average&&`${roundRatingNumber(data.vote_average*10)}%`}</p>
      </div>
    </div>
  )
}
