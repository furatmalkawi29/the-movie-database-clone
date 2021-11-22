import React, {useEffect, useState} from 'react'
import $ from 'jquery'
import MovieCard from './MovieCard';
import { IoIosArrowDown } from "react-icons/io";
import TrailerCard from './TrailerCard';

export default function CardsReel(props) {

  let trailerCardCont = props.customClasses?props.customClasses[0]:'';


  const [indexOne, setIndexOne] = useState(0);
  const [indexTwo, setIndexTwo] = useState(1);


  function swapSelectorChoices(){

    if(!indexOne){
      setIndexOne(1);
      setIndexTwo(0);
    }else{
        setIndexOne(0);
      setIndexTwo(1);    
    }
  }

  useEffect(()=>{
    /* best practice to put jquery inside useEffect */


    /* set default choice text color*/
    $(`#choiceOne-${props.reelId} span`).addClass('gradient-text');
    $(`#selector-btn-${props.reelId}`).css({"width": props.choiceOneWidth});


    $(`#choiceOne-${props.reelId}`).off().on("click", function(){
      /* move selector button*/
      $(`#selector-btn-${props.reelId}`).animate({left: '0'}, 180);


      /* change selector text color*/
      if(props.reelId!=='3'){
        $(`#choiceTwo-${props.reelId} span`).removeClass("gradient-text");
        $(`#choiceOne-${props.reelId} span`).addClass("gradient-text");
        console.log('000000');
      }else{
        /* change selector text color in trailers section */
        $(`#choiceTwo-${props.reelId} span`).removeClass("dark-blue-text");
        $(`#choiceOne-${props.reelId} span`).removeClass("white-text");
        console.log('11111');
      }
        
      
      /* set selector button size*/
      $(`#selector-btn-${props.reelId}`).css({"width": props.choiceOneWidth});
    })




    $(`#choiceTwo-${props.reelId}`).off().on("click", function(){

      /* only reset in this case */
      if($(`#selector-btn-${props.reelId}`).css('left')==="0px"){

        /*reset left/right for next use*/
        $(`#selector-btn-${props.reelId}`).css({'right':"unset"})
        $(`#selector-btn-${props.reelId}`).css({'left':"unset"})
      }
        
        /* move selector button*/
        $(`#selector-btn-${props.reelId}`).animate({right: '0'}, 180);


        /* change selector text color*/
        if(props.reelId!=="3"){
          $(`#choiceOne-${props.reelId} span`).removeClass("gradient-text");
          $(`#choiceTwo-${props.reelId} span`).addClass("gradient-text");
        }else{
        /* change selector text color in trailers section */
        $(`#choiceOne-${props.reelId} span`).addClass("white-text");
        $(`#choiceTwo-${props.reelId} span`).addClass("dark-blue-text");
        }

        /* set selector button size*/
        $(`#selector-btn-${props.reelId}`).css({"width": props.choiceTwoWidth});
      })
      
      

      
      $(`#sm-choiceTwo-${props.reelId}`).hide();
      
      /*small screen selector */
      $(`#sm-choiceOne-${props.reelId}`).on("click",function(){
        if($(`#sm-choiceTwo-${props.reelId}`).css("display")==="none"){
          $(`#sm-choiceTwo-${props.reelId}`).show();
          $(this).css("width",props.smChoiceTwoWidth);
          $(`#sm-choiceTwo-${props.reelId}`).css("width",props.smChoiceTwoWidth);
        }else{          
          $(`#sm-choiceTwo-${props.reelId}`).hide();
          $(this).css("width","max-content");
        }
      })

      $(`#sm-choiceTwo-${props.reelId}`).on("click",function(){
        swapSelectorChoices();
      })
  })


  return (
    <section id={`cards-reel-${props.reelId}`} className='cards-reel' >
      <div className="reel-top-container">
      <h2>{props.heading}</h2>

       {/* large screen selector */}
      <div className="selector">
        <div id={`selector-btn-${props.reelId}`} className="selector-btn"/>
        <div id={`choiceOne-${props.reelId}`} className="choiceOne">
          <span>{props.selectorChoices[0]}</span>
          </div>
        <div id={`choiceTwo-${props.reelId}`} className="choiceTwo">
        <span>{props.selectorChoices[1]}</span>
        </div>
      </div>


       {/* small screen selector */}
      <div id={`sm-selector-${props.reelId}`} className="sm-selector">
        <div id={`sm-choiceOne-${props.reelId}`} className="sm-choiceOne">
          <span>{props.selectorChoices[indexOne]}</span>
          <IoIosArrowDown/>
          </div>
        <div id={`sm-choiceTwo-${props.reelId}`} className="sm-choiceTwo" >
        <span>{props.selectorChoices[indexTwo]}</span>
        </div>
      </div>


  
      </div>
      <div className={`cards-container ${trailerCardCont}`}>
        {/* <MovieCard id="1"/>
        <MovieCard id="2"/>
        <MovieCard id="3"/>
        <MovieCard id="4"/>
        <MovieCard id="5"/>
        <MovieCard id="6"/>
        <MovieCard id="7"/>
        <MovieCard id="8"/>
      <MovieCard id="9"/>
      <MovieCard id="10"/> */}
        <TrailerCard cover="https://www.themoviedb.org/t/p/w1920_and_h427_multi_faces/eyG9srihv68ScRdEbJZj66WT4O0.jpg" thum="https://www.themoviedb.org/t/p/w355_and_h200_multi_faces/eyG9srihv68ScRdEbJZj66WT4O0.jpg" id="1"/>
        <TrailerCard cover="https://www.themoviedb.org/t/p/w1920_and_h427_multi_faces/iW74tZ8y2qobdpt4J9UQ71sw8q7.jpg" thum="https://www.themoviedb.org/t/p/w355_and_h200_multi_faces/iW74tZ8y2qobdpt4J9UQ71sw8q7.jpg" id="2"/>
        <TrailerCard cover="https://www.themoviedb.org/t/p/w1920_and_h427_multi_faces/iW74tZ8y2qobdpt4J9UQ71sw8q7.jpg" thum="https://www.themoviedb.org/t/p/w355_and_h200_multi_faces/iW74tZ8y2qobdpt4J9UQ71sw8q7.jpg" id="3"/>
        <TrailerCard cover="https://www.themoviedb.org/t/p/w1920_and_h427_multi_faces/iW74tZ8y2qobdpt4J9UQ71sw8q7.jpg" thum="https://www.themoviedb.org/t/p/w355_and_h200_multi_faces/iW74tZ8y2qobdpt4J9UQ71sw8q7.jpg" id="4"/>
        <TrailerCard cover="https://www.themoviedb.org/t/p/w1920_and_h427_multi_faces/iW74tZ8y2qobdpt4J9UQ71sw8q7.jpg" thum="https://www.themoviedb.org/t/p/w355_and_h200_multi_faces/iW74tZ8y2qobdpt4J9UQ71sw8q7.jpg" id="5"/>

      </div>
    </section>
  )
}
