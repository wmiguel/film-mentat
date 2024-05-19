import React  from "react";

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
      <div className="title-year show">
        <div className="title">
          {/* <h4> */}
          {film.title}
          {/* </h4> */}
        </div>
        <div className="year">
          {/* <span> */}
          {film.year}
          {/* </span> */}
        </div>
      </div>
      <div className="director">
        <p>directed by {filmDirector}</p>
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
