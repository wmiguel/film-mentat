import React from "react";

const ScreeningCardDetails = ({ movie }) => {
  console.log(movie.poster);
  return (
    <div className="container no-poster">
      {movie.poster ?
        <figure style={{ backgroundImage: `${movie.poster ? `url("${movie.poster}")` : ""}`, }} ></figure> :
        <figure></figure>}
      <div className="details flex">
        <div className="title-year">
          <h4>
            {movie.name}{" "}
            {movie.year === null ? null : (
              <span className="year">{movie.year}</span>
            )}
          </h4>
        </div>
        {movie.director === null ? null : (
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

export default ScreeningCardDetails;