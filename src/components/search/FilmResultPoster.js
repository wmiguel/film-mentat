import React from "react";

const FilmResultPoster = ({ resultPoster }) => {
  return (
    <div className="film-poster">
      {resultPoster && (
        <div
          className="film-poster-img"
          style={{
            backgroundImage: `url("https://image.tmdb.org/t/p/w1280${resultPoster}")`,
          }}
        ></div>
      )}
    </div>
  );
};

export default FilmResultPoster;