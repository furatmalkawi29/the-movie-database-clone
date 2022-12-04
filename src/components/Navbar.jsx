import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import $ from 'jquery'
import { ClickAwayListener } from "@mui/material";
import { DropdownMenu } from "../components";
import { LogosEnums, AssetImagesEnums } from '../Enums';
import { DeleteSession } from '../Services';
import { FiLogOut } from "react-icons/fi";
import { userLogout } from '../Redux/Actions/LogoutAction'

export const Navbar = () => {

  /*stop() used to clear animation queue to prevent delay */
  $(window).on("scroll", function () {
    if ($(window).scrollTop() > 80 && $('.lg-nav-container').css("top") === "0px") {
      $('.lg-nav-container').stop().animate({ top: '-170' }, 500);
    } else if ($(window).scrollTop() < 80 && $('.lg-nav-container').css("top") === "-170px") {
      $('.lg-nav-container').stop().animate({ top: '0' }, 500);
    }
  })

  const avatarFilePath = `https://www.themoviedb.org/t/p/w32_and_h32_face`

  const { logIn, userAccount } = useSelector(state => state);
  const [activeNavItem, setActiveNavItem] = useState(null)
  const [isLogoutPopupOpen, setIsLogoutPopupVisable] = useState(false)
  const [avatarFile] = useState((userAccount?.avatar?.tmdb?.avatar_path))
  const dispatch = useDispatch();


  const avatarStyle = {
    background: (avatarFile && `url(${avatarFilePath}/${avatarFile})`) || `rgb(1 210 119)`
  }

  const deleteSession = async () => {

    const sessionId = logIn && logIn.sessionId;
    const body = {
        data: {
            session_id: (sessionId || logIn?.sessionId),
        },
    }
    const response = await DeleteSession(body);

    if (!(response && response.status && response.status !== 200)) {
        localStorage.removeItem('app_session')
    }

}

  const navItemClickHandler = (event) => {
    const value = event.target.id;
    setActiveNavItem(value)
  }

  const handleClickAway = () => {
    setActiveNavItem(null);
  };

  const showLogoutPopup = () => {
    setIsLogoutPopupVisable(prevState=> !prevState);
  };

  const handleLogoutClick = () => {
    
    setIsLogoutPopupVisable(prevState=> !prevState);
    
    dispatch(
      userLogout({
          sessionId: null,
      }))

    deleteSession();
    
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
          {logIn && !logIn.isLoggedIn && (
            <div>
              <Link to="/login">
                <img className="sm-user-icon" src={AssetImagesEnums.maleUser.Img} />
                <span>Login</span>
              </Link>
            </div>
          ) || (
            <>
              <div onClick={showLogoutPopup}>
                <Link to="/profile">
                  <div className='user-avatar' title='View Profile' style={avatarStyle} />
                </Link>
              </div>
              {isLogoutPopupOpen &&
              <div className='logout-menu' onClick={handleLogoutClick}>
                <div>Logout <FiLogOut/></div>
              </div>
              }
            </>
            )}
          <div>
            <img className="magnifier" src={AssetImagesEnums.magnifier.Img} />
          </div>
        </div>
      </div>
    </nav>
  );
}
