import React from 'react'
import movieImagePlaceholder from '../assets/images/movie-image-placeholder.svg';

export default function ResultMovieCard({data}) {

  return (
    data&&!data.adult&&((data.media_type=='person'||data.known_for)&&
    <div className='search-person-container'>
      <div className='search-person-img-container'>
        {console.log((data.profile_path&&`https://www.themoviedb.org/t/p/w90_and_h90_face${data.profile_path}`))}
        <img src={(data.profile_path&&`https://www.themoviedb.org/t/p/w90_and_h90_face${data.profile_path}`)||movieImagePlaceholder} className={(!data.profile_path&&'search-person-default-image')}/>
      </div>
      <div className='search-person-info'>
      <p className='search-person-name'>{data.name}</p>
      <p className='search-person-work'><span>{data.known_for_department}</span> • {data.known_for&&data.known_for.map(item=>((item.name&&`${item.name}, `) || (item.title&&`${item.title}, `)||null))}</p>
      </div>
    </div> ||(
    <div className='result-movie-card'>
      <div className='search-card-img-container'>
      <img src={(data.backdrop_path&&`https://www.themoviedb.org/t/p/w94_and_h141_bestv2/${data.backdrop_path}`)||movieImagePlaceholder} alt="" className={(!data.backdrop_path&&'search-default-image')} />
      </div>
      <div className='card-info'>
        <div className='top-info'>
        <h3>{data.name || data.title||null}</h3>
        <p>{data.first_air_date||data.release_date||null}</p>
        </div>
        <div className='movie-description'>
        <p>{data.overview}</p>
       </div>
      </div>
    </div>))||null
  )
}
