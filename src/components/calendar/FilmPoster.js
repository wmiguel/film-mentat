import React from "react";

const FilmPoster = ({ filmPoster }) => {

  return (
    <div className="film-poster">
      {filmPoster === "" ? (
        <div
          className="film-poster-img"
          style={{
            backgroundImage: `url("")`,
          }}
        ></div>
      ) : (
        <div
          className="film-poster-img"
          style={{
            backgroundImage: `url("https://image.tmdb.org/t/p/w1280${filmPoster}")`,
          }}
        ></div>
      )}
    </div>
  );
};

export default FilmPoster;
