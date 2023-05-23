import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { RateCircle, PieChartComponent, BarChartComponent, ResultMediaCard,
   PaginationComponent } from '../components'
import {GetRatedTvShows, GetRatedMovies, GetWatchlistTvShows, GetWatchlistMovies,
  GetFavoriteMovies, GetFavoriteTvShows} from '../Services'
import {initialBarChartData} from '../assets/DataTemplates/initialBarChartData'
import {initialPieChartData} from '../assets/DataTemplates/initialPieChartData'
export const ProfilePage = ({ }) => {

  const { logIn, userAccount } = useSelector((state) => state);
  
  const avatarFilePath = `https://www.themoviedb.org/t/p/w150_and_h150_face`
  
  const defaultState = {
    username: userAccount?.username,
    name: userAccount?.name,
    avatar: (userAccount?.avatar?.tmdb?.avatar_path) && (`${avatarFilePath}/${userAccount.avatar.tmdb.avatar_path}`),
    numberOfRatedMovies: 0,
    numberOfRatedTvShows: 0,
  }
  
  const [state, setState] = useState(defaultState)
  const [activePage, setActivePage] = useState(1)
  const [numberOfPages, setNumberOfPages] = useState(1)
  const [barChartData, setBarChartData] = useState([])
  const [pieChartData, setPieChartData] = useState([])
  const [data, setData] = useState({
    ratedMovies: null,
    ratedTvShows: null,
    watchlistTvShows: null,
    watchlistMovies: null,
    favoriteMovies: null,
  })

  const avatarStyle = {
    background: (state.avatar && `url(${state.avatar})`) || `rgb(1 210 119)`
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


  const getRatingAverage = (ratedItems)=>{
    let ratingAverage= 0;
    if(ratedItems&&ratedItems.length){
      const numberOfRatedItems = ratedItems.length;

      const ratingsTotal = ratedItems.reduce((total, item)=>{
        return (total + item.rating)
      }, 0)

      ratingAverage = Math.ceil(ratingsTotal/numberOfRatedItems)*10;
    }
    return ratingAverage;  
  }

  const getRatedMovies = async () => {
    const accountId = userAccount && userAccount.id;
    const sessionId = logIn && logIn.sessionId;

    const response = await GetRatedMovies(accountId,sessionId);
    if (!(response && response.status && response.status !== 200)) {
      setData(prevState=>({...prevState,
        ratedMovies: response.results || [] }));
        
        setState(prevState=>(
          {...prevState,
           numberOfRatedMovies: response.total_results}
           ))

    }
  }

  const getRatedTvShows = async () => {
    const accountId = userAccount && userAccount.id;
    const sessionId = logIn && logIn.sessionId;

    const response = await GetRatedTvShows(accountId,sessionId);
    if (!(response && response.status && response.status !== 200)) {
      setData(prevState=>({...prevState,
        ratedTvShows: response.results || [] }));

      setState(prevState=>(
        {...prevState,
          numberOfRatedTvShows: response.total_results}
          ))
    }
  }

  const getWatchlistTvShows = async () => {
    const accountId = userAccount && userAccount.id;
    const sessionId = logIn && logIn.sessionId;

    const response = await GetWatchlistTvShows(accountId,sessionId);
    if (!(response && response.status && response.status !== 200)) {
      setData(prevState=>({...prevState,
        watchlistTvShows: response.results || [] }));

    }
  }

  const getWatchlistMovies = async () => {
    const accountId = userAccount && userAccount.id;
    const sessionId = logIn && logIn.sessionId;

    const response = await GetWatchlistMovies(accountId,sessionId, activePage);
    if (!(response && response.status && response.status !== 200)) {
      setData(prevState=>({...prevState,
        watchlistMovies: response.results || [] }));
    }
  }

  const getFavoriteMovies = async () => {
    const accountId = userAccount && userAccount.id;
    const sessionId = logIn && logIn.sessionId;

    const response = await GetFavoriteMovies(accountId,sessionId, activePage);
    if (!(response && response.status && response.status !== 200)) {
      setData(prevState => ({
        ...prevState,
        favoriteMovies: response&&response.results || []
      }));

      setNumberOfPages(response&&response.total_pages)
    }
  }

  const createBarChartData = ()=>{
    
    if(barChartData.length==0&&data.ratedMovies&&data.ratedTvShows){
      const ratedData = [...data.ratedMovies, ...data.ratedTvShows]
      
    const filledChartData = ratedData.reduce((initialData, item)=>{
      initialData[item.rating].count = initialData[item.rating].count + 1;
      return initialData
    }, initialBarChartData)

    setBarChartData(Object.values(filledChartData))
  }
  }


  const createPieChartData = ()=>{
    if (pieChartData.length == 0 && data.watchlistMovies && data.watchlistTvShows) {
      const watchlistData = [...data.watchlistMovies, ...data.watchlistTvShows];

      // Genre IDs from TMDB:
      const dramaID = 28;
      const comedyID = 35;
      const actionID = 18;

      const filledChartData = watchlistData.reduce((initialData, item) => {
        const movieGenresIDs = item.genre_ids;

        const isDrama = movieGenresIDs.includes(dramaID);
        const isComedy = movieGenresIDs.includes(comedyID);
        const isAction = movieGenresIDs.includes(actionID);

        let genreID;

        if (isDrama) genreID = dramaID;
        else if (isComedy) genreID = comedyID;
        else if (isAction) genreID = actionID;
        else genreID = 0;

        initialData[genreID].value = initialData[genreID].value + 1;
        return initialData;
      }, initialPieChartData);

      setPieChartData(Object.values(filledChartData))
    }
  }

  useEffect(()=>{
    createBarChartData();
    createPieChartData();
  },[data])

  useEffect(()=>{
    getRatedTvShows();
    getRatedMovies();
    getWatchlistTvShows();
    getWatchlistMovies();
    setState(prevState => ({
      ...prevState,
      avatar: (userAccount?.avatar?.tmdb?.avatar_path) && (`${avatarFilePath}/${userAccount.avatar.tmdb.avatar_path}`)
    }))

  },[userAccount])

  useEffect(()=>{
    getFavoriteMovies();
  },[userAccount, activePage])
console.log('activePage', activePage);
  return (
    <div className="profile-page-wrapper">

      <div className="profile-cover">
        <div className="cover-content">
          <div className="avatar-placeholder" style={avatarStyle}/>
          <div className="profile-info">
            <div className="user-info-container">
              <div className="avatar-placeholder" style={avatarStyle}/>
              <p className="user-name">{state.name || state.username}</p>
            </div>
            <div className="rate-circles-container">
                {(data.ratedMovies&&data.ratedMovies.length >0)&&
              <div className="rate-circle-wrapper large-circle">
                <RateCircle percentage={getRatingAverage(data.ratedMovies)} size={"large"} />
                <span className="circle-title">Average Movie Rating</span>
              </div>
                }
              {(data.ratedMovies&&data.ratedMovies.length >0)&&
              <div className="rate-circle-wrapper small-circle">
                <RateCircle percentage={getRatingAverage(data.ratedMovies)} size={"small"} />
                <span className="circle-title">Average Movie Rating</span>
              </div> 
                }
              <span className="line-vertical-white"></span>
              {(data.ratedTvShows&&data.ratedTvShows.length >0)&&
              <div className="rate-circle-wrapper large-circle">
                <RateCircle percentage={getRatingAverage(data.ratedTvShows)} size={"large"} className="" />
                <span className="circle-title">Average TV Rating</span>
              </div>
               }
              {(data.ratedTvShows&&data.ratedTvShows.length >0)&&
              <div className="rate-circle-wrapper small-circle">
                <RateCircle percentage={getRatingAverage(data.ratedTvShows)} size={"small"} className="" />
                <span className="circle-title">Average TV Rating</span>
              </div>
              }
            </div>
          </div>
        </div>
      </div>

      <div className="status-wrapper">
        <div className="status-item">
          <p className="status-title">Total Ratings</p>
          <div className="status-content">
            <span className="number-status">{(state.numberOfRatedMovies+state.numberOfRatedTvShows)}</span>
          </div>
        </div>
        {
          pieChartData&&(pieChartData.length>0)&&
        <div className="status-item">
        <p className="status-title">Most Watched</p>
          <div className="status-pie">
              <PieChartComponent 
              data={pieChartData}
              />
          </div>
        </div>
        }
        <div className="status-item">
        <p className="status-title">Rating Overview</p>
          <div className="status-bar">
            {barChartData&&(barChartData.length>0)&&
              <BarChartComponent 
              data={barChartData}
              />
            }
          </div>
        </div>
      </div>

      <div className='favourites-container'>
        <p className='profile-heading'>My Favourite Movies</p>
        <div className='results-container'>
        {(data.favoriteMovies&&data.favoriteMovies.length>0&&data.favoriteMovies.map(item=>((item.media_type==="tv"||item.media_type==="movie"||!item.known_for)&&<Link to={getMoviePageUrl(item)}><ResultMediaCard
        data={item}/></Link>)||<ResultMediaCard 
        data={item}/>))||<p>You Still Have No Favourites .</p>}
      </div>
      <PaginationComponent
      activePage={activePage}
      setActivePage={setActivePage}
      numberOfPages={numberOfPages}
      />
      </div>
    </div>
  );
};
