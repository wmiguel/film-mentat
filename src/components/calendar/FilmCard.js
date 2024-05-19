import React, { useState, useEffect } from "react";
import Movie from "./Movie";
// import FilmModal from "./FilmModal";
import CardTicket from "../../images/card-ticket.svg";
const tmdb_apiKey = process.env.REACT_APP_TMDB_APIKEY;

const FilmCard = ({
  film,
  index,
  pauseScroll,
  setPauseScroll,
  openModal,
  setOpenModal,
  openFilmDetails,
  setTodoEditing,
}) => {
  const [filmDuration, setFilmDuration] = useState([]);
  const [filmDirector, setFilmDirector] = useState([]);
  const [filmRating, setFilmRating] = useState([]);
  // const [todoEditing, setTodoEditing] = useState(null);
  // const [filmDetails, setFilmDetails] = useState(false);
  // const [openModal, setOpenModal] = useState(false);
  const filmID = film.tmdbID;

  useEffect(() => {
    const getFilmRequest = async (filmID) => {
      const url = `https://api.themoviedb.org/3/movie/${filmID}?api_key=${tmdb_apiKey}&append_to_response=release_dates,credits,watch/providers`;
      const response = await fetch(url);
      const responseJson = await response.json();
      const director = responseJson.credits.crew.find(
        (element) => element.job === "Director"
      );

      try {
        const certification = responseJson.release_dates.results.find(
          (country) => country.iso_3166_1 === "US"
        );
        const pickRating = certification.release_dates.find(
          (rates) => rates.type === 3 || rates.type === 5 || rates.type === 4
        );
        setFilmRating(pickRating.certification);
      } catch (error) {
        setFilmRating("NR");
      }

      setFilmDirector(director.name);
      setFilmDuration(responseJson.runtime);
    };
    getFilmRequest(filmID);
  }, [filmID]);

  // const openFilmDetails = () => {
  //   setPauseScroll(!pauseScroll);
  //   setTodoEditing(film.id);
  //   setOpenModal(!openModal);
  // };
  // console.log(filmDetails);

  return (
    <>
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
              setTodoEditing={setTodoEditing}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default FilmCard;
