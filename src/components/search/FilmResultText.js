import React from "react";
// import Movie from "./Movie";+

const FilmText = ({ resultTitle, resultYear }) => {
  return (
    <div className="film-text">
      <div className="film-info">
        <div className="film-title-year">
          <h4>{resultTitle} </h4>
          <span style={{ color: "white" }}>{resultYear}</span>
        </div>
      </div>
    </div>
  );
};
export default FilmText;
