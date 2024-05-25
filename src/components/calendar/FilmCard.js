import React, { useState, useEffect } from "react";
import Movie from "./Movie";
import CardTicket from "../../images/card-ticket-outline.svg";
import { getFilmData } from "../../api/moviesRequests";

const FilmCard = ({ film, index, openFilmDetails }) => {
  const [filmDuration, setFilmDuration] = useState([]);
  const [filmDirector, setFilmDirector] = useState([]);
  const [filmRating, setFilmRating] = useState([]);
  const filmID = film.tmdbID;

  

  useEffect(() => {
    const gettingData = async (filmID) => {
      const response = await getFilmData(filmID);
      const director = response.credits.crew.filter(
        (crew) => crew.job === "Director"
      );
      try {
        const certification = response.release_dates.results.find(
          (country) => country.iso_3166_1 === "US"
        );
        const pickRating = certification.release_dates.find(
          (rates) => rates.type === 3 || rates.type === 5 || rates.type === 4
        );
        setFilmRating(pickRating.certification);
      } catch (error) {
        setFilmRating("NR");
      }
      setFilmDirector(director);
      setFilmDuration(response.runtime);
    };
    gettingData(filmID);
  }, [filmID]);

  return (
    <div
      className="fm-movie-card"
      key={index}
      style={{ backgroundImage: `url(${CardTicket})` }}
      onClick={() => openFilmDetails(film.id)}
    >
      <div className="container">
        {film.poster === "" ? (
          <figure></figure>
        ) : (
          <figure
            style={{
              backgroundImage: `url("https://image.tmdb.org/t/p/w1280${film.poster}")`,
            }}
          ></figure>
        )}
        <div className="details">
          <Movie
            film={film}
            filmDuration={filmDuration}
            filmDirector={filmDirector}
            filmRating={filmRating}
          />
        </div>
      </div>
    </div>
  );
};

export default FilmCard;
