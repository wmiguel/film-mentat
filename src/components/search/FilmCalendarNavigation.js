import React from "react";
import { GiBrain } from "react-icons/gi";
import FilmToggleSearch from "../buttons/FilmToggleSearch";

function FilmCalendarNavigation({ toggleSearch, rotateStyle, pauseScroll }) {
  const rotate = rotateStyle ? "turn-right" : "toggle-left";

  return (
    <header className="film-calendar-header">
      <div className="film-calendar-sitename">
        <GiBrain size={25} />
        <h1>Mentat</h1>
      </div>
      <div className="film-calendar-nav">
        <FilmToggleSearch
          rotate={rotate}
          toggleSearch={toggleSearch}
        />
      </div>
    </header>
  );
}

export default FilmCalendarNavigation;