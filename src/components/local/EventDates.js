import React, { useState } from "react";
import dayjs from "dayjs";

const EventDates = ({
  screenings,
  dates,
  setFilterFilms,
  highlightPlace,
  setDate,
  setFilterPlaces,
  setDisplayAll,
}) => {
  const today = dayjs().format("YYYY-MM-DD");
  const tomorrow = dayjs().add(1, "day").format("YYYY-MM-DD");
  const [highlight, highlightDate] = useState(null);

  const dateSelected = (date, index) => {
    highlightDate(index);
    highlightPlace(null);
    setDate(date);
    if (date == null) {
      setFilterFilms(screenings);
      setFilterPlaces(screenings);
      setDisplayAll(true);
    } else {
      const startofDay = dayjs(date).startOf("day").format();
      const endofDay = dayjs(date).endOf("day").format();
      const dateScreenings = screenings.filter(
        (movie) =>
          dayjs(movie.startDate).startOf("day").format() >= startofDay &&
          dayjs(movie.startDate).endOf("day").format() <= endofDay
      );
      dateScreenings.sort(
        (a, b) => new Date(a.startDate) - new Date(b.startDate)
      );
      setFilterFilms(dateScreenings);
      setFilterPlaces(dateScreenings);
      setDisplayAll(false);
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
        if (date < today) {
          return null;
        }
        if (date === today) {
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
        if (date === tomorrow) {
          return (
            <div
              key={index}
              className={`${highlight === index ? "highlight" : ""}`}
              onClick={() => dateSelected(date, index)}
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
          >
            <p>{dayjs(date).format("ddd M/D")}</p>
          </div>
        );
      })}
    </div>
  );
}

export default EventDates;
