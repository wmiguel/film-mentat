import React from "react";

const SecondFilter = ({
  places,
  seriesList,
  highlight,
  setSecondHighlight,
  dateSelected,
  filterMovies,
}) => {
  const filterChosen = seriesList || places;
  const fieldSet = seriesList
    ? new Set(seriesList.map((movie) => movie.series))
    : null || places ? new Set(places.map((movie) => movie.place.name)) : null;
  const fieldSorted = [...fieldSet].sort();

  const secondItemSelected = (item, index) => {
    setSecondHighlight(index);
    if (item == null) {
      if (dateSelected == null) {
        filterMovies(filterChosen);
      } else {
        filterMovies(filterChosen);
      }
    } else {
      const filterDate = filterChosen.filter((movie) => {
        const itemSelected = seriesList
          ? movie.series === item
          : null || places
          ? movie.place.name === item
          : null;
        return itemSelected;
      });

      if (dateSelected == null) {
        filterMovies(filterDate);
      } else {
        filterMovies(filterDate);
      }
    }
  };

  return (
    <>
      {places ? (
        <>
          {fieldSorted.length === 1 ? null : (
            <div className="event-places flex">
              <div
                onClick={() => secondItemSelected(null, null)}
                className={`${highlight === null ? "highlight" : ""}`}
              >
                <p>All Locations</p>
              </div>
              {fieldSorted.map((item, index) => {
                if (item === "") {
                  return null;
                }
                return (
                  <div
                    key={index}
                    className={`${highlight === index ? "highlight" : ""}`}
                    onClick={() => secondItemSelected(item, index)}
                  >
                    <p>{item}</p>
                  </div>
                );
              })}
            </div>
          )}
        </>
      ) : null}

      {seriesList ? (
        <>
          {fieldSorted.length === 1 && fieldSorted[0] === "" ? null : (
            <div className="event-places flex">
              <div
                onClick={() => secondItemSelected(null, null)}
                className={`${highlight === null ? "highlight" : ""}`}
              >
                <p>All Series</p>
              </div>
              {fieldSorted.map((item, index) => {
                if (item === "") {
                  return null;
                }
                return (
                  <div
                    key={index}
                    className={`${highlight === index ? "highlight" : ""}`}
                    onClick={() => secondItemSelected(item, index)}
                  >
                    <p>{item}</p>
                  </div>
                );
              })}
            </div>
          )}
        </>
      ) : null}
    </>
  );
};

export default SecondFilter;
