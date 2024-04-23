import React from "react";
import FilmCard from "../components/calendar/FilmCard";

function App() {
  const sampleFilm = {
    series: "The Films of Tim Burton",
    title: "Corpse Bride",
    IMDbID: "tt0121164",
    format: "Netflix",
    year: "2005",
    id: "",
  };

  return (
    <section
      id="home"
      className={"film-calendar-list film-calendar-home"}
    >
      <div className="content-wrap">
        <div className="month-wrap">
          <div className="film-calendar-month">
            <h2>Welcome to Film Mentat</h2>
          </div>

          <div className="day-wrap">
            <div></div>
            <div className="film-calendar-event">
              <div className="film-card">
                <div className="film-event">
                  <div></div>
                  <div><h1>Please Sign In to Access Your Calendar</h1></div>
                </div>
              </div>
            </div>
          </div>

          <div key="5" className="day-wrap">
            <div className="film-calendar-day film-date">
              <div className="film-date-border">
                <span></span>
                <h3>5</h3>
              </div>
            </div>

            <div className="film-calendar-event">
              <FilmCard key={1} film={sampleFilm} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
