import React from 'react'

export default function ResultMovieCard() {


  let text = `After being left at home by himself for the holidays, 10-year-old Max Mercer must work to defend his home from a married couple who tries to steal back a valuable heirloom.`

console.log(text.substring(0,text.length-3));
  return (
    <div className='result-movie-card'>
      <img src="https://www.themoviedb.org/t/p/w94_and_h141_bestv2/fP3VvqUjEBjawxZHL4sYCq2ZdJD.jpg" alt="" />
      <div className='card-info'>
        <div className='top-info'>
        <h3>Miss Peregrine's Home for Peculiar Children</h3>
        <p>November 12, 2021</p>
        </div>
        <div className='movie-description'>
        <p>{text}</p>
       </div>
      </div>
    </div>
  )
}
