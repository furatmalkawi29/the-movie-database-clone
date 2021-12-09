import React from 'react'
import facebook from '../assets/images/facebook.svg'
import insta from '../assets/images/insta.svg'
import twitter from '../assets/images/twitter.svg'
import link from '../assets/images/link.svg'
import justwatch from '../assets/images/justwatch.svg'

export default function MovieFacts() {
  return (
    <div className="info-column">

<div className="links-icons">
  <div>
  <img src={facebook}/>
  <img src={twitter}/>
  <img src={insta}/>
  </div>

  <span/>
<img src={justwatch} className="justwatch-icon"/>
  <span/>
<img src={link}/>
</div>

<div className="facts">
      <h2>Facts</h2>
      <div className="fact-block">
<h3>Original Name</h3>
<bdi>오징어 게임</bdi>
      </div>

<div className="fact-block">
<h3>Status</h3>
<p>Ended</p>
</div>

      {/* series facts */}
<div className="fact-block">
  <h3>Network</h3>
<div className="network-img">
  <img src="https://www.themoviedb.org/t/p/h30/wwemzKWzjKYJFfCeiB57q3r4Bcm.png"/>
  <img src="https://www.themoviedb.org/t/p/h30/wwemzKWzjKYJFfCeiB57q3r4Bcm.png"/>
</div>
</div>

      {/* series facts */}
<div className="fact-block">
<h3>Type</h3>
<p>Scripted</p>
</div>

<div className="fact-block">
<h3>Original Language</h3>
<p>Korean</p>
</div>


{/* movie fact */}
<div className="fact-block">
<h3>Budget</h3>
<p>$880,166,924.00</p>
</div>

{/* movie fact */}
<div className="fact-block">
<h3>Revenue</h3>
<p>-</p>
</div>

</div>

<div className="keywords">
<h2>Keywords</h2>
<div><span>survival</span></div>
<div><span>thriller</span></div>
<div><span>fictional game show</span></div>
<div><span>death match</span></div>
</div>


    </div>
  )
}
