import React, {useState} from "react";
import Dates from "../local/Dates";
import SecondFilter from "../local/SecondFilter";
import FilterButton from "../buttons/FilterButton";

const Navigation = ({
  // display,
  title,
  movies,
  screenings,
  dates,

  filterMovies,

  selectDate,
  viewAll,
  seriesList,

  highlight,
  dateSelected,

  places,

  highlightSeries,
  setSeriesList,
  highlightPlace,
  setPlaces,
}) => {
  const [display, setDisplay] = useState(false);
  const toggleFilters = () => {
    setDisplay(!display);
  };
  const toggleDisplay = display ? "flex" : "none";
  
  return (
    <header className="nav-header flex">
      <div className="title-filter flex">
        <div className="title">
          <h2>{title}</h2>
        </div>
        {title === "Settings" ? null : (
          <FilterButton toggleFilters={toggleFilters} />
        )}
      </div>
      {title === "Settings" ? null : (
        <>
          {dates.length !== 0 ? (
            <div className={`nav-filters ${toggleDisplay}`}>
              {title === "Calendar" ? (
                <>
                  <Dates
                    movies={movies}
                    dates={dates}
                    filterMovies={filterMovies}
                    selectDate={selectDate}
                    viewAll={viewAll}
                    setSecondHighlight={highlightSeries}
                    setSecondFilter={setSeriesList}
                  />
                  <SecondFilter
                    seriesList={seriesList}
                    setSecondHighlight={highlightSeries}
                    highlight={highlight}
                    dateSelected={dateSelected}
                    filterMovies={filterMovies}
                  />
                </>
              ) : null}
              {title === "Screenings" ? (
                <>
                  <Dates
                    screenings={screenings}
                    dates={dates}
                    filterMovies={filterMovies}
                    selectDate={selectDate}
                    viewAll={viewAll}
                    setSecondHighlight={highlightPlace}
                    setSecondFilter={setPlaces}
                  />
                  <SecondFilter
                    places={places}
                    setSecondHighlight={highlightPlace}
                    highlight={highlight}
                    dateSelected={dateSelected}
                    filterMovies={filterMovies}
                  />
                </>
              ) : null}
            </div>
          ) : null}
        </>
      )}
    </header>
  );
};

export default Navigation;
