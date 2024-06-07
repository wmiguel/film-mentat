import React from "react";
// import Movie from "./Movie";

const FilmResultText = ({ resultTitle, resultYear }) => {
  return (
    <div className="film-text grid">
      <div className="film-info">
        <div className="film-title-year flex">
          <h4>
            {resultTitle} <span className="film--year">{resultYear}</span>
          </h4>
        </div>
      </div>
    </div>
  );
};
export default FilmResultText;