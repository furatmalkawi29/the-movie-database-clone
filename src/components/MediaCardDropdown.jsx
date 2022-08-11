import React, {useState} from 'react'
import { AssetImagesEnums } from '../Enums'
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { IconsEnums } from '../Enums';
import { MarkAsFavorite, AddToWatchlist } from '../Services'
import {RatingPanel} from '../components'

export const MediaCardDropdown = ({
  mediaId,
  mediaType
}
) => {

  const { logIn, userAccount } = useSelector(state => state);
  const [mediaRating, setMediaRating] = useState(null)

  const markAsFavorite = async () => {

    const accountId = userAccount && userAccount.id;
    const sessionId = logIn && logIn.sessionId;

    const body = {
      media_type: mediaType,
      media_id: mediaId,
      favorite: true
    }
    await MarkAsFavorite(accountId, sessionId, body);
    // const response = await MarkAsFavorite(accountId,sessionId, body);

    // if (!(response && response.status && response.status !== 200)) {
    // setIsValidated(true);
    // createSession(requestToken);
    // } else{
    // setIsValidated(false);
    // }
  }
  const addToWatchList = async () => {

    const accountId = userAccount && userAccount.id;
    const sessionId = logIn && logIn.sessionId;

    const body = {
      media_type: mediaType,
      media_id: mediaId,
      watchlist: true
    }
    await AddToWatchlist(accountId, sessionId, body);

  }

  return (
    logIn && logIn.isLoggedIn && (
      <div className="movie-card-dropdown actions-dropdown">
        <div className='dropdown-action-item' onClick={markAsFavorite}>
          <div className='action-icon'>
            <img src={IconsEnums.heartIcon.Img} />
          </div>
          <span>Favorite</span>
        </div>
        <div className='dropdown-action-item' onClick={addToWatchList}>
          <div className='action-icon'>
            <img src={IconsEnums.bookmarkIcon.Img} />
          </div>
          <span>Watchlist</span>
        </div>
        <div className='dropdown-action-item last-action-item'>
          <div className='action-icon'>
            <img src={IconsEnums.star.Img} />
          </div>
          <span>Rate</span>
        </div>
      <RatingPanel
      mediaRating={mediaRating}
      setMediaRating={(value)=>{
        setMediaRating(value)
      }}
      />
      </div>) ||
    (<div className="movie-card-dropdown login-dropdown">
      <div className="first-box">
        <h3>Want to rate or add this item to a list?</h3>
        <Link to="/login">
          <div>
            <p>Login</p>
            <img src={AssetImagesEnums.leftArrow.Img} />
          </div>
        </Link>
      </div>
      <div className="second-box">
        <h3>Not a member?</h3>
        <div><p>Sign up and join the community</p><img src={AssetImagesEnums.leftArrow.Img} /></div>
      </div>
    </div>)
  )
}
