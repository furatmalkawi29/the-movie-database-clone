import React from 'react'
import circleDotted from '../assets/images/circle-dotted.svg'
import RateCircle from './RateCircle'

export default function MovieCard() {
  return (
    <div className="movie-card">
      <img className="movie-poster" src="https://www.themoviedb.org/t/p/w220_and_h330_face/5AaKulwpUtkscAokKWtLenGTfVS.jpg" />
      <div className="movie-info">
      <h3>The Flash</h3>
      <p>Oct 07, 2014</p>
      </div>
      <img className="dotted-circle" src={circleDotted}/>
      <RateCircle percentage={83} />

    </div>
  )
}
