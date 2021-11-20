import React, {useEffect} from "react";
import $ from 'jquery'

export default function RateCircle ({ percentage }) {
  const pct = percentage;
  
  /*top circle colors */
  let darkRed = "rgb(213,35,95)";
  let darkYellow = "rgb(196,200,48)";
  let darkGreen = "rgb(33,208,122)"; 
  
  /*bottom circle colors */
  let lightRed = "rgb(87,20,53)";
  let lightYellow = "rgb(66,63,17)";
  let lightGreen = "rgb(32,69,41)"; 
  

  function setCircleColors (){
if(pct<=50){
return [darkRed,lightRed];
} else if(pct>50 && pct<=70 ){
  return [darkYellow,lightYellow];
  } else if(pct>70 ){
    return [darkGreen,lightGreen];
    }
  }

useEffect(()=>{
  let numberOfDigits = pct.toString().length;
  switch (numberOfDigits) {
    case 1:
      $('.rate-circle-text').addClass('one-digit-num');      
      break;
  
    case 2:
      $('.rate-circle-text').addClass('two-digit-num');      
      break;

    case 3:
      $('.rate-circle-text').addClass('three-digit-num');      
      break;
    default:
      $('.rate-circle-text').addClass('one-digit-num');      
      break;
  }
})

  
  return (
    <div className="rate-circle-container">
    <svg className="rate-circle" width={38} height={38}>
      <g transform={`rotate(-90 ${"19 62"})`}>
        <Circle color={setCircleColors()[1]} />
        <Circle color={setCircleColors()[0]} pct={pct} />
      </g>
    </svg>
    <p className="rate-circle-text">{pct}<span>%</span></p>
    </div>
  );
};



const Circle = ({ color, pct }) => {
  const r = 16;
  const circ = 2 * Math.PI * r;
  const strokePct = ((100 - pct) * circ) / 100;
  return (
    <circle
      r={r}
      cx={62}
      cy={62}
      fill="transparent"
      stroke={strokePct !== circ ? color : ""} 
      strokeWidth={".13rem"}
      strokeDasharray={circ}
      strokeDashoffset={pct ? strokePct : 0}
      strokeLinecap="round"
    ></circle>
  );
};
