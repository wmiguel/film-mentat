import React from "react";
import FilmResultPoster from "./FilmResultPoster";
import FilmResultText from "./FilmResultText";


const FilmResult = ({ film }) => {
  const parts = film.release_date.split("-");
  const release_year = parts[0];

  return (
    <div className="film-result">
      <FilmResultPoster resultPoster={film.poster_path} />
      <FilmResultText resultTitle={film.title} resultYear={release_year} />
    </div>
  );
};

export default FilmResult;