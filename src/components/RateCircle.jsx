import React, { useEffect, useState } from "react";
import $ from "jquery";

export default function RateCircle({ percentage, size }) {
  const [dimentions, setDimentions] = useState({});

  const [fontStyle, setFontStyle] = useState({});
  const [fontLeftPosition, setFontLeftPosition] = useState('');

  /*top circle colors */
  let darkRed = "rgb(213,35,95)";
  let darkYellow = "rgb(196,200,48)";
  let darkGreen = "rgb(33,208,122)";

  /*bottom circle colors */
  let lightRed = "rgb(87,20,53)";
  let lightYellow = "rgb(66,63,17)";
  let lightGreen = "rgb(32,69,41)";

  /* set ring color based on percentage */
  function setCircleColors() {
    if (percentage <= 50) {
      return [darkRed, lightRed];
    } else if (percentage > 50 && percentage <= 70) {
      return [darkYellow, lightYellow];
    } else if (percentage > 70) {
      return [darkGreen, lightGreen];
    }
  }




  /* set circle size based on size in props */
  function setCircleDimensions() {
    switch (size) {
      case "small":
        setDimentions({
          radius: 16,
          width: 38,
          height: 38,
          strokeWidth: ".13rem",
          transform: `rotate(-90 ${"19 62"})`,
        });
        break;

      case "medium":
        setDimentions({
          radius: 20,
          width: 50,
          height: 50,
          strokeWidth: ".2rem",
          transform: `rotate(-81 ${"22 65"})`,
        });
        break;

      case "large":
        setDimentions({
          radius: 28,
          width: 68,
          height: 68,
          strokeWidth: ".25rem",
          transform: `rotate(-70 ${"28 68"})`,
        });
        break;

      default:
        break;
    }
  }



  /* set percentage position based on number of digits */
  function chooseFontStyle() {
    switch (size) {
      case "small":
        {
          setFontStyle({
            fontSize: ".75rem",
            top: "13px",
            left: fontLeftPosition,
          });
        }
        break;

      case "medium":
        {
          setFontStyle({
            fontSize: "1rem",
            top: "18px",
            left: fontLeftPosition,
          });
        }
        break;

        case "large":
          {
            setFontStyle({
              fontSize: "1.35rem",
              top: "22px",
              left: fontLeftPosition,
            });             
          }
          break;
  
        default:
          break;
      }

  }




  /* style font position in circle */
  function chooseFontLeftPosition() {
    let percentDigits = percentage.toString().length;
    
    if(size==="small"){

      switch (percentDigits) {
        case 1:  
        setFontLeftPosition("15px");
        break;
        case 2:
          setFontLeftPosition("12px");
          break;
      case 3:       
          setFontLeftPosition("7px");
          break;
          
          default:
            break;
          }
        } else if(size==="medium"){
  switch (percentDigits) {
    case 1:  
    setFontLeftPosition("20px");
    break;
    case 2:
      setFontLeftPosition("16px");
      break;
  case 3:       
      setFontLeftPosition("10px");
      break;
      
      default:
        break;
      } } else if(size==="large"){
          switch (percentDigits) {
            case 1:  
            setFontLeftPosition("26px");
            break;
            case 2:
              setFontLeftPosition("20px");
              break;
          case 3:       
              setFontLeftPosition("14px");
              break;
              
              default:
                break;
              }
         }
  }


  useEffect(() => {
    setCircleDimensions();
  },[]);

  useEffect(() => {
    chooseFontLeftPosition();
    chooseFontStyle();
  },[fontLeftPosition]);




  return (
    <div className="rate-circle-container">
      <svg
        className="rate-circle"
        width={dimentions.width}
        height={dimentions.height}
      >
        <g transform={dimentions.transform}>
          <Circle
            color={setCircleColors()[1]}
            percentage={100}
            radius={dimentions.radius}
            strokeWidth={dimentions.strokeWidth}
          />
          <Circle
            color={setCircleColors()[0]}
            percentage={percentage}
            radius={dimentions.radius}
            strokeWidth={dimentions.strokeWidth}
          />
        </g>
      </svg>
      <p className="rate-circle-text" style={fontStyle}>
        {percentage}
        <span>%</span>
      </p>
    </div>
  );
}



const Circle = ({ color, percentage, radius, strokeWidth }) => {
  const r = radius;
  const circ = 2 * Math.PI * r;
  const strokepercentage = ((100 - percentage) * circ) / 100;
  return (
    <circle
      r={r}
      cx={62}
      cy={62}
      fill="transparent"
      stroke={strokepercentage !== circ ? color : ""}
      strokeWidth={strokeWidth}
      strokeDasharray={circ}
      strokeDashoffset={percentage ? strokepercentage : 0}
      strokeLinecap="round"
    ></circle>
  );
};
