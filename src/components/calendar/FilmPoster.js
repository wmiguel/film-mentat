import React, { useState, useEffect } from "react";
import { requestFetchMovie } from "../../api/moviesRequests";

const FilmPoster = ({ filmPoster, filmID }) => {
  const [filmPosterID, setFilmPosterID] = useState("");
  const tmdbID = filmID;
  const filmPosterIDURL = async (tmdbID) => {
    const response = await requestFetchMovie({ tmdbID });
    const poster = response.data.poster_path;
    setFilmPosterID(poster);
  };
  useEffect(() => {
    filmPosterIDURL(tmdbID);
  }, [tmdbID]);

  return (
    <div className="film-poster">
      {filmPoster === "" ? (
        <div
          className="film-poster-img"
          style={{
            backgroundImage: `url("https://image.tmdb.org/t/p/w1280${filmPoster}")`,
          }}
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
