import React  from "react";
import FilmEditEvent from "../buttons/FilmEditEvent";

const Movie = ({ film, filmDuration, filmDirector, filmRating, setTodoEditing }) => {
  return (
    <>
      <div className="film-info show">
        <div className="film-title-year">
          <h4>{film.title}</h4>
          <span>{film.year}</span>
        </div>

        <div className="film-series-format">
          {(film.series && film.format) === "" ? (
            <>
              <p>directed by {filmDirector}</p>
              <p>{filmRating} · {filmDuration} mins</p>
            </>
          ) : (
            <>
              <p>directed by {filmDirector}</p>
              <p>{filmRating} · {filmDuration} mins · {film.format}</p>
            </>
          )}
        </div>
      </div>

      <FilmEditEvent filmID={film.id} setTodoEditing={setTodoEditing} />
    </>
  );
};
export default Movie;
