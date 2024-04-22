import { useState, useEffect } from "react";

import FilmCard from "./FilmCard";

import { db } from "../../firebase/firebase";
import {
  query,
  orderBy,
  collection,
  onSnapshot
} from "firebase/firestore";

function FilmCalendarList({ pauseScroll }) {
  const [films, setFilms] = useState([]);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "Septemeber",
    "October",
    "November",
    "December",
  ];

  // Read film from firebase
  useEffect(() => {
    const q = query(
      collection(db, "films"),
      orderBy("date"),
      orderBy("year", "asc")
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let filmsArr = [];
      querySnapshot.forEach((doc) => {
        filmsArr.push({ ...doc.data(), id: doc.id });
      });
      setFilms(filmsArr);
    });
    return () => unsubscribe();
  }, []);

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
      const monthKey = `${year}-${month}`;
      if (!groupedFilms[monthKey]) {
        groupedFilms[monthKey] = { month: months[month - 1], days: [] };
      }
      const dayKey = `${day}`;
      if (!groupedFilms[monthKey].days[dayKey]) {
        groupedFilms[monthKey].days[dayKey] = [];
      }
      groupedFilms[monthKey].days[dayKey].push(film);
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

    for (const [, monthData] of sortedFilms) {
      for (const dayFilms of Object.values(monthData.days)) {
        dayFilms.sort((a, b) => (a.date > b.date ? 1 : -1));
      }
    }
    return sortedFilms.map(([key, value]) => value);
  }

  const organizedFilms = organizeFilmsByMonth(films);

  const pause = pauseScroll ? "pause-scroll" : "";

  return (
    <section id="film-calendar-list" className={`film-calendar-list ${pause}`}>
      <div className="content-wrap">
        {organizedFilms.map((monthData, index) => (
          <div key={index} className="month-wrap">
            <div className="film-calendar-month">
              <h2>{monthData.month}</h2>
            </div>
            {Object.entries(monthData.days).map(([day, films]) => (
              <div key={day} className="day-wrap">
                <div className="film-calendar-day film-date">
                  <div className="film-date-border">
                    <span></span>
                    <h3>{day}</h3>
                  </div>
                </div>

                <div className="film-calendar-event">
                  {films.map((film, index) => (
                    <FilmCard key={index} film={film} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

export default FilmCalendarList;