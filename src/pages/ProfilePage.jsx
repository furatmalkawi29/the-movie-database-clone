import React from 'react'
import { RateCircle } from '../components'


export const ProfilePage = ({ }) => {

    return (
        <div className='profile-page-wrapper'>
            <div className='profile-cover-wrapper'>
                <div className='profile-cover-content'>
                    <div className='profile-image-container'>
                        {/* <img src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png' /> */}
                    </div>

                    <div className='profile-cover-info-container'>
                        <p className='user-name'>FuratFofo</p>
                        <div className='progress-circles-container'>
                            <div className="rate-circle-wrapper large-circle">
                                <RateCircle percentage={57} size={"large"} className="" />
                                <span className="circle-title">Average Movie Score</span>
                            </div>
                            <div className="rate-circle-wrapper large-circle">
                                <RateCircle percentage={71} size={"large"} className="" />
                                <span className="circle-title">Average TV Score</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
