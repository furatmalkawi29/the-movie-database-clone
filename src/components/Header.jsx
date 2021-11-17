import React, {useState,useEffect} from 'react'
import Navbar from './Navbar'
import NavbarSmallScreen from './NavbarSmallScreen'
import $ from 'jquery';


export default function Header() {

  const [placeholderText, setPlaceholderText] = useState("Search for a movie, tv show, person......")

  let style ={
    background:`linear-gradient(to right, rgba(3,37,65, 0.8) 0%, rgba(3,37,65, 0) 100%), url('https://www.themoviedb.org/t/p/w1920_and_h600_multi_faces_filter(duotone,032541,01b4e4)/34OGjFEbHj0E3lE2w0iTUVq0CBz.jpg')`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center top",
  }




 useEffect(()=>{
  if($(window).width()<=550){
    setPlaceholderText("Search...")
  } else {
        setPlaceholderText("Search for a movie, tv show, person......") 
      } 
 },[]) 



  /*change placeholder when resizing to small screens */
  $(window).on('resize', function(){
    if($(this).width()<=550){
      setPlaceholderText("Search...")
    } else {
          setPlaceholderText("Search for a movie, tv show, person......") 
        } 
  })



  return (
    <header>
      <Navbar/>
      <NavbarSmallScreen/>
      <section className="home-search-container" style={style}>
        <div className="home-search-content">
        <h2>Welcome.</h2>
        <h3>Millions of movies, TV shows and people to discover. Explore now.</h3>
          <form>
            <input type="text" name="" id="" placeholder={placeholderText} />
            <input type="submit" value="Search" />
          </form>
        </div>
      </section>
    </header>
  )
}
