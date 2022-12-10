import React from "react";
import { Link } from 'react-router-dom'
import $ from 'jquery'

export const SideMenu = () => {

  
/*off method removes all events from element*/
  $(".side-menu-1").off("click").on("click",function(){
    $(".side-menu-content-1").toggle();
  })
  $(".side-menu-2").off("click").on("click",function(){
    $(".side-menu-content-2").toggle();
  })
  $(".side-menu-3").off("click").on("click",function(){
    $(".side-menu-content-3").toggle();
  })

  
  return (
    <div className="side-menu">
      <div>
        <span className="side-menu-1">Movies</span>
        <div className="side-menu-content-1">
          <Link to="">Popular</Link>
          <Link to="">Upcoming</Link>
          <Link to="">Now Playing</Link>
        </div>
        </div>
      <div>
        <span className="side-menu-2">TV Shows</span>
        <div className="side-menu-content-2">
          <Link to="">Popular</Link>
          <Link to="">Top Rated</Link>
          <Link to="">On TV</Link>
        </div>
        </div>

        <div className="menu-outer-link">
        <Link to="/login">Login</Link>
        </div>
    </div>
  )
}
