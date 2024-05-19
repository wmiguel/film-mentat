import { useState, useEffect } from "react";
import { auth, db, } from "../firebase/firebase";
import {
  query,
  where,
  orderBy,
  collection,
  onSnapshot
} from "firebase/firestore";
import FilmCard from "../components/calendar/FilmCard";
import EventDates from "../components/local/CalendarDates";
// import EventPlaces from "../components/local/EventPlaces";
import CalendarSeries from "../components/local/CalendarSeries";
import { ReactComponent as TicketSVG } from '../images/empty-ticket.svg';

function FilmCalendarList({
  pauseScroll,
  setPauseScroll,
  openModal,
  setOpenModal,
  openFilmDetails,
}) {
  const [films, setFilms] = useState([]);
  const [userLogged, setUserLogged] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [screeningDates, setScreeningDates] = useState([]);
  const [calendarSeries, setCalendarSeries] = useState([]);
  const [dateHighlight, setDateHighlight] = useState(null);
  const allMonths = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const pause = pauseScroll ? "pause-scroll" : "";

  // Read film from firebase
  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      setUserLogged(user?.uid); // Set user ID if logged in, otherwise null
    });

    return () => unsubscribeAuth(); // Unsubscribe from auth listener
  }, []);

  useEffect(() => {
    if (userLogged) {
      const fetchFilms = async () => {
        const filmsRef = collection(db, "films");
        const q = query(
          filmsRef,
          where("uid", "==", userLogged),
          orderBy("date"),
          orderBy("year", "asc")
        );
        const unsubscribeFilms = onSnapshot(q, (querySnapshot) => {
          let filmsArr = [];
          querySnapshot.forEach((doc) => {
            filmsArr.push({ ...doc.data(), id: doc.id });
          });
          // console.log(filmsArr);

          const today = new Date();
          const yesterday = new Date(today);
          yesterday.setDate(today.getDate() - 1);
          yesterday.setHours(0,0,0,0);
          const futureDates = filmsArr.filter((movie) => {
            const theMovie = new Date(movie.date);
            return theMovie >= yesterday;
          });

          const resultScreeningDates = new Set(
            futureDates.map((movie) => movie.date)
          );
          const sortedDates = [...resultScreeningDates].sort(
            (a, b) => new Date(a) - new Date(b)
          );
          setScreeningDates(sortedDates);

          const resultSeries = new Set(
            futureDates.map((movie) => movie.series)
          );
          const sortedSeries = [...resultSeries].sort();
          setCalendarSeries([...sortedSeries]);

          setFilms(futureDates);
          setIsLoading(false); // Set loading state to false after fetching films
        });

        return () => unsubscribeFilms(); // Unsubscribe from films listener
      };
      fetchFilms();
    }
  }, [userLogged]);

  // console.log(calendarSeries);
  // console.log(screeningDates);

  function parseDate(dateString) {
    const [year, month, day] = dateString.split("-");
    return {
      year: parseInt(year),
      month: parseInt(month),
      day: parseInt(day),
    };
  }

  function groupFilmsByMonth(films) {
    const groupedFilms = {};
    films.forEach((film) => {
      const { year, month, day } = parseDate(film.date);
      const dateObj = new Date(year, month - 1, day);
      const dayOfWeek = dateObj.toLocaleDateString("en-US", {
        weekday: "short",
      });
      const monthKey = `${year}-${month}`;
      if (!groupedFilms[monthKey]) {
        groupedFilms[monthKey] = {
          month: allMonths[month - 1],
          year: year,
          days: {},
        };
      }
      const dayKey = `${day}`;
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

  const organizedFilms = organizeFilmsByMonth(films);

  if (isLoading) {
    return;
  }
  if (films.length !== 0) {
    return (
      <section
        id="film-calendar-list"
        className={`film-calendar-list flex ${pause}`}
      >
        <EventDates
          dateHighlight={dateHighlight}
          // dateSelectedFormating={dateSelectedFormating}
          modifiedScreeningDates={screeningDates}
          // startOfDayISO={startOfDayISO}
          // tomorrowStartISO={tomorrowStartISO}
          // calendarDate={calendarDate}
        />
        <CalendarSeries calendarSeries={calendarSeries} />
        {/*
        <EventPlaces
          placeSelected={placeSelected}
          placeHighlight={placeHighlight}
          screeningPlaces={screeningPlaces}
        /> */}
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
                        pauseScroll={pauseScroll}
                        setPauseScroll={setPauseScroll}
                        openModal={openModal}
                        setOpenModal={setOpenModal}
                        openFilmDetails={openFilmDetails}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>
    );
  } else {
    return (
      <section
        id="film-calendar-list"
        className={`film-calendar-list flex ${pause}`}
      >
        <div className="empty-wrap">
          <div className="dash-border">
            <div className="empty-text">
              <div className="empty-ticket">
                <TicketSVG />
              </div>
              <h1>No Movies Scheduled!</h1>
              <h3>Add your next movie event.</h3>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
export default FilmCalendarList;