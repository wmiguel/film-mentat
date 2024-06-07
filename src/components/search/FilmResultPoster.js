import React from "react";

const FilmResultPoster = ({ resultPoster }) => {
  return (
    <>
      {(resultPoster && (
        <figure
          style={{
            backgroundImage: `url("https://image.tmdb.org/t/p/w1280${resultPoster}")`,
          }}
        ></figure>
      )) || <figure></figure>}
    </>
  );
};

export default FilmResultPoster;