import React from 'react'
import {IoMdArrowDropdown} from 'react-icons/io'


export function TopMenu() {
  return (

    <div className="top-menu">
      <div className="menu-item active-menu-item"><span>Overview</span><IoMdArrowDropdown viewBox="0 0 270 512"/></div>

      <div className="menu-item middle-item-1"><span>Media</span><IoMdArrowDropdown viewBox="0 0 270 512"/></div>
      
      <div className="menu-item middle-item-2"><span>Fandom</span><IoMdArrowDropdown viewBox="0 0 270 512"/></div>
      

      <div className="menu-item"><span>Share</span><IoMdArrowDropdown viewBox="0 0 270 512"/></div>
    </div>
  )
}
