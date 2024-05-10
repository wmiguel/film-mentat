import React from "react";

const FilmEventDate = ({ filmEventDate }) => {
  const parts = filmEventDate.split("-");
  const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const date = new Date(parts[0], parts[1] - 1, parts[2]);
  const dayDate = date.getDate();
  const dayNumber = date.getDay();
  const dayName = weekday[dayNumber];

  return (
    <div className="film-date">
      <div className="film-date-border grid">
        <span>{dayName}</span>
        <h3>{dayDate}</h3>
      </div>
    </div>
  );
};

export default FilmEventDate;