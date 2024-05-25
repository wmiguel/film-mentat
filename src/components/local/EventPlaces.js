import React from "react";

const EventPlaces = ({
  filterPlaces,
  highlight,
  highlightPlace,
  date,
  setFilterFilms,
}) => {
  const allPlaces = new Set(filterPlaces.map((movie) => movie.place.name));
  const sortAllPlaces = [...allPlaces].sort();

  const placeSelected = (place, index) => {
    highlightPlace(index);
    if (place == null) {
      if (date == null) {
        setFilterFilms(filterPlaces);
      } else {
        setFilterFilms(filterPlaces);
      }
    } else {
      const filterDate = filterPlaces.filter((movie) => {
        const placeSelected = movie.place.name === place;
        return placeSelected;
      });
      if (date == null) {
        setFilterFilms(filterDate);
      } else {
        setFilterFilms(filterDate);
      }
    }
  };
  return (
    <div className="event-places">
      <div
        onClick={() => placeSelected(null, null)}
        className={`${highlight == null ? "highlight" : ""}`}
        id="all"
      >
        <p>All</p>
      </div>
      {sortAllPlaces.map((place, index) => (
        <div
          key={index}
          className={`${highlight === index ? "highlight" : ""}`}
          onClick={() => placeSelected(place, index)}
        >
          <p>{place}</p>
        </div>
      ))}
    </div>
  );
}
export default EventPlaces;