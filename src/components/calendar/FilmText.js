import React from "react";
import { useState, useEffect } from "react";
import EditMovie from "./EditMovie";
import Movie from "./Movie";
const tmdb_apiKey = process.env.REACT_APP_TMDB_APIKEY;

const FilmText = ({ film, newFilmID }) => {
  const [filmDuration, setFilmDuration] = useState([]);
  const [filmDirector, setFilmDirector] = useState([]);
  const [filmRating, setFilmRating] = useState([]);
  const [todoEditing, setTodoEditing] = useState(null);

  useEffect(() => {
    const getFilmRequest = async (newFilmID) => {
      const url = `https://api.themoviedb.org/3/movie/${newFilmID}?api_key=${tmdb_apiKey}&append_to_response=release_dates,credits,watch/providers`;
      const response = await fetch(url);
      const responseJson = await response.json();

      const director = responseJson.credits.crew.find(
        (element) => element.job === "Director"
      );
      const certification = responseJson.release_dates.results.find(
        (country) => country.iso_3166_1 === "US"
      );
      const pickRating = certification.release_dates.find(
        (rates) => rates.type === 3 || rates.type === 5 || rates.type === 4
      );
      setFilmRating(pickRating.certification);
      setFilmDirector(director.name);
      setFilmDuration(responseJson.runtime);
    };
    getFilmRequest(newFilmID);
  }, [newFilmID]);

  return (
    <div className="film-text grid">
      {todoEditing === film.id ? (
        <EditMovie film={film} setTodoEditing={setTodoEditing} />
      ) : (
        <Movie
          film={film}
          filmDuration={filmDuration}
          filmDirector={filmDirector}
          filmRating={filmRating}
          setTodoEditing={setTodoEditing}
        />
      )}
    </div>
  );
};
export default FilmText;