import React from "react";

const FilmSeries = ({ series }) => {
  return (
    <div className="film-series flex">
      <span>{series}</span>
    </div>
  );
};

export default FilmSeries;