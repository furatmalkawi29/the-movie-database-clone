import React, {useEffect} from 'react';
import {FaHeart} from 'react-icons/fa';
import {ImList2} from 'react-icons/im';
import {IoBookmark} from 'react-icons/io5';
import {AiFillStar} from 'react-icons/ai';
import $ from 'jquery';

export const BottomMenu = () => {

  useEffect(()=>{
    var previousScroll = 0;

    $(window).on('scroll', function(){
       var currentScroll = $(this).scrollTop();
       if (currentScroll > previousScroll){
           $('.bottom-menu-wrapper').removeClass('menu-padding');
       } else {
        $('.bottom-menu-wrapper').addClass('menu-padding');
      }
       previousScroll = currentScroll;
    });
  })
  return (
    <div className="bottom-menu-wrapper">
      <div className="bottom-menu">
       <div><ImList2/></div>
          <div><FaHeart/></div>
          <div><IoBookmark/></div>
          <div><AiFillStar/></div>
      </div>
    </div>
  )
}
