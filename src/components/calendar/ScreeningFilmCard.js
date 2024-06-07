import React from "react";

const ScreeningFilmCard = ({ movie, index }) => {

  return (
    <div key={index} className="container">
      <figure></figure>
      <div className="details">
        <div className="title-year">
          <h4>
            {movie.name}{" "}
            {movie.year === null ? (
              <></>
            ) : (
              <span className="film--year">{movie.year}</span>
            )}
          </h4>
        </div>
        {movie.director === null ? (
          <></>
        ) : (
          <div className="director">
            <p>directed by {movie.director}</p>
          </div>
        )}
        <div className="rating-duration-location">
          <p>
            {movie.duration === null ? "" : `${movie.duration} mins`}
            {movie.videoFormat === null ? "" : ` in ${movie.videoFormat}`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ScreeningFilmCard;
