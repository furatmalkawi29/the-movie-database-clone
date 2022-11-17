import React, {useState, useEffect} from "react";
import {SideMenu} from "../components";
import { Link } from "react-router-dom";
import { AssetImagesEnums, LogosEnums } from '../Enums';
import { useSelector } from 'react-redux';
import $ from 'jquery';


export const NavbarSmallScreen =() => {
  
  /*side menu toggle*/
  $('.menu-icon-container').off('click').on("click",function(){
    if($('.side-menu').css("left")==="0px"){
      $('.side-menu').stop().animate({left:'-1000'},600);
    }else{
      $('.side-menu').stop().animate({left:'0'},600);
    }
  })

/* hide navbar on scroll */
$(window).on("scroll",function(){
  if($(window).scrollTop()>70 && $('.sm-nav-container').css("top")==="0px"){
    $('.sm-nav-container').stop().animate({top:'-170'},500);
  }else if($(window).scrollTop()<70 && $('.sm-nav-container').css("top")==="-170px"){
    $('.sm-nav-container').stop().animate({top:'0'},500);
  }
})

const avatarFilePath = `https://www.themoviedb.org/t/p/w32_and_h32_face`

const { logIn, userAccount } = useSelector(state => state);
const [avatarFile,setAvatarFile] = useState((userAccount?.avatar?.tmdb?.avatar_path))

const avatarStyle = {
  background: (avatarFile && `url(${avatarFilePath}/${avatarFile})`) || `rgb(1 210 119)`
}

useEffect(()=>{
  setAvatarFile((userAccount?.avatar?.tmdb?.avatar_path))
},[userAccount])

  return (
    <nav className="sm-nav">
     <div className="sm-nav-container">
      <div className="menu-icon-container">
        <svg viewBox="0 0 100 80" width="15" height="15" fill="white">
          <rect width="100" height="16" rx="5"></rect>
          <rect y="35" width="100" height="16" rx="5"></rect>
          <rect y="70" width="100" height="16" rx="5"></rect>
        </svg>
      </div>
      <Link to="/">
      <img className="sm-nav-logo" src={LogosEnums.mobileNavLogo.Img} />
      </Link>
      <div className="sm-icons-container">
      {logIn && !logIn.isLoggedIn && (
        <Link to="/login">
          <img className="sm-user-icon" src={AssetImagesEnums.maleUser.Img} />
        </Link>
          )||(
        <Link to="/profile">
          <div className='user-avatar' style={avatarStyle}/>
        </Link>
          )}
        <img className="sm-magnifier" src={AssetImagesEnums.magnifier.Img} />
      </div>

      <SideMenu/>
      </div>
    </nav>
  );
}
