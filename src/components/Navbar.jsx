import React from "react";
import { Link } from "react-router-dom";
import blueShortLogo from "../assets/images/blue_short-logo.svg";
import plus from "../assets/images/plus.svg";
import magnifier from "../assets/images/magnifier.svg";
import {DropdownMenu} from "../components";
import $ from 'jquery'

export const Navbar = () => {


/*stop() used to clear animation queue to prevent delay */
  $(window).on("scroll",function(){
    if($(window).scrollTop()>80 && $('.lg-nav-container').css("top")==="0px"){
    $('.lg-nav-container').stop().animate({top:'-170'},500);
  }else if($(window).scrollTop()<80 && $('.lg-nav-container').css("top")==="-170px"){
    $('.lg-nav-container').stop().animate({top:'0'},500);
  }
  })

  return (
      <nav className="lg-nav">
    <div className="lg-nav-container">
      <div className="nav-left-part">
      <Link to="">
        <img className="nav-logo" src={blueShortLogo} />
      </Link>
        <div className="nav-items-container">
          <div className="menu-1">
            <Link to="">Movies</Link>
            <DropdownMenu
              content={[
                "Popular,/",
                "Now Playing,/",
                "Upcoming,/",
                "Top Rated,/",
              ]}
              menuClass="movies-menu"
            />
          </div>
          <div className="menu-2">
            <Link to="">TV Shows</Link>
            <DropdownMenu
              content={[
                "Popular,/",
                "Airing Today,/",
                "On TV,/",
                "Top Rated,/",
              ]}
              menuClass="tv-shows-menu"
            />
          </div>
          <div className="menu-3">
            <Link to="">People</Link>
            <DropdownMenu
              content={["Popular People,/"]}
              menuClass="people-menu"
            />
          </div>
          <div className="menu-4">
            <Link to="">More</Link>
            <DropdownMenu
              content={[
                "Discussions,/",
                "Leaderboard,/",
                "Support,/",
                "API,/",
              ]}
              menuClass="more-menu"
            />
          </div>
        </div>
      </div>

      <div className="nav-right-part">
        <div>
          <Link to="">
            <img className="plus" src={plus} />
          </Link>
        </div>
        <div>
          <span>EN</span>
        </div>
        <div>
          <Link to="">Login</Link>
        </div>
        <div>
          <Link to="">Join TMDB</Link>
        </div>
        <div>
          <img className="magnifier" src={magnifier} />
        </div>
      </div>
    </div>
      </nav>
  );
}
