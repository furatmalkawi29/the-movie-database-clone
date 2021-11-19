import React, {useEffect} from 'react'
import $ from 'jquery'

export default function CardsReel(props) {




  useEffect(()=>{
    /* best practice to put jquery inside useEffect */

    /* set default choice text color*/
    $('.choiceOne span').addClass('gradient-text');
    $('.selector-btn').css({"width": props.choiceOneWidth});


    $('.choiceOne').off().on("click", function(){
      /* move selector button*/
      $('.selector-btn').animate({left: '0'}, 180);

      /* change selector text color*/
      $('.choiceTwo span').removeClass("gradient-text");
      $('.choiceOne span').addClass("gradient-text");

      /* set selector button size*/
      $('.selector-btn').css({"width": props.choiceOneWidth});
    })



    $('.choiceTwo').off().on("click", function(){

      /* only reset in this case */
      if($('.selector-btn').css('left')==="0px"){

        /*reset left/right for next use*/
        $('.selector-btn').css({'right':"unset"})
        $('.selector-btn').css({'left':"unset"})
      }
        
        /* move selector button*/
        $('.selector-btn').animate({right: '0'}, 180);

        /* change selector text color*/
        $('.choiceOne span').removeClass("gradient-text");
        $('.choiceTwo span').addClass("gradient-text");

        /* set selector button size*/
        $('.selector-btn').css({"width": props.choiceTwoWidth});
      })
    

    
  })


  return (
    <section className="cards-reel">
      <div className="reel-top-container">
      <h2>{props.heading}</h2>
      <div className="selector">
        <div className="selector-btn"/>
        <div className="choiceOne">
          <span>{props.selectorChoices[0]}</span>
          </div>
        <div className="choiceTwo">
        <span>{props.selectorChoices[1]}</span>

        </div>
      </div>
      </div>
      <div className="cards-container">    
      </div>
    </section>
  )
}
