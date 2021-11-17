import React from "react";
import { Link } from 'react-router-dom'
import $ from 'jquery'

export default function SideMenu() {

  
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
          <Link to="">Top Rated</Link>
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
          <Link to="">Airing Today</Link>
        </div>
        </div>
      <div>
        <span className="side-menu-3">People</span>
        <div className="side-menu-content-3">
          <Link to="">Popular People</Link>
        </div>
        </div>

        <div className="menu-outer-link">
        <Link to="">Contribution Bible</Link>
        <Link to="">Apps</Link>
        <Link to="">Discussions</Link>
        <Link to="">Leadboard</Link>
        <Link to="">Contribute</Link>
        <Link to="">API</Link>
        <Link to="">Support</Link>
        <Link to="">About</Link>
        <Link to="">Login</Link>
        </div>
    </div>
  )
}
