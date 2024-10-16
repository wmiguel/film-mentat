import React, { useState } from "react";
import dayjs from "dayjs";

const Dates = ({
  movies,
  screenings,
  dates,
  filterMovies,
  setSecondHighlight,
  selectDate,
  setSecondFilter,
  viewAll,
}) => {
  const data = movies || screenings;
  const today = dayjs().format("YYYY-MM-DD");
  const tomorrow = dayjs().add(1, "day").format("YYYY-MM-DD");
  const [highlight, highlightDate] = useState(null);

  const dateSelected = (date, index) => {
    highlightDate(index);
    setSecondHighlight(null); // setSecondHighlight()
    selectDate(date);
    if (date == null) {
      filterMovies(data);
      setSecondFilter(data);
      viewAll(true);
    } else {

      if (movies) {
        const filteredDate = data.filter((movie) => {
          const dateSelected = movie.date === date;
          return dateSelected;
        });

        filterMovies(filteredDate);
        setSecondFilter(filteredDate);
      }
      if (screenings) {
        const startofDay = dayjs(date).startOf("day").format();
        const endofDay = dayjs(date).endOf("day").format();
        const filteredDate = data.filter(
          (movie) =>
            dayjs(movie.startDate).startOf("day").format() >= startofDay &&
            dayjs(movie.startDate).endOf("day").format() <= endofDay
        );
        filteredDate.sort((a, b) =>
          dayjs(a.startDate).isAfter(dayjs(b.startDate)) ? 1 : -1
        );
        filterMovies(filteredDate);
        setSecondFilter(filteredDate);
      }
      viewAll(false);
    }
  };

  return (
    <div className="event-dates flex">
      <div
        className={`${highlight === null ? "highlight" : ""}`}
        onClick={() => dateSelected(null, null)}
      >
        <p>All Dates</p>
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
};

export default Dates;