import React from "react";
// import EventDates from "../local/CalendarDates";
import EventDates from "../local/EventDates";
import EventPlaces from "../local/EventPlaces";


// import EventPlaces from "../components/local/EventPlaces";
// import EventDates from "../components/local/EventDates";

const NavigationBar = ({
  title,
  screenings,
  dates,
  setFilterFilms,
  highlightPlace,
  setDate,
  setFilterPlaces,
  setDisplayAll,
  filterPlaces,
  highlight,
  date,
}) => {
  return (
    <header className={`film-calendar-header`}>
      <div className="header-wrap">
        <h1>{title}</h1>
      </div>
      <div className="film-event-filter">
        <EventDates
          screenings={screenings}
          dates={dates}
          setFilterFilms={setFilterFilms}
          highlightPlace={highlightPlace}
          setDate={setDate}
          setFilterPlaces={setFilterPlaces}
          setDisplayAll={setDisplayAll}
        />
        <EventPlaces
          filterPlaces={filterPlaces}
          highlight={highlight}
          highlightPlace={highlightPlace}
          date={date}
          setFilterFilms={setFilterFilms}
        />
      </div>
    </header>
  );
};

export default NavigationBar;