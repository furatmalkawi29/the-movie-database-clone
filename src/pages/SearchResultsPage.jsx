import React from 'react'
import ResultMovieCard from '../components/ResultMovieCard'

export default function SearchResultsPage() {
  return (
    <div className='search-result'>
      <aside>
        <div  className='aside-heading'>
          <h3>Search Results</h3>
        </div>
        <div className='aside-content'>
          <div className='aside-item active-aside-item'><p>Movies</p><span>27</span></div>
          <div className='aside-item'><p>TV Shows</p><span>5</span></div>
          <div className='aside-item'><p>Keywords</p><span>0</span></div>
          <div className='aside-item'><p>Collections</p><span>0</span></div>
          <div className='aside-item'><p>People</p><span>2</span></div>
          <div className='aside-item'><p>Companies</p><span>6</span></div>
          <div className='aside-item'><p>Networks</p><span>0</span></div>
        </div>
      </aside>

      <div className='results-menu'>
        <div className='menu-heading'>
        <h3>Search Results</h3>
        </div>
        <div className='menu-content'>
        <div className='results-menu-item active-item'><p>Movies</p><span>27</span></div>
        <div className='results-menu-item'><p>TV Shows</p><span>27</span></div>
          <div className='results-menu-item'><p>Keywords</p><span>0</span></div>
          <div className='results-menu-item'><p>Collections</p><span>0</span></div>
          <div className='results-menu-item'><p>People</p><span>2</span></div>
          <div className='results-menu-item'><p>Companies</p><span>6</span></div>
          <div className='results-menu-item'><p>Networks</p><span>0</span></div>
        </div>
      </div>

      <div className='results-container'>
        <ResultMovieCard/>
        <ResultMovieCard/>
        <ResultMovieCard/>
        <ResultMovieCard/>
        <ResultMovieCard/>
        <ResultMovieCard/>
        <ResultMovieCard/>
        <ResultMovieCard/>
        <ResultMovieCard/>
        <ResultMovieCard/>
        <ResultMovieCard/>
        <ResultMovieCard/>
        <ResultMovieCard/>
        <ResultMovieCard/>
        <ResultMovieCard/>
        <ResultMovieCard/>
        <ResultMovieCard/>
        <ResultMovieCard/>
        <ResultMovieCard/>
        <ResultMovieCard/>
        <p>There are no movies that matched your query.</p>
      </div>
    </div>
  )
}
