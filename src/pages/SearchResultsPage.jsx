import React, {useEffect, useState} from 'react'
import ResultMovieCard from '../components/ResultMovieCard'
import { useSearchParams, Link } from 'react-router-dom'
import {MultiSearch, CategorySearch} from '../Services/SearchServices'

export default function SearchResultsPage() {

  const [searchResult, setSearchResult] = useState([])
  const [searchCategory, setSearchCategory] = useState(null)
  const [searchParams] = useSearchParams();



  const getSearchResults = async (searchQuery)=>{

    const response = searchCategory?await CategorySearch({searchQuery,searchCategory}):await MultiSearch(searchQuery)
    if (!(response && response.status && response.status !== 200)) {
      setSearchResult((response&&response.results)||[]);
    }
  }

  const searchFilterCLickHandler = (event)=>{
    const filterValue = event.target.id;
    setSearchCategory(filterValue)
  }
    
  const getMoviePageUrl = (item) =>{
    let pageUrl = ''
    if(item.media_type){
      pageUrl = `/${item.media_type}/${item.id}`;
    }else if (item.release_date){
      pageUrl = `/movie/${item.id}`;
    }else if (item.first_air_date){
      pageUrl = `/tv/${item.id}`;
    }

    return pageUrl
  }

  useEffect(()=>{
    const searchQuery = searchParams.get('query');
    getSearchResults(searchQuery);
  },[searchCategory])
  
  return (
    <div className='search-result'>
      <aside>
        <div  className='aside-heading'>
          <h3>Search Results</h3>
        </div>
        <div className='aside-content'>
          <div className={!searchCategory?'aside-item active-aside-item':'aside-item'}>
            <p onClick={searchFilterCLickHandler}>All</p>
            {!searchCategory&&<span>{searchResult.length}</span>}
          </div>

          <div className={searchCategory==='movie'?'aside-item active-aside-item':'aside-item'}>
            <p id='movie' onClick={searchFilterCLickHandler}>Movies</p>
            {searchCategory==='movie'&&<span>{searchResult.length}</span>}
          </div>

          <div className={searchCategory==='tv'?'aside-item active-aside-item':'aside-item'}>
            <p id='tv' onClick={searchFilterCLickHandler}>TV Shows</p>
            {searchCategory==='tv'&&<span>{searchResult.length}</span>}
          </div>

          <div className={searchCategory==='person'?'aside-item active-aside-item':'aside-item'}>
            <p id='person' onClick={searchFilterCLickHandler}>People</p>
            {searchCategory==='person'&&<span>{searchResult.length}</span>}
          </div>
        </div>
      </aside>

      <div className='results-menu'>
        <div className='menu-heading'>
        <h3>Search Results</h3>
        </div>
        <div className='menu-content'>
          <div className={!searchCategory?'results-menu-item active-item':'results-menu-item'}>
            <p onClick={searchFilterCLickHandler}>All</p>
            {!searchCategory&&<span>{searchResult.length}</span>}
          </div>

        <div className={searchCategory==='movie'?'results-menu-item active-item':'results-menu-item'}>
          <p id='movie' onClick={searchFilterCLickHandler}>Movies</p>
          {searchCategory==='movie'&&<span>{searchResult.length}</span>}
          </div>

        <div className={searchCategory==='tv'?'results-menu-item active-item':'results-menu-item'}>
          <p id='tv' onClick={searchFilterCLickHandler}>TV Shows</p>
          {searchCategory==='tv'&&<span>{searchResult.length}</span>}
          </div>

          <div className={searchCategory==='person'?'results-menu-item active-item':'results-menu-item'}>
            <p id='person' onClick={searchFilterCLickHandler}>People</p>
            {searchCategory==='person'&&<span>{searchResult.length}</span>}
            </div>
        </div>
      </div>

      <div className='results-container'>
        {(searchResult&&searchResult.length>0&&searchResult.map(item=>((item.media_type==="tv"||item.media_type==="movie"||!item.known_for)&&<Link to={getMoviePageUrl(item)}><ResultMovieCard
        data={item}/></Link>)||<ResultMovieCard 
        data={item}/>))||<p>There are no results that matched your query.</p>}
      </div>
    </div>
  )
}
