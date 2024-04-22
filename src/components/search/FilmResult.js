import React from "react";
import FilmResultPoster from "./FilmResultPoster";
import FilmResultText from "./FilmResultText";


const FilmResult = ({ film }) => {
  return (
    <div className="film-result">
      <FilmResultPoster resultPoster={film.Poster} />
      <FilmResultText resultTitle={film.Title} resultYear={film.Year} />
    </div>
  );
};

export default FilmResult;