import React, { Fragment } from "react";

const Movie = ({ film, filmDuration, filmDirector, filmRating }) => {
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
        {/* <div className="title"> */}
        <h4>
          {film.title} <span className="film--year">{film.year}</span>
        </h4>
        {/* </div> */}
      </div>
      <div className="director">
        <p>
          directed by
          {filmDirector.length > 1
            ? filmDirector.map((director, index) => {
                if (index + 1 === 1) {
                  return <Fragment key={index}>{" " + director.name}</Fragment>;
                }
                if (index + 1 === filmDirector.length) {
                  return (
                    <Fragment key={index}>{" & " + director.name}</Fragment>
                  );
                } else {
                  return (
                    <Fragment key={index}>{" " + director.name + ","}</Fragment>
                  );
                }
              })
            : filmDirector.map((director, index) => (
                <Fragment key={index}>{" " + director.name}</Fragment>
              ))}
        </p>
      </div>
      <div className="rating-duration-location">
        <p>
          {filmRating === "" ? "" : filmRating + " · "}
          {filmDuration} mins
          {film.format === "" ? "" : " · " + film.format}
        </p>
      </div>
    </>
  );
};
export default Movie;
