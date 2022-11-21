import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { RateCircle, PieChartComponent, BarChartComponent } from '../components'
import {GetRatedTvShows, GetRatedMovies} from '../Services'
import {initialChartData} from '../assets/DataTemplates/initialChartData'
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
  const [chartData, setChartData] = useState([])
  const [data, setData] = useState({
    ratedMovies: null,
    ratedTvShows: null,
  })

  const avatarStyle = {
    background: (state.avatar && `url(${state.avatar})`) || `rgb(1 210 119)`
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

  const createBarChartData = ()=>{
    
    if(chartData.length==0&&data.ratedMovies&&data.ratedTvShows){
      const ratedData = [...data.ratedMovies, ...data.ratedTvShows]
      
    const filledChartData = ratedData.reduce((initialData, item)=>{
      initialData[item.rating].count = initialData[item.rating].count + 1;
      return initialData
    }, initialChartData)

    setChartData(Object.values(filledChartData))
  }
  }

  useEffect(()=>{
    createBarChartData()
  },[data])

  useEffect(()=>{
    getRatedTvShows();
    getRatedMovies();
    setState(prevState=>({...prevState,
      avatar:(userAccount?.avatar?.tmdb?.avatar_path) && (`${avatarFilePath}/${userAccount.avatar.tmdb.avatar_path}`)
    }))

  },[userAccount])


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
          chartData&&(chartData.length>0)&&
        <div className="status-item">
        <p className="status-title">Most Watched Genres</p>
          <div className="status-pie">
              <PieChartComponent />
          </div>
        </div>
        }
        <div className="status-item">
        <p className="status-title">Rating Overview</p>
          <div className="status-bar">
              <BarChartComponent 
              data={chartData}
              />
          </div>
        </div>
      </div>

      <div>
        <p>My Watchlist</p>
        <div className="wishlist-wrapper">

        </div>
      </div>
    </div>
  );
};
