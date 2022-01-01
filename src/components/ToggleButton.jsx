import React, {useState, useEffect} from 'react'
import { IoIosArrowDown } from "react-icons/io";
import $ from 'jquery'

export default function ToggleButton(props) {

  const [selectorChoices, setSelectorChoices] = useState([]);
  const [isValuesSet, setisValuesSet] = useState(false);
  const [indexOne, setIndexOne] = useState(0);
  const [indexTwo, setIndexTwo] = useState(1);
  let choiceOneWidth="80px";
  let choiceTwoWidth="112px";
  let smChoiceTwoWidth="138px";

  (function setReelValues() {
    
    if(!isValuesSet){

      switch (props.reelId) {
        case "1":{
          // setHeading("What's Popular");
        setSelectorChoices(["On TV", "In Theaters"]);
        setisValuesSet(true);
      }
        break;

      case "3":{
        // setHeading("Latest Trailers");
        setSelectorChoices(["On TV", "In Theaters"]);
        setisValuesSet(true);
      }
      break;
      case "4":{
        // setHeading("Trending");
        setSelectorChoices(["Today", "This Week"]);
        setisValuesSet(true);
      }
        break;
    
      default:
        break;
      }
    }
  })();
  
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
    $(`#selector-btn-${props.reelId}`).css({"width": choiceOneWidth});


    $(`#choiceOne-${props.reelId}`).off().on("click", function(){
      /* move selector button*/
      $(`#selector-btn-${props.reelId}`).animate({left: '0'}, 180);


      /* change selector text color*/
      if(props.reelId!=='3'){
        $(`#choiceTwo-${props.reelId} span`).removeClass("gradient-text");
        $(`#choiceOne-${props.reelId} span`).addClass("gradient-text");
      }else{
        /* change selector text color in trailers section */
        $(`#choiceTwo-${props.reelId} span`).removeClass("dark-blue-text");
        $(`#choiceOne-${props.reelId} span`).removeClass("white-text");
      }
        
      
      /* set selector button size*/
      $(`#selector-btn-${props.reelId}`).css({"width": choiceOneWidth});
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
        $(`#selector-btn-${props.reelId}`).css({"width": choiceTwoWidth});
      })
      
      
      
      $(`#sm-choiceTwo-${props.reelId}`).hide();
    

      /*small screen selector */
      $(`#sm-choiceOne-${props.reelId}`).off().on("click",function(){
        /* changes on small screen selector in trailers section */
        if(props.reelId ==='3'){
          $(`#sm-choiceOne-${props.reelId}`).toggleClass('no-background');

        }
        

        if($(`#sm-choiceTwo-${props.reelId}`).css("display")==="none"){
          $(`#sm-choiceTwo-${props.reelId}`).show();
          $(this).css("width",smChoiceTwoWidth);
          $(`#sm-choiceTwo-${props.reelId}`).css("width",smChoiceTwoWidth);
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
    <>
    {props.size=="small"?(
  <div id={`sm-selector-${props.reelId}`} className="sm-selector">
  <div id={`sm-choiceOne-${props.reelId}`} className="sm-choiceOne">
    <span>{selectorChoices[indexOne]}</span>
    <IoIosArrowDown/>
    </div>
  <div id={`sm-choiceTwo-${props.reelId}`} className="sm-choiceTwo" >
  <span>{selectorChoices[indexTwo]}</span>
  </div>
</div>
    ):(     <div className="selector">
    <div id={`selector-btn-${props.reelId}`} className="selector-btn"/>
    <div id={`choiceOne-${props.reelId}`} className="choiceOne">
      <span>{selectorChoices[0]}</span>
      </div>
    <div id={`choiceTwo-${props.reelId}`} className="choiceTwo">
    <span>{selectorChoices[1]}</span>
    </div>
  </div>)}
    </>
  )
}
