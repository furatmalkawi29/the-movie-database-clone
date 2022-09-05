import React, { useState } from "react";
import { Link } from "react-router-dom";
import { DropdownMenu } from "../components";
import { LogosEnums, AssetImagesEnums } from '../Enums';
import { ClickAwayListener } from "@mui/material";
import { useSelector } from 'react-redux';
import $ from 'jquery'


export const Navbar = () => {

  const [activeNavItem, setActiveNavItem] = useState(null)
  const { logIn } = useSelector(state => state);
  /*stop() used to clear animation queue to prevent delay */
  $(window).on("scroll", function () {
    if ($(window).scrollTop() > 80 && $('.lg-nav-container').css("top") === "0px") {
      $('.lg-nav-container').stop().animate({ top: '-170' }, 500);
    } else if ($(window).scrollTop() < 80 && $('.lg-nav-container').css("top") === "-170px") {
      $('.lg-nav-container').stop().animate({ top: '0' }, 500);
    }
  })

  const navItemClickHandler = (event) => {
    const value = event.target.id;
    setActiveNavItem(value)
  }

  const handleClickAway = () => {
    setActiveNavItem(null);
  };

  return (
    <nav className="lg-nav">
      <div className="lg-nav-container">
        <div className="nav-left-part">
          <Link to="/">
            <img className="nav-logo" src={LogosEnums.blueShortLogo.Img} />
          </Link>
          <ClickAwayListener onClickAway={handleClickAway}>
          <div className="nav-items-container">
            <div>
              <span id="1" onClick={navItemClickHandler}>Movies</span>
              {activeNavItem == '1' &&
                <DropdownMenu
                  content={[
                    "Popular",
                    "Now Playing",
                    "Upcoming",
                    "Top Rated",
                  ]}
                  menuClass="movies-menu"
                />
              }
            </div>
            
            <div>
              <span id="2" onClick={navItemClickHandler}>TV Shows</span>
              {activeNavItem === '2' &&
                <DropdownMenu
                  content={[
                    "Popular",
                    "Airing Today",
                    "On TV",
                    "Top Rated",
                  ]}
                  menuClass="tv-shows-menu"
                />
              }
            </div>
            <div>
              <span id="3" onClick={navItemClickHandler}>People</span>
              {activeNavItem === '3' &&
                <DropdownMenu
                  content={["Popular People"]}
                  menuClass="people-menu"
                />
              }
            </div>
            <div>
              <span id="4" onClick={navItemClickHandler}>More</span>
              {activeNavItem === '4' &&
                <DropdownMenu
                  content={[
                    "Discussions",
                    "Leaderboard",
                    "Support",
                    "API",
                  ]}
                  menuClass="more-menu"
                />
              }
            </div>
          </div>
            </ClickAwayListener>
        </div>

        <div className="nav-right-part">
          <div>
            {/* <Link> */}
            <img className="plus" src={AssetImagesEnums.plus.Img} />
            {/* </Link> */}
          </div>
          <div>
            <span>EN</span>
          </div>
          {logIn && !logIn.isLoggedIn && (
          <div>
            <Link to="/login">Login</Link>
          </div>
          )}
          <div>
            <a>Join TMDB</a>
            {/* <Link to="">Join TMDB</Link> */}
          </div>
          <div>
            <img className="magnifier" src={AssetImagesEnums.magnifier.Img} />
          </div>
        </div>
      </div>
    </nav>
  );
}
