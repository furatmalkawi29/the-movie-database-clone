import React from "react";
import { LogosEnums, } from "../Enums";
export const Footer =() => {
  return (
    <footer>

      <div className='footer-wrapper'>
      <div className="image-part">
        <img src={LogosEnums.tmdLogo.Img}/>
        <button>JOIN THE COMMUNITY</button>
      </div>

<div className="footer-links">
      <div>
        <h2>THE BASICS</h2>
        <ul>
          <li>About TMDB</li>
          <li>Contact Us</li>
          <li>Support Forums</li>
          <li>API</li>
          <li>System Status</li>
        </ul>
      </div>

      <div>
        <h2>GET INVOLVED</h2>
        <ul>
          <li>Contribution Bible</li>
          <li>3rd Party Applications</li>
          <li>Add New Movie</li>
          <li>Add New TV Show</li>
        </ul>
      </div>

      <div>
        <h2>COMMUNITY</h2>
        <ul>
          <li>Guidelines</li>
          <li>Discussions</li>
          <li>Leaderboard</li>
          <li>Twitter</li>
        </ul>
      </div>

      <div>
        <h2>LEGAL</h2>
        <ul>
          <li>Terms of Use</li>
          <li>API Terms of Use</li>
          <li>Privacy Policy</li>
        </ul>
      </div>
      </div>
      </div>
    </footer>
  );
}
