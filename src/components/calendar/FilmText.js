import React from "react";
import { useState, useEffect } from "react";
import EditMovie from "./EditMovie";
import Movie from "./Movie";
const OMDB_API = process.env.REACT_APP_OMDB_APIKEY;

const FilmText = ({ film, newFilmID }) => {
  const [filmDuration, setFilmDuration] = useState([]);
  const [filmDirector, setFilmDirector] = useState([]);
  const [filmRating, setFilmRating] = useState([]);
  const [todoEditing, setTodoEditing] = useState(null);

  useEffect(() => {
    const getFilmRequest = async (newFilmID) => {
      const url = `https://www.omdbapi.com/?apikey=${OMDB_API}&i=${newFilmID}`;
      const response = await fetch(url);
      const responseJson = await response.json();
      // console.log(responseJson);
      setFilmDirector(responseJson.Director);
      setFilmDuration(responseJson.Runtime);
      setFilmRating(responseJson.Rated);
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