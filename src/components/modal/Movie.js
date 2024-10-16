import React, { useState } from "react";
import Cover from "../calendar/Cover";
import EditMovie from "../calendar/EditMovie";

const Movie = ({
  id,
  movieData,
  directors,
  duration,
  overview,
  rating,
  seriesList,
  closeModal,
}) => {
  const [toEdit, setToEdit] = useState(null);
  return (
    <>
      <Cover
        closeModal={closeModal}
        movieData={movieData}
        setToEdit={setToEdit}
        directors={directors}
        
        backdrop={movieData.backdrop}
        id={movieData.uid}
        date={movieData.date}
        title={movieData.title}
        year={movieData.year}
      />

      <div className="modal-details flex">
        {toEdit === movieData.uid ? (
          <EditMovie
            id={id}
            movieData={movieData}
            seriesList={seriesList}
            closeModal={closeModal}
          />
        ) : (
          <>
            <div className="stats flex">
              <div className="series">
                <p>{movieData.series}</p>
              </div>
              <div className="rating-duration-format">
                <p>
                  {rating} • {duration} mins{" "}
                  {movieData.format ? <>{"• " + movieData.format}</> : null}
                </p>
              </div>
            </div>
            <div className="overview">
              <p>{overview}</p>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Movie;