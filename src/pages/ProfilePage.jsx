import React from "react";
import { RateCircle } from "../components";
import {MyResponsivePie} from '../components'
import {MyResponsiveBar} from '../components'

export const ProfilePage = ({}) => {
  return (
    <div className="profile-page-wrapper">
      <div className="profile-cover-wrapper">
        <div className="profile-cover-content">
          <div className="profile-image-placeholder"></div>
          {/* <img src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png' /> */}

          <div className="profile-cover-info-container">
            <div className="user-name-container">
              <div className="profile-image-placeholder"></div>
              {/* <img src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png' /> */}
              <p className="user-name">FuratFofo</p>
            </div>
            <div className="progress-circles-container">
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
      <div className="profile-status-wrapper">
        <div className="profile-status-item">
          <p className="profile-status-title">Total Ratings</p>
          <div className="profile-status-content">
            <span className="number-status">21</span>
          </div>
        </div>
        <div className="profile-status-item">
          <p className="profile-status-title">Rating Overview</p>
          <div className="profile-status-content">
          <div className='test2'>
            <MyResponsivePie/>
          </div>
          </div>
        </div>
        <div className="profile-status-item">
          <p className="profile-status-title">Most Watched Genres</p>
          <div className="profile-status-content">
          <div className='test1'>
            <MyResponsiveBar/>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};
