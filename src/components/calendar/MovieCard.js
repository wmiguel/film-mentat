import React, { useState, useEffect } from "react";
import MovieDetails from "./MovieDetails";
import CardTicket from "../../images/ticket-background.svg";
import { fetchMovieDetails } from "../../api/moviesRequests";

const MovieCard = ({
  movie,
  screen,
  poster,
  index,
  openMovieDetails,
  openScreenDetails,
  openEventDetails,
}) => {
  const screening = movie ? movie.type === "screening" : null;
  const personal = movie ? movie.type === "personal" : null;

  const [directors, setDirectors] = useState([]);
  const [duration, setDuration] = useState([]);
  const id = movie ? movie.id : null;
  const [overview, setOverview] = useState([]);
  const [rating, setRating] = useState([]);
  const tmdbID = movie ? movie.tmdbID : null;  

  useEffect(() => {
    const fetchTMDB = async (tmdbID) => {
      const response = await fetchMovieDetails(tmdbID);
      try {
        const resDirector = response.credits.crew.filter(
          (crew) => crew.job === "Director"
        );
        setDirectors(resDirector);
      } catch (error) {}

      try {
        const certification = response.release_dates.results.find(
          (country) => country.iso_3166_1 === "US"
        );
        const pickRating = certification.release_dates.find(
          (rates) => rates.type === 3 || rates.type === 5 || rates.type === 4
        );
        setRating(pickRating.certification);
      } catch (error) {
        setRating("NR");
      }
      setDuration(response.runtime);
      setOverview(response.overview);
    };
    if (personal) {
      fetchTMDB(tmdbID);
    }
    if (screening) {
      return;
    }
  }, [tmdbID, personal, screening]);

  const shortFilm = { directors, duration, id, overview, rating };

  // const viewWorks = screen.worksPresented.length > 0 ? screen.worksPresented : null;
  // console.log(viewWorks);

  return (
    <>
      {screen ? (
        <div
          className="movie-card flex"
          key={index}
          style={{ backgroundImage: `url(${CardTicket})` }}
          onClick={() => openEventDetails(screen)}
        >
          <div className={`container ${poster ? "poster" : "no-poster"}`}>
            {(poster && (
              <figure
                style={{
                  backgroundImage: `${
                    poster
                      ? `url("https://image.tmdb.org/t/p/w1280${poster}")`
                      : ""
                  }`,
                }}
              ></figure>
            )) ||
              null}
            <MovieDetails
              title={screen.name}
              screeningTime={screen.startDate}
              place={screen.place.name}
              works={screen.worksPresented}
            />
          </div>
        </div>
      ) : null}

      {screening ? (
        <div
          className="movie-card flex"
          key={index}
          style={{ backgroundImage: `url(${CardTicket})` }}
          onClick={() => openScreenDetails(movie)}
        >
          <div className={`container ${poster ? "poster" : "no-poster"}`}>
            {(poster && (
              <figure
                style={{
                  backgroundImage: `${
                    poster
                      ? `url("https://image.tmdb.org/t/p/w1280${poster}")`
                      : ""
                  }`,
                }}
              ></figure>
            )) ||
              null}
            <MovieDetails
              title={movie.title}
              time={movie.time}
              place={movie.place}
              works={movie.movies}
            />
          </div>
        </div>
      ) : null}

      {personal ? (
        <div
          className="movie-card flex"
          key={index}
          style={{ backgroundImage: `url(${CardTicket})` }}
          onClick={() => openMovieDetails(shortFilm)}
        >
          <div className={`container ${poster ? "poster" : "no-poster"}`}>
            {(poster && (
              <figure
                style={{
                  backgroundImage: `${
                    poster
                      ? `url("https://image.tmdb.org/t/p/w1280${poster}")`
                      : ""
                  }`,
                }}
              ></figure>
            )) ||
              null}
            <MovieDetails
              movie={movie}
              title={movie.title}
              format={movie.format}
              series={movie.series}
              year={movie.year}
              duration={duration}
              rating={rating}
            />
          </div>
        </div>
      ) : null}
    </>
  );
};

export default MovieCard;