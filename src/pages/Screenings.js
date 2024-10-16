import React, { useState, useEffect } from "react";
import Navigation from "../components/navbar/Navigation";
import { fetchScreenings } from "../api/moviesRequests";
import MovieCard from "../components/calendar/MovieCard";
import Empty from "../components/Empty";
import dayjs from "dayjs";

const Screenings = ({ openEventDetails }) => {
  const [screenings, setScreenings] = useState([]);
  const [moviesFiltered, filterMovies] = useState([]);
  const [dates, setDates] = useState([]);
  const [dateSelected, selectDate] = useState();
  const [highlight, highlightPlace] = useState(null);
  const [view, viewAll] = useState(true);

  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const getZeitgeist = async () => {
      const today = dayjs().format("YYYY-MM-DD");
      const response = await fetchScreenings();
      const todayFuture = response.filter(
        (movie) => 
          dayjs(movie.startDate).format("YYYY-MM-DD") >= today
      );

      const allScreenings = todayFuture;
      allScreenings.sort((a, b) =>
        dayjs(a.startDate).isAfter(dayjs(b.startDate)) ? 1 : -1
      );
      setScreenings(allScreenings);
      filterMovies(allScreenings);
      setPlaces(allScreenings);

      const allScreeningDates = new Set(
        allScreenings.map((movie) =>
          dayjs(movie.startDate).format("YYYY-MM-DD")
        )
      );
      const sortAllScreeningDates = [...allScreeningDates].sort((a, b) =>
        dayjs(a).isAfter(dayjs(b)) ? 1 : -1
      );
      setDates(sortAllScreeningDates);
    };
    getZeitgeist();
  }, []);

  function groupbyMonth(screenings) {
    const groupedMovies = {};
    screenings.forEach((screening) => {
      const dayOfWeek = dayjs(screening.startDate).format("ddd");
      const monthKey = dayjs(screening.startDate).format("YYYY-M");
      if (!groupedMovies[monthKey]) {
        groupedMovies[monthKey] = {
          month: dayjs(screening.startDate).format("MMM"),
          year: dayjs(screening.startDate).format("YYYY"),
          days: {},
        };
      }
      const dayKey = dayjs(screening.startDate).format("D");
      if (!groupedMovies[monthKey].days[dayKey]) {
        groupedMovies[monthKey].days[dayKey] = { dayOfWeek, screenings: [] };
      }
      groupedMovies[monthKey].days[dayKey].screenings.push(screening);
    });
    return groupedMovies;
  }
  function sortasArray(screening) {
    return Object.entries(screening).sort((a, b) => {
      const [yearA, monthA] = a[0].split().map(Number);
      const [yearB, monthB] = b[0].split().map(Number);
      if (yearA !== yearB) {
        return yearA - yearB;
      } else {
        return monthA - monthB;
      }
    });
  }
  function sortMoviesbyMonth(screenings) {
    const groupedMovies = groupbyMonth(screenings);
    const sortedMovies = sortasArray(groupedMovies);

    const moviesArranged = sortedMovies.map(([key, value]) => {
      const monthData = value;
      const monthWithDayOfWeek = Object.entries(monthData.days).map(
        ([day, dayData]) => {
          const { dayOfWeek, screenings } = dayData;
          return { day, dayOfWeek, screenings };
        }
      );
      return {
        month: monthData.month,
        year: monthData.year,
        days: monthWithDayOfWeek,
      };
    });

    return moviesArranged;
  }
  const moviesArranged = sortMoviesbyMonth(moviesFiltered);

  return (
    <>
      <Navigation
        title="Screenings"
        screenings={screenings}
        dates={dates}
        filterMovies={filterMovies}
        highlightPlace={highlightPlace}
        viewAll={viewAll}
        selectDate={selectDate}
        setPlaces={setPlaces}
        places={places}
        highlight={highlight}
        dateSelected={dateSelected}
      />
      <section className="screenings flex">
        {moviesFiltered.length !== 0 ? (
          <div className="content-wrap">
            {view === false ? (
              <div className="filter-wrap">
                {moviesFiltered.length
                  ? moviesFiltered.map((screen, index) => (
                      <MovieCard
                        key={index}
                        screen={screen}
                        openEventDetails={openEventDetails}
                      />
                    ))
                  : null}
              </div>
            ) : (
              <>
                {moviesArranged.map((monthData, index) => (
                  <div key={index} className="month-wrap">
                    <div className="month-year-wrap flex">
                      <p>
                        {monthData.month} {monthData.year}
                      </p>
                    </div>
                    {Object.entries(monthData.days).map(([day, dayData]) => (
                      <div key={day} className="day-wrap grid">
                        <div className="day flex">
                          <span>{dayData.dayOfWeek}</span>
                          <h2>{dayData.day}</h2>
                        </div>

                        <div className="movies-wrap">
                          {dayData.screenings.map((screen, index) => (
                            <MovieCard
                              key={index}
                              screen={screen}
                              openEventDetails={openEventDetails}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </>
            )}
          </div>
        ) : (
          <Empty header="Loading!" body={"Please wait..."} />
        )}
      </section>
    </>
  );
};
export default Screenings;