import React from "react";
import { LogosEnums, } from "../Enums";
export const Footer =() => {
  return (
    <footer>

      <div className='footer-wrapper'>
      <div className="image-part">
        <img src={LogosEnums.tmdLogo.Img}/>
      </div>

<div className="footer-links">
      <div>
        <h2>THE BASICS</h2>
        <ul>
          <li>About TMDB</li>
          <li>Contact Us</li>
        </ul>
      </div>

      <div>
        <h2>COMMUNITY</h2>
        <ul>
          <li>Guidelines</li>
          <li>Discussions</li>
        </ul>
      </div>

      <div>
        <h2>LEGAL</h2>
        <ul>
          <li>Terms of Use</li>
        </ul>
      </div>
      </div>
      </div>
    </footer>
  );
}
