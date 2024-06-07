import React from "react";
import dayjs from "dayjs";
import FilmResultPoster from "./FilmResultPoster";
import FilmResultText from "./FilmResultText";


const FilmResult = ({ film }) => {
  if (film !== undefined) {
    if (film.release_date !== undefined) {
      const release_year = dayjs(film.release_date).format("YYYY");
      return (
        <div className="film-result">
          <FilmResultPoster resultPoster={film.poster_path} />
          <FilmResultText film={film} resultTitle={film.title} resultYear={release_year} />
        </div>
      );
    } else {
      return (
        <div className="film-result">
          <FilmResultPoster resultPoster={film.poster_path} />
          <FilmResultText film={film} resultTitle={film.title} />
        </div>
      );
    }
    
  }
};

export default FilmResult;