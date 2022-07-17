import React, {useEffect, useState} from 'react'
import ResultMovieCard from '../components/ResultMovieCard'
import { useLocation, Link } from 'react-router-dom'
import getRequest from '../assets/helpers/useGetRequest.jsx'

export default function SearchResultsPage() {

  const [searchData, setSearchData] = useState([])
  const [searchResultsFilter, setSearchResultsFilter] = useState(null)

  const UseSearchQuery = ()=>{
    const {search} = useLocation();
   return new URLSearchParams(search).toString("query")
  }

  const searchQuery = UseSearchQuery();

  const getSearchResults = async ()=>{

    const response = searchResultsFilter?await getRequest(`/search/${searchResultsFilter}`, searchQuery):await getRequest(`/search/multi`, searchQuery)
    if(!(response&&response.success===false)){
      setSearchData(response||[]);
    }

  }

  const searchFilterCLickHandler = (event)=>{
    const filterValue = event.target.id;
    setSearchResultsFilter(filterValue)
  }
    
  useEffect(()=>{
    getSearchResults();
  },[searchResultsFilter])
  
  return (
    <div className='search-result'>
      <aside>
        <div  className='aside-heading'>
          <h3>Search Results</h3>
        </div>
        <div className='aside-content'>
          <div className={!searchResultsFilter?'aside-item active-aside-item':'aside-item'}>
            <p onClick={searchFilterCLickHandler}>All</p>
            {!searchResultsFilter&&<span>{searchData.length}</span>}
          </div>

          <div className={searchResultsFilter==='movie'?'aside-item active-aside-item':'aside-item'}>
            <p id='movie' onClick={searchFilterCLickHandler}>Movies</p>
            {searchResultsFilter==='movie'&&<span>{searchData.length}</span>}
          </div>

          <div className={searchResultsFilter==='tv'?'aside-item active-aside-item':'aside-item'}>
            <p id='tv' onClick={searchFilterCLickHandler}>TV Shows</p>
            {searchResultsFilter==='tv'&&<span>{searchData.length}</span>}
          </div>

          <div className={searchResultsFilter==='person'?'aside-item active-aside-item':'aside-item'}>
            <p id='person' onClick={searchFilterCLickHandler}>People</p>
            {searchResultsFilter==='person'&&<span>{searchData.length}</span>}
          </div>
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
        {(searchData&&searchData.length>0&&searchData.map(item=>((item.media_type==="tv"||item.media_type==="movie")&&<Link to={`/${item.media_type}/${item.id}`}> <ResultMovieCard 
        data={item}/></Link>)||<ResultMovieCard 
        data={item}/>))||<p>There are no results that matched your query.</p>}
      </div>
    </div>
  )
}
