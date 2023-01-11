import React from 'react'
import {Link} from 'react-router-dom'
import {ImagesPathEnum, AssetImagesEnums} from '../Enums'

export function RecommendationCard({
  data
}) {
  const movieImagePlaceholder = '/assets/images/movie-image-placeholder.svg';  

  const roundRatingNumber = (number) =>{
    return Math.round(number)
  }

  return (
    <Link to={`/${data.media_type}/${data.id}`}>
    <div className="recommendation-card">
      <div className="poster-container" title={data&&data.name || data&&data.title||null}>
        <img className="poster" src={(data&&data.poster_path&&`${ImagesPathEnum.face.w250_and_h141.value}/${data&&data.poster_path}`)||movieImagePlaceholder} alt="" />
        <div className="date-box">
          <img src={AssetImagesEnums.calender.Img} alt="" />
          <span>{data&&data.first_air_date||data&&data.release_date||null}</span>
        </div>
      </div>
      <div className="bottom-info">
        <p>{data&&data.name || data&&data.title||null}
          </p>
        <p>{data&&data.vote_average!==null&&`${roundRatingNumber(data.vote_average*10)}%`}</p>
      </div>
    </div>
    </Link>
  )
}
