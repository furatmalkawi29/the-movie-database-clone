import React, {useState,useEffect} from 'react'
import NavbarSmallScreen from './NavbarSmallScreen'
import $ from 'jquery';
import headerImagesList from '../assets/export/header-images'

export default function Header() {

  const [placeholderText, setPlaceholderText] = useState("Search for a movie, tv show, person......")


  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); 
  }

  /* in headerImagesList object:  */
  /* images names are from cover1 to cover11 */
  let randomNumber = getRandomInt(1,11)




  let style ={
    /* to get random header image each time you refresh */
    background:`linear-gradient(to right, rgba(3,37,65, 0.8) 0%, rgba(3,37,65, 0) 100%), url(${headerImagesList[`cover${randomNumber}`]})`,
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
