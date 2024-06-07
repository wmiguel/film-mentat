import React, { useState, useEffect } from "react";
import Movie from "./Movie";
import CardTicket from "../../images/ticket-background.svg";
import { getFilmData } from "../../api/moviesRequests";

const FilmCard = ({ film, index, openFilmDetails, openScreenDetails }) => {
  const [filmRating, setFilmRating] = useState([]);
  const [filmDirector, setFilmDirector] = useState([]);
  const [filmDuration, setFilmDuration] = useState([]);
  const [filmOverview, setFilmOverview] = useState([]);
  const filmID = film.tmdbID;
  const id = film.id;

  const screening = film.type === "screening";
  const personal = film.type === "personal";

  useEffect(() => {
    const gettingData = async (filmID) => {
      const response = await getFilmData(filmID);
      try {
        const director = response.credits.crew.filter(
          (crew) => crew.job === "Director"
        );
        setFilmDirector(director);
      } catch (error) {}

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
      setFilmDuration(response.runtime);
      setFilmOverview(response.overview);
    };
    if (personal) {
      gettingData(filmID);
    }
    if (screening) {
      return;
    }
  }, [filmID, personal, screening]);

  return (
    <>
      {screening ? (
        <div
          className="fm-movie-card"
          key={index}
          style={{ backgroundImage: `url(${CardTicket})` }}
          onClick={() => openScreenDetails(film)}
        >
          <div className="container">
            <figure></figure>
            <div className="details">
              <Movie film={film} />
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
      {personal ? (
        <div
          className="fm-movie-card"
          key={index}
          style={{ backgroundImage: `url(${CardTicket})` }}
          onClick={() =>
            openFilmDetails({
              id,
              filmDirector,
              filmOverview,
              filmRating,
              filmDuration,
            })
          }
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
      ) : (
        <></>
      )}
    </>
  );
};

export default FilmCard;
