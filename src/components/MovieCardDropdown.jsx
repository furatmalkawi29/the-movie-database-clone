import React from 'react'
import { AssetImagesEnums } from '../Enums'

export const MovieCardDropdown =() => {
  return (
    <div className="movie-card-dropdown">
      <div className="first-box">
        <h3>Want to rate or add this item to a list?</h3>
        <div><p>Login</p><img src={AssetImagesEnums.leftArrow.Img}/></div>
      </div>
      <div className="second-box">
        <h3>Not a member?</h3>
        <div><p>Sign up and join the community</p><img src={AssetImagesEnums.leftArrow.Img}/></div>
      </div>
    </div>
  )
}
