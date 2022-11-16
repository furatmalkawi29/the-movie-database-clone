import React, { useState } from "react";
import { useSelector } from 'react-redux';
import { RateCircle } from "../components";
import { MyResponsivePie } from '../components'
import { MyResponsiveBar } from '../components'

export const ProfilePage = ({ }) => {

  const { logIn, userAccount } = useSelector((state) => state);
  
  const avatarFilePath = `https://www.themoviedb.org/t/p/w150_and_h150_face`
  
  const defaultState = {
    username: userAccount?.username,
    name: userAccount?.name,
    avatar: (userAccount?.avatar?.tmdb?.avatar_path) && (`${avatarFilePath}/${userAccount.avatar.tmdb.avatar_path}`)
  }
  
  const [state] = useState(defaultState)

  const avatarStyle = {
    background: (state.avatar && `url(${state.avatar})`) || `rgb(1 210 119)`
  }

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
              <div className="rate-circle-wrapper large-circle">
                <RateCircle percentage={57} size={"large"} />
                <span className="circle-title">Average Movie Score</span>
              </div>
              <div className="rate-circle-wrapper small-circle">
                <RateCircle percentage={57} size={"small"} />
                <span className="circle-title">Average Movie Score</span>
              </div>
              <span className="line-vertical-white"></span>
              <div className="rate-circle-wrapper large-circle">
                <RateCircle percentage={71} size={"large"} className="" />
                <span className="circle-title">Average TV Score</span>
              </div>
              <div className="rate-circle-wrapper small-circle">
                <RateCircle percentage={71} size={"small"} className="" />
                <span className="circle-title">Average TV Score</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="status-wrapper">
        <div className="status-item">
          <p className="status-title">Total Ratings</p>
          <div className="status-content">
            <span className="number-status">21</span>
          </div>
        </div>
        <div className="status-item">
          <p className="status-title">Rating Overview</p>
          <div className="status-pie">
              <MyResponsivePie />
          </div>
        </div>
        <div className="status-item">
          <p className="status-title">Most Watched Genres</p>
          <div className="status-bar">
              <MyResponsiveBar />
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
