import dayjs from "dayjs";

function EventDates({
  dateHighlight,
  dateSelectedFormating,
  setDateHighlight,
  modifiedScreeningDates,
  startOfDayISO,
  tomorrowStartISO,
}) {
  const calendarDate = (dateString) => {
    const date = dayjs(dateString).format("ddd M/D");
    return date;
  };

  // console.log(startOfDayISO);

  return (
    <div className="event-dates">
      <div
        className={`${dateHighlight === null ? "highlight" : ""}`}
        // onClick={() => dateSelectedFormating(null, null)}
        style={{ cursor: "pointer" }}
      >
        <p>All</p>
      </div>
      {modifiedScreeningDates.map((date, index) => {
        // if (date < startOfDayISO) {
        //   return null;
        // }
        if (date === startOfDayISO) {
          return (
            <div
              key={index}
              className={`${dateHighlight === index ? "highlight" : ""}`}
              // onClick={() => dateSelectedFormating(date, index)}
              style={{ cursor: "pointer" }}
            >
              <p>Today</p>
            </div>
          );
        }
        if (date === tomorrowStartISO) {
          return (
            <div
              key={index}
              className={`${dateHighlight === index ? "highlight" : ""}`}
              // onClick={() => dateSelectedFormating(date, index)}
              style={{ cursor: "pointer" }}
            >
              <p>Tomorrow</p>
            </div>
          );
        }
        return (
          <div
            key={index}
            className={`${dateHighlight === index ? "highlight" : ""}`}
            // onClick={() => dateSelectedFormating(date, index)}
            style={{ cursor: "pointer" }}
          >
            <p>{calendarDate(date)}</p>
          </div>
        );
      })}
    </div>
  );
}

export default EventDates;
