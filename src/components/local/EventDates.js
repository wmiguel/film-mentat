import React, { useState } from "react";
import dayjs from "dayjs";
var utc = require("dayjs/plugin/utc");
dayjs.extend(utc);

function EventDates({
  dates,
  highlightPlace,
  setDate,
  setDisplayAll,
  zeitgeistsRequest,
}) {
  const today = dayjs().format("YYYY-MM-DD");
  const tomorrow = dayjs().add(1, "day").format("YYYY-MM-DD");
  const [highlight, highlightDate] = useState(null);

  const dateSelected = (date, index) => {
    highlightDate(index);
    highlightPlace(null);
    setDate(date);
    if (date == null) {
      setDisplayAll(true);
      zeitgeistsRequest();
    } else {
      const startofDay = dayjs(date).startOf("day").format();
      const endofDay = dayjs(date).endOf("day").format();
      setDisplayAll(false);
      zeitgeistsRequest(startofDay, endofDay);
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
