import React, { Fragment } from "react";

const Movie = ({ film, filmDuration, filmDirector, filmRating }) => {

  const screening = film.type === "screening";
  const personal = film.type === "personal";
  
  return (
    <>
      {film.series === "" ? (
        <></>
      ) : (
        <div className="film-series flex">
          <span>{film.series}</span>
        </div>
      )}
      <div className="title-year">
        <h4>
          {film.title} <span className="film--year">{film.year}</span>
        </h4>
      </div>
      <div className="rating-duration-location">
        {screening ? (
          <p>
            {film.time} • {film.place}
          </p>
        ) : (
          <></>
        )}
        {personal ? (
          <p>
            {filmRating === "" ? "" : filmRating + " · "}
            {filmDuration} mins
            {film.format === "" ? "" : " · " + film.format}
          </p>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};
export default Movie;
