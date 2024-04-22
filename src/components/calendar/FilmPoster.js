import React, { useState, useEffect } from "react";
import { requestFetchMovie } from "../../api/moviesRequests";

const FilmPoster = ({ filmPoster, filmID }) => {
  const [filmPosterID, setFilmPosterID] = useState("");
  const imdbID = filmID;
  const filmPosterIDURL = async (imdbID) => {
    const response = await requestFetchMovie({ imdbID });
    const poster = response.data.Poster;
    setFilmPosterID(poster);
  };
  useEffect(() => {
    filmPosterIDURL(imdbID);
  }, [imdbID]);

  return (
    <div className="film-poster">
      {filmPoster === "" ? (
        <div
          className="film-poster-img"
          style={{ backgroundImage: `url("${filmPoster}")` }}
        ></div>
      ) : (
        <div
          className="film-poster-img"
          style={{ backgroundImage: `url("${filmPosterID}")` }}
        ></div>
      )}
    </div>
  );
};

export default FilmPoster;
