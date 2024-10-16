import { useState, useEffect } from "react";
import { auth, db, } from "../firebase/firebase";
import {
  query,
  where,
  orderBy,
  collection,
  onSnapshot
} from "firebase/firestore";
import dayjs from "dayjs";
import MovieCard from "../components/calendar/MovieCard";
import Navigation from "../components/navbar/Navigation";
import Empty from "../components/Empty";

const Calendar = ({
  seriesList,
  setSeriesList,
  openMovieDetails,
  openScreenDetails,
  openEventDetails,
}) => {

  const [userLogged, setUserLogged] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [movies, setMovies] = useState([]);
  const [moviesFiltered, filterMovies] = useState([]);
  const [dates, setDates] = useState([]);
  const [dateSelected, selectDate] = useState(null);
  const [highlight, highlightSeries] = useState(null);
  const [view, viewAll] = useState(true);

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      setUserLogged(user?.uid);
    });
    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    const today = dayjs().startOf("day").format("YYYY-MM-DD");
    if (userLogged) {
      const fetchMovies = async () => {
        const ref = collection(db, "films");
        const q = query(
          ref,
          where("uid", "==", userLogged),
          where("date", ">=", today),
          orderBy("date"),
          orderBy("year", "asc")
        );
        const unsubscribeMovies = onSnapshot(q, (querySnapshot) => {
          let moviesList = [];
          querySnapshot.forEach((doc) => {
            moviesList.push({ ...doc.data(), id: doc.id });
          });
          setMovies(moviesList);
          filterMovies(moviesList);
          setSeriesList(moviesList);
          const moviesListDates = new Set(
            moviesList.map((movie) => movie.date)
          );
          setDates([...moviesListDates]);
          setIsLoading(false);
        });
        return () => unsubscribeMovies();
      };
      fetchMovies();
    }
  }, [userLogged, setSeriesList]);

  function groupbyMonth(movies) {
    const groupedMovies = {};
    movies.forEach((movie) => {
      const dayOfWeek = dayjs(movie.date).format("ddd");
      const monthKey = dayjs(movie.date).format("YYYY-M");
      if (!groupedMovies[monthKey]) {
        groupedMovies[monthKey] = {
          month: dayjs(movie.date).format("MMM"),
          year: dayjs(movie.date).format("YYYY"),
          days: {},
        };
      }
      const dayKey = dayjs(movie.date).format("D");
      if (!groupedMovies[monthKey].days[dayKey]) {
        groupedMovies[monthKey].days[dayKey] = { dayOfWeek, movies: [] };
      }
      groupedMovies[monthKey].days[dayKey].movies.push(movie);
    });
    return groupedMovies;
  }
  function sortasArray(groupedMovies) {
    return Object.entries(groupedMovies).sort((a, b) => {
      const [yearA, monthA] = a[0].split("-").map(Number);
      const [yearB, monthB] = b[0].split("-").map(Number);
      if (yearA !== yearB) {
        return yearA - yearB;
      } else {
        return monthA - monthB;
      }
    });
  }
  function sortMoviesbyMonth(movies) {
    const groupedMovies = groupbyMonth(movies);
    const sortedMovies = sortasArray(groupedMovies);

    const moviesArranged = sortedMovies.map(([key, value]) => {
      const monthData = value;
      const monthWithDayOfWeek = Object.entries(monthData.days).map(
        ([day, dayData]) => {
          const { dayOfWeek, movies } = dayData;
          return { day, dayOfWeek, movies };
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

  if (isLoading) {
    return;
  }
  return (
    <>
      <Navigation
        title="Calendar"
        movies={movies}
        dates={dates}
        filterMovies={filterMovies}
        highlightSeries={highlightSeries}
        viewAll={viewAll}
        selectDate={selectDate}
        seriesList={seriesList}
        setSeriesList={setSeriesList}
        highlight={highlight}
        dateSelected={dateSelected}
      />
      <section className="calendar flex">
        {moviesFiltered.length !== 0 ? (
          <div className="content-wrap">
            {view === false ? (
              <div className="filter-wrap">
                {moviesFiltered.length
                  ? moviesFiltered.map((movie, index) => (
                      <MovieCard
                        key={index}
                        movie={movie}
                        poster={movie.poster}
                        openMovieDetails={openMovieDetails}
                        openScreenDetails={openScreenDetails}
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
                          {dayData.movies.map((movie, index) => (
                            <MovieCard
                              key={index}
                              movie={movie}
                              poster={movie.poster}
                              openMovieDetails={openMovieDetails}
                              openScreenDetails={openScreenDetails}
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
          <Empty header="No Movies Listed" body="Schedule your next movie!" />
        )}
      </section>
    </>
  );
};

export default Calendar;