import React from "react";

const FilmResultPoster = ({ resultPoster }) => {
  return (
    <div className="film-poster">
      <div
        className="film-poster-img"
        style={{ backgroundImage: `url("${resultPoster}")` }}
      ></div>
    </div>
  );
};

export default FilmResultPoster;