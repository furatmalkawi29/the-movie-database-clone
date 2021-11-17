import React from "react";
import mobileNavLogo from "../assets/images/mobile-logo.svg";
import magnifier from "../assets/images/magnifier.svg";
import maleUser from "../assets/images/male-user.png";
import SideMenu from "./SideMenu";
import { Link } from "react-router-dom";
import $ from 'jquery';

export default function NavbarSmallScreen() {

  /*side menu toggle*/
  $('.menu-icon-container').off('click').on("click",function(){
    console.log('clicked');
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



  return (
    <nav className="sm-nav">
     <div className="sm-nav-container">
      <div className="menu-icon-container">
        <Link to="">
        <svg viewBox="0 0 100 80" width="15" height="15" fill="white">
          <rect width="100" height="16" rx="5"></rect>
          <rect y="35" width="100" height="16" rx="5"></rect>
          <rect y="70" width="100" height="16" rx="5"></rect>
        </svg>
        </Link>
      </div>
      <img className="sm-nav-logo" src={mobileNavLogo} />
      <div className="sm-icons-container">
        <img className="sm-magnifier" src={maleUser} />
        <img className="sm-magnifier" src={magnifier} />
      </div>

      <SideMenu/>
      </div>
    </nav>
  );
}
