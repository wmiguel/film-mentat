import "./css/App.css";
import "./css/film-mentat.css";
import "./css/themes/nebula.css";
import React, { useState } from "react";
import FilmSearchHeader from "./components/search/FilmSearchHeader";
import FilmCalendarList from "./components/calendar/FilmCalendarList";

function App() {
  const [pauseScroll, setPauseScroll] = useState(false);

  return (
    <>
      <FilmSearchHeader
        pauseScroll={pauseScroll}
        setPauseScroll={setPauseScroll}
      />
      <FilmCalendarList pauseScroll={pauseScroll} />
    </>
  );
}

export default App;
