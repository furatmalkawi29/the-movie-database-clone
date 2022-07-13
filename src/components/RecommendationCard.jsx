import React from 'react'
import calender from '../assets/images/calender.svg'
export default function RecommendationCard({
  data
}) {


  return (
    <div className="recommendation-card">
      <div className="poster-container" title={data.name || data.title||null}>
        <img className="poster" src={`https://www.themoviedb.org/t/p/w250_and_h141_face/${data.poster_path}`} alt="" />
        <div className="date-box">
          <img src={calender} alt="" />
          <span>{data.first_air_date||data.release_date||null}</span>
        </div>
      </div>
      <div className="bottom-info">
        <p>{data.name || data.title||null}
          </p>
        <p>{(data.vote_average&&data.vote_average*10)||null}%</p>
      </div>
    </div>
  )
}
