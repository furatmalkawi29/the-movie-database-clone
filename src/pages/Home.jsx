import React from "react";
import CardsReel from "../components/CardsReel";

export default function Home() {
  return (
    <>
      <CardsReel
        reelId="1"
        heading="What's Popular"
        selectorChoices={["On TV", "In Theaters"]}
        choiceOneWidth="80px"
        choiceTwoWidth="112px"
        smChoiceTwoWidth="138px"
      />

      <CardsReel
        reelId="2"
        heading="Free To Watch"
        selectorChoices={["Movie", "On TV"]}
        choiceOneWidth="80px"
        choiceTwoWidth="80px"
      />

      <CardsReel
        reelId="3"
        heading="Latest Trailers"
        selectorChoices={["On TV", "In Theaters"]}
        choiceOneWidth="80px"
        choiceTwoWidth="112px"
        smChoiceTwoWidth="138px"
      />

      <CardsReel
        reelId="4"
        heading="Trending"
        selectorChoices={["Today", "This Week"]}
        choiceOneWidth="80px"
        choiceTwoWidth="112px"
        smChoiceTwoWidth="138px"
      />

      <section className="join-banner">
        <h2>Join Today</h2>

        <div className="banner-content">
          <div>
            <p>
              Get access to maintain your own <span>custom personal lists</span>
              , <span>track what you've seen </span> and search and filter for
              what to watch next—regardless if it's in theatres, on TV or
              available on popular streaming services like Netflix, Disney Plus,
              and Amazon Prime Video.
            </p>

            <button>Sign Up</button>
          </div>
          <div>
            <ul>
              <li>Enjoy TMDB ad free</li>
              <li>Maintain a personal watchlist</li>
              <li>
                Filter by your subscribed streaming services and find something
                to watch
              </li>
              <li>Log the movies and TV shows you've seen</li>
              <li>Build custom lists</li>
              <li>Contribute to and improve our database</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
