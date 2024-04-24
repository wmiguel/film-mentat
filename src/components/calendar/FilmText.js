import React from "react";
import { useState, useEffect } from "react";
import EditMovie from "./EditMovie";
import Movie from "./Movie";
// const OMDB_API = process.env.REACT_APP_OMDB_APIKEY;
const tmdb_apiKey = "276c1cf8bcdd1f7d884c8fecfa7c3e8d";

const FilmText = ({ film, newFilmID }) => {
  const [filmDuration, setFilmDuration] = useState([]);
  const [filmDirector, setFilmDirector] = useState([]);
  const [filmRating, setFilmRating] = useState([]);
  const [todoEditing, setTodoEditing] = useState(null);
  const [imdbID, setIMDbID] = useState([]);

  useEffect(() => {
    const getFilmRequest = async (newFilmID) => {
      const url = `https://api.themoviedb.org/3/movie/${newFilmID}?api_key=${tmdb_apiKey}&append_to_response=release_dates,credits`;
      const response = await fetch(url);
      const responseJson = await response.json();


      const director = responseJson.credits.crew.find(
        (element) => element.job === "Director"
      );
      setFilmDirector(director.name);

      const us_rating = responseJson.release_dates.results.find(
        (element) => element.iso_3166_1 === "US"
      );
      const rating = us_rating.release_dates.find(
        (rated) => rated.type === "1"
      );
      console.log(rating);
      // setFilmRating();

      setFilmDuration(responseJson.runtime);
      // setFilmRating(responseJson.Rated);
    };
    getFilmRequest(newFilmID);
  }, [newFilmID]);


  

  return (
    <div className="film-text">
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