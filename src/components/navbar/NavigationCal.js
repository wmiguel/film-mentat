import React from "react";
import CalendarDates from "../../components/local/CalendarDates";
import CalendarSeries from "../../components/local/CalendarSeries";

const NavigationBar = ({
  title,
  films,
  dates,
  setFilterFilms,
  highlightSeries,
  setDateSelected,
  filterSeries,
  setFilterSeries,
  highlight,
  dateSelected,
}) => {
  return (
    <header className={`film-calendar-header`}>
      <div className="header-wrap">
        <h1>{title}</h1>
      </div>
      <div className="film-event-filter">
        <CalendarDates
          films={films}
          dates={dates}
          setFilterFilms={setFilterFilms}
          highlightSeries={highlightSeries}
          setDateSelected={setDateSelected}
          filterSeries={filterSeries}
          setFilterSeries={setFilterSeries}
        />
        <CalendarSeries
          filterSeries={filterSeries}
          highlight={highlight}
          highlightSeries={highlightSeries}
          dateSelected={dateSelected}
          setFilterFilms={setFilterFilms}
        />
      </div>
    </header>
  );
};

export default NavigationBar;
