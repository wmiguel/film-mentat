import React from "react";
import FilmResultPoster from "./FilmResultPoster";
import FilmResultText from "./FilmResultText";


const FilmResult = ({ film }) => {
  // console.log(film.release_date.split("-"));
  // const parts = film.release_date.split("-");
  // const release_year = parts[0];
  // console.log(film);
  if (film !== undefined) {
    const parts = film.release_date.split("-");
    const release_year = parts[0];
    // console.log(film);
    return (
      <div className="film-result grid">
        <FilmResultPoster resultPoster={film.poster_path} />
        <FilmResultText
        resultTitle={film.title}
        resultYear={release_year}
        />
      </div>
    );
  } else {
    console.log("poop");
  }
};

export default FilmResult;