import React  from "react";
import FilmEditEvent from "../buttons/FilmEditEvent";
import FilmSeries from "./FilmSeries";

const Movie = ({ film, filmDuration, filmDirector, filmRating, setTodoEditing }) => {
  return (
    <>
      <div className="film-info show">
        {film.series === "" ? <></> : <FilmSeries series={film.series} />}
        <div className="film-title-year flex">
          <h4>
            {film.title} <span>{film.year}</span>
          </h4>
        </div>

        <div className="film-series-format">
          {(film.series || film.format) === "" ? (
            <>
              <p>directed by {filmDirector}</p>
              <p>
                {filmRating} · {filmDuration} mins
              </p>
            </>
          ) : (
            <>
              <p>directed by {filmDirector}</p>
              <p>
                {filmRating} · {filmDuration} mins · {film.format}
              </p>
            </>
          )}
        </div>
      </div>

      <FilmEditEvent filmID={film.id} setTodoEditing={setTodoEditing} />
    </>
  );
};
export default Movie;
