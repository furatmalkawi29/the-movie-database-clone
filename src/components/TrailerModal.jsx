import React, {useEffect, useState} from 'react'
import { IoCloseSharp } from "react-icons/io5";
import $ from 'jquery'

export default function TrailerModal(props) {





  useEffect(()=>{

    $('.close-icon').on("click",function(){
/* close modal */
props.changeModalVisibility();

/* return original colors */
$("header,footer,.cards-reel,.join-banner").removeClass("grayscale-filter");
    });    

})
  
  return (
    <div className="trailer-modal">
      <div className="trailer-modal-title" >
        <h3>Season 2 Announcement</h3>
        <IoCloseSharp className="close-icon"/>
      </div>
<iframe  src={`${props.trailerUrl && props.trailerUrl}?autoplay=1&mute=1`}>

</iframe>
    </div>
  )
}