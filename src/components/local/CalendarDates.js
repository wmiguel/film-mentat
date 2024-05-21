import React, { useState } from "react";
import dayjs from "dayjs";

function EventDates({
  films,
  dates,
  setFilterFilms,
  highlightSeries,
  setDateSelected,
  setFilterSeries,
}) {
  const today = dayjs().format("YYYY-MM-DD");
  const tomorrow = dayjs().add(1, "day").format("YYYY-MM-DD");
  const [highlight, highlightDate] = useState(null);

  const dateSelected = (date, index) => {
    highlightDate(index);
    highlightSeries(null);
    setDateSelected(date);
    if (date == null) {
      setFilterFilms(films);
      setFilterSeries(films);
    } else {
      const filterDate = films.filter((movie) => {
        const dateSelected = movie.date === date;
        return dateSelected;
      });
      setFilterFilms(filterDate);
      setFilterSeries(filterDate);
    }
  };

  return (
    <div className="event-dates">
      <div
        className={`${highlight === null ? "highlight" : ""}`}
        onClick={() => dateSelected(null, null)}
      >
        <p>All</p>
      </div>
      {dates.map((date, index) => {
        const screenDate = dayjs(date).format("YYYY-MM-DD");
        if (screenDate < today) {
          return null;
        }
        if (screenDate === today) {
          return (
            <div
              key={index}
              className={`${highlight === index ? "highlight" : ""}`}
              onClick={() => dateSelected(date, index)}
            >
              <p>Today</p>
            </div>
          );
        }
        if (screenDate === tomorrow) {
          return (
            <div
              key={index}
              className={`${highlight === index ? "highlight" : ""}`}
              onClick={() => dateSelected(date, index)}
              style={{ cursor: "pointer" }}
            >
              <p>Tomorrow</p>
            </div>
          );
        }
        return (
          <div
            key={index}
            className={`${highlight === index ? "highlight" : ""}`}
            onClick={() => dateSelected(date, index)}
            style={{ cursor: "pointer" }}
          >
            <p>{dayjs(screenDate).format("ddd M/D")}</p>
          </div>
        );
      })}
    </div>
  );
}

export default EventDates;
