import React, {useState, useRef} from 'react'
import {useNavigate } from 'react-router-dom'
import headerImagesList from '../assets/DataTemplates/header-images'

export function Header() {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState(null)
  
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); 
  }
  
  /* in headerImagesList object:  */
  /* images names are from cover1 to cover11 */
  let coverImageOrder = getRandomInt(1,11);

  const headerBackgroundStyle = useRef({
    /* to get random header image each time you refresh */
    background:`linear-gradient(to right, rgba(3,37,65, 0.8) 0%, rgba(3,37,65, 0) 100%), url(${headerImagesList[`cover${coverImageOrder}`]})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center top",
  })
  
  const changeSearchValueUrlForm = ()=>{
    return searchValue&&(searchValue.split(' ').join('+'))
  }


  const searchValueChangeHandler = (event)=>{
    const {value} = event.target;
    setSearchValue(value);
  }

  const searchButtonClickHandler = (event)=> {
    event.preventDefault();
    const urlSearchValue = changeSearchValueUrlForm();
    navigate(`/search?query=${urlSearchValue}`);
  }



  return (
    <header>
      <section className="home-search-container" style={headerBackgroundStyle.current}>
        <div className="home-search-content">
        <h2>Welcome.</h2>
        <h3>Millions of movies, TV shows and people to discover. Explore now.</h3>
          <form>
            <input type="text"
             name="" id="inputTextRef" 
             placeholder="Search for a movie, tv show, person......" 
             value={searchValue}
             onChange={searchValueChangeHandler} />
            <input type="submit"
             value="Search"
             onClick={searchButtonClickHandler}
             disabled={searchValue?false:true} />
          </form>
        </div>
      </section>
    </header>
  )
}
