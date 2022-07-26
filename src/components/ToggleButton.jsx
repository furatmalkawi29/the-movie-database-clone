import React, {useState} from 'react'

export default function ToggleButton({
  setActiveOption,
  optionOneText,
  optionTwoText
}) {

  const [buttonPosition, setButtonPosition] = useState("slide-left");
  const [firstChoiceText, setFirstChoiceText] = useState('gradient-text');
  const [secondChoiceText, setSecondChoiceText] = useState('regular-toggler-text');

  const buttonClickHandler = () =>{
    if(buttonPosition ==="slide-left"){
      setButtonPosition('slide-right');
      setActiveOption(2);
      setFirstChoiceText('regular-toggler-text')
      setSecondChoiceText('gradient-text')
    }else if(buttonPosition ==="slide-right"){
      setButtonPosition('slide-left')
      setActiveOption(1);
      setFirstChoiceText('gradient-text')
      setSecondChoiceText('regular-toggler-text')
    }
  }


  return (
  <div className="selector">
    <div className={`togglerChoice firstChoice ${firstChoiceText}`}
     onClick={buttonClickHandler}>{optionOneText}</div>
    <div className={`togglerChoice secondChoice ${secondChoiceText}`}
     onClick={buttonClickHandler}>{optionTwoText}</div>
    <div className={`selector-btn ${buttonPosition}`} >
</div>
  </div>
  )
}
