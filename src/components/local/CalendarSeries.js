function CalendarSeries({
  filterSeries,
  highlight,
  highlightSeries,
  dateSelected,
  setFilterFilms,
}) {
  const testFilter = new Set(filterSeries.map((movie) => movie.series));
  const arraytestFilter = [...testFilter];

  const seriesSelected = (series, index) => {
    highlightSeries(index);
    if (series == null) {
      
      if (dateSelected == null) {
        setFilterFilms(filterSeries);
      } else {
        setFilterFilms(filterSeries);
      }
    } else {
      
      const filterDate = filterSeries.filter((movie) => {
        const seriesSelected = movie.series === series;
        return seriesSelected;
      });
      if (dateSelected == null) {
        setFilterFilms(filterDate);
      } else {
        setFilterFilms(filterDate);
      }
    }
  };

  return (
    <div className="event-places">
      <div
        onClick={() => seriesSelected(null, null)}
        className={`${highlight === null ? "highlight" : ""}`}
      >
        <p>All</p>
      </div>
      {arraytestFilter.map((series, index) => {
        if (series === "") {
          return null;
        }
        return (
          <div
            key={index}
            className={`${highlight === index ? "highlight" : ""}`}
            onClick={() => seriesSelected(series, index)}
          >
            <p>{series}</p>
          </div>
        );
      })}
    </div>
  );
}

export default CalendarSeries;
