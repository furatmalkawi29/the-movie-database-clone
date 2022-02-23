import React, {useState, useEffect} from 'react'
import { IoIosArrowDown } from "react-icons/io";
import $ from 'jquery'

export default function ToggleButton({
  getActiveSelection,
  reelId,
  size
}) {

  const [selectorChoicesText, setSelectorChoicesText] = useState([]);
  const [isValuesSet, setisValuesSet] = useState(false);
  const [indexOne, setIndexOne] = useState(0);
  const [indexTwo, setIndexTwo] = useState(1);
  let choiceOneWidth="80px";
  let choiceTwoWidth="112px";
  let smChoiceTwoWidth="138px";

  (function setReelValues() {
    
    if(!isValuesSet){

      switch (reelId) {
        case "1":{
          // setHeading("What's Popular");
        setSelectorChoicesText(["On TV", "In Theaters"]);
        setisValuesSet(true);
      }
        break;

      case "3":{
        // setHeading("Latest Trailers");
        setSelectorChoicesText(["On TV", "In Theaters"]);
        setisValuesSet(true);
      }
      break;
      case "4":{
        // setHeading("Trending");
        setSelectorChoicesText(["Today", "This Week"]);
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

  function changeActiveSelection(e) {
    let selection = e.target?e.target.innerText:'';
    getActiveSelection(selection);
          }
          

  useEffect(()=>{

    /* best practice to put jquery inside useEffect */

    /* set default choice text color*/
    $(`#choiceOne-${reelId} span`).addClass('gradient-text');
    $(`#selector-btn-${reelId}`).css({"width": choiceOneWidth});


    $(`#choiceOne-${reelId}`).off().on("click", function(){
      /* move selector button*/
      $(`#selector-btn-${reelId}`).animate({left: '0'}, 180);


      /* change selector text color*/
      if(reelId!=='3'){
        $(`#choiceTwo-${reelId} span`).removeClass("gradient-text");
        $(`#choiceOne-${reelId} span`).addClass("gradient-text");
      }else{
        /* change selector text color in trailers section */
        $(`#choiceTwo-${reelId} span`).removeClass("dark-blue-text");
        $(`#choiceOne-${reelId} span`).removeClass("white-text");
      }
        
      
      /* set selector button size*/
      $(`#selector-btn-${reelId}`).css({"width": choiceOneWidth});
    })




    $(`#choiceTwo-${reelId}`).off().on("click", function(){

      /* only reset in this case */
      if($(`#selector-btn-${reelId}`).css('left')==="0px"){

        /*reset left/right for next use*/
        $(`#selector-btn-${reelId}`).css({'right':"unset"})
        $(`#selector-btn-${reelId}`).css({'left':"unset"})
      }
        
        /* move selector button*/
        $(`#selector-btn-${reelId}`).animate({right: '0'}, 180);


        /* change selector text color*/
        if(reelId!=="3"){
          $(`#choiceOne-${reelId} span`).removeClass("gradient-text");
          $(`#choiceTwo-${reelId} span`).addClass("gradient-text");
        }else{
        /* change selector text color in trailers section */
        $(`#choiceOne-${reelId} span`).addClass("white-text");
        $(`#choiceTwo-${reelId} span`).addClass("dark-blue-text");
        }

        /* set selector button size*/
        $(`#selector-btn-${reelId}`).css({"width": choiceTwoWidth});
      })
      
      
      
      $(`#sm-choiceTwo-${reelId}`).hide();
    

      /*small screen selector */
      $(`#sm-choiceOne-${reelId}`).off().on("click",function(){
        /* changes on small screen selector in trailers section */
        if(reelId ==='3'){
          $(`#sm-choiceOne-${reelId}`).toggleClass('no-background');

        }
        

        if($(`#sm-choiceTwo-${reelId}`).css("display")==="none"){
          $(`#sm-choiceTwo-${reelId}`).show();
          $(this).css("width",smChoiceTwoWidth);
          $(`#sm-choiceTwo-${reelId}`).css("width",smChoiceTwoWidth);
        }else{          
          $(`#sm-choiceTwo-${reelId}`).hide();
          $(this).css("width","max-content");
        }

      })

      $(`#sm-choiceTwo-${reelId}`).on("click",function(){
        swapSelectorChoices();
      })
  })


  return (
    <>
    {size=="small"?(
  <div id={`sm-selector-${reelId}`} className="sm-selector">
  <div id={`sm-choiceOne-${reelId}`} className="sm-choiceOne">
    <span>{selectorChoicesText[indexOne]}</span>
    <IoIosArrowDown/>
    </div>
  <div id={`sm-choiceTwo-${reelId}`} className="sm-choiceTwo" >
  <span>{selectorChoicesText[indexTwo]}</span>
  </div>
</div>
    ):(     <div className="selector">
    <div id={`selector-btn-${reelId}`} className="selector-btn"/>
    <div id={`choiceOne-${reelId}`} className="choiceOne" onClick={changeActiveSelection} >
      <span>{selectorChoicesText[0]}</span>
      </div>
    <div id={`choiceTwo-${reelId}`} className="choiceTwo" onClick={changeActiveSelection}>
    <span>{selectorChoicesText[1]}</span>
    </div>
  </div>)}
    </>
  )
}
