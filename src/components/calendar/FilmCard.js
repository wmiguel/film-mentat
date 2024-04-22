import React from "react";
import FilmSeries from "./FilmSeries";
import FilmEvent from "./FilmEvent";

const FilmCard = ({ film, index }) => {
  
  return (
    <div className="film-card" key={index}>
      {film.series === "" ? <></> : <FilmSeries series={film.series} />}
      <FilmEvent film={film} />
    </div>
  );
};

export default FilmCard;