import React from 'react'
import CardsReel from '../components/CardsReel'


export default function Home() {

  return (
    <>
  {/* <CardsReel reelId="1" heading="What's Popular" selectorChoices={['On TV','In Theaters']}  choiceOneWidth = "80px" choiceTwoWidth = "112px" smChoiceTwoWidth = "138px"/>


  <CardsReel reelId="2" heading="Free To Watch" selectorChoices={['Movie','On TV']}  choiceOneWidth = "80px"
choiceTwoWidth = "80px"/> */}

<CardsReel reelId="3" heading="Latest Trailers" selectorChoices={['On TV','In Theaters']} choiceOneWidth = "80px" choiceTwoWidth = "112px" smChoiceTwoWidth = "138px" customClasses={["trailer-cards-container"]}/>

    </>
  )
}
