function CalendarSeries({ calendarSeries }) {

  // console.log(calendarSeries);

  return (
    <div className="event-dates">
      <div
      // className={`${dateHighlight === null ? "highlight" : ""}`}
      // onClick={() => dateSelectedFormating(null, null)}
      // style={{ cursor: "pointer" }}
      >
        <p>All</p>
      </div>
      {calendarSeries.map((series, index) => {
        // if (date < startOfDayISO) {
        //   return null;
        // }
        if (series === "") {
          return null;
        }
        return (
          <div
            key={index}
            // className={`${dateHighlight === index ? "highlight" : ""}`}
            // onClick={() => dateSelectedFormating(date, index)}
            // style={{ cursor: "pointer" }}
          >
            <p>{series}</p>
          </div>
        );
      })}
    </div>
  );
}

export default CalendarSeries;
