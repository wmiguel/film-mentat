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
import FilmCard from "../components/calendar/FilmCard";
import { ReactComponent as TicketSVG } from '../images/empty-ticket.svg';
import NavigationBar from "../components/navbar/NavigationCal";

const Calendar = ({
  openFilmDetails,
  filterSeries,
  setFilterSeries,
  openScreenDetails,
}) => {
  const [userLogged, setUserLogged] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [films, setFilms] = useState([]);
  const [filterFilms, setFilterFilms] = useState([]);
  // const [filterSeries, setFilterSeries] = useState([]);

  const [dateSelected, setDateSelected] = useState(null);
  const [highlight, highlightSeries] = useState(null);
  const [allDates, setAllDates] = useState([]);

  // const newDate = new Date();
  // const today = dayjs(newDate).startOf("day").format("YYYY-MM-DD");
  const today = dayjs().startOf("day").format("YYYY-MM-DD");

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      setUserLogged(user?.uid);
    });
    return () => unsubscribeAuth();
  }, []);
  useEffect(() => {
    if (userLogged) {
      const fetchFilms = async () => {
        const filmsRef = collection(db, "films");
        const q = query(
          filmsRef,
          where("uid", "==", userLogged),
          where("date", ">=", today),
          orderBy("date"),
          orderBy("year", "asc")
        );
        const unsubscribeFilms = onSnapshot(q, (querySnapshot) => {
          let filmsArr = [];
          querySnapshot.forEach((doc) => {
            filmsArr.push({ ...doc.data(), id: doc.id });
          });
          setFilms(filmsArr);
          setFilterFilms(filmsArr);
          setFilterSeries(filmsArr);
          const filmDates = new Set(filmsArr.map((movie) => movie.date));
          setAllDates([...filmDates]);
          setIsLoading(false);
        });
        return () => unsubscribeFilms();
      };
      fetchFilms();
    }
  }, [today, userLogged, setFilterSeries]);

  function groupFilmsByMonth(films) {
    const groupedFilms = {};
    films.forEach((film) => {
      const dayOfWeek = dayjs(film.date).format("ddd");
      const monthKey = dayjs(film.date).format("YYYY-M");
      if (!groupedFilms[monthKey]) {
        groupedFilms[monthKey] = {
          month: dayjs(film.date).format("MMM"),
          year: dayjs(film.date).format("YYYY"),
          days: {},
        };
      }
      const dayKey = dayjs(film.date).format("D");
      if (!groupedFilms[monthKey].days[dayKey]) {
        groupedFilms[monthKey].days[dayKey] = { dayOfWeek, films: [] };
      }
      groupedFilms[monthKey].days[dayKey].films.push(film);
    });
    return groupedFilms;
  }
  function sortFilmsByMonth(films) {
    return Object.entries(films).sort((a, b) => {
      const [yearA, monthA] = a[0].split("-").map(Number);
      const [yearB, monthB] = b[0].split("-").map(Number);
      if (yearA !== yearB) {
        return yearA - yearB;
      } else {
        return monthA - monthB;
      }
    });
  }
  function organizeFilmsByMonth(films) {
    const groupedFilms = groupFilmsByMonth(films);
    const sortedFilms = sortFilmsByMonth(groupedFilms);

    const organizedFilms = sortedFilms.map(([key, value]) => {
      const monthData = value;
      const monthWithDayOfWeek = Object.entries(monthData.days).map(
        ([day, dayData]) => {
          const { dayOfWeek, films } = dayData;
          return { day, dayOfWeek, films };
        }
      );
      return {
        month: monthData.month,
        year: monthData.year,
        days: monthWithDayOfWeek,
      };
    });

    return organizedFilms;
  }
  const organizedFilms = organizeFilmsByMonth(filterFilms);

  if (isLoading) {
    return;
  }
  if (filterFilms.length !== 0) {
    return (
      <>
        <NavigationBar
          title="Calendar"
          films={films}
          dates={allDates}
          setFilterFilms={setFilterFilms}
          highlightSeries={highlightSeries}
          setDateSelected={setDateSelected}
          filterSeries={filterSeries}
          setFilterSeries={setFilterSeries}
          highlight={highlight}
          dateSelected={dateSelected}
        />
        <section id="film-calendar-list" className={`film-calendar-list flex `}>
          <div className="content-wrap">
            {organizedFilms.map((monthData, index) => (
              <div key={index} className="month-wrap">
                <div className="film-calendar-month flex">
                  <h2>
                    {monthData.month} {monthData.year}
                  </h2>
                </div>
                {Object.entries(monthData.days).map(([day, dayData]) => (
                  <div key={day} className="day-wrap grid">
                    <div className="film-calendar-day film-date">
                      <div className="film-date-border grid">
                        <span>{dayData.dayOfWeek}</span>
                        <h3>{dayData.day}</h3>
                      </div>
                    </div>

                    <div className="film-calendar-event">
                      {dayData.films.map((film, index) => (
                        <FilmCard
                          key={index}
                          film={film}
                          openFilmDetails={openFilmDetails}
                          openScreenDetails={openScreenDetails}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>
      </>
    );
  } else {
    return (
      <section id="film-calendar-list" className={`film-calendar-list flex `}>
        <div className="empty-wrap">
          <div className="dash-border">
            <div className="empty-text">
              <div className="empty-ticket">
                <TicketSVG />
              </div>
              <h1>No Movies Listed</h1>
              <h3>Schedule your next movie!</h3>
            </div>
          </div>
        </div>
      </section>
    );
  }
};
export default Calendar;