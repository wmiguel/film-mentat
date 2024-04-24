import React from "react";
// import FilmEventDate from "./FilmEventDate";
import FilmText from "./FilmText";
import FilmPoster from "./FilmPoster";

const FilmEvent = ({ film }) => {
  return (
    <div className="film-event">
      <FilmPoster filmID={film.tmdbID} filmPoster={film.poster} />
      <FilmText film={film} newFilmID={film.tmdbID} />
    </div>
  );
};

export default FilmEvent;