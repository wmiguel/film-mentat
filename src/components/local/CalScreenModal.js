import React from "react";
import { db } from "../../firebase/firebase";
import { deleteDoc, doc } from "firebase/firestore";
import ScreeningFilmCard from "../calendar/ScreeningFilmCard";
import FilmCover from "../calendar/FilmCover";

const CalScreenModal = ({ closeModal, screenData }) => {

  // Delete Film
  const deleteFilm = async () => {
    await deleteDoc(doc(db, "films", screenData.id));
    closeModal();
  };

  return (
    <>
      <FilmCover closeModal={closeModal} screen={screenData} />
      <div className="filmModal-details">
        {screenData.about === null ? (
          <></>
        ) : (
          <div className="overview">
            <p>{screenData.about}</p>
          </div>
        )}
        <div className="film-stats">
          <div className="series">
            <p>Screening Lineup</p>
          </div>
        </div>
        {screenData.movies.length === 0 ? null : (
          <div className="screening-card">
            {screenData.movies.length > 1
              ? screenData.movies.map((movie, index) => (
                  <ScreeningFilmCard movie={movie} key={index} />
                ))
              : screenData.movies.map((movie, soloIndex) => (
                  <ScreeningFilmCard movie={movie} key={soloIndex} />
                ))}
          </div>
        )}
        <div className="film-update-buttons">
          <button className="delete" onClick={() => deleteFilm()}>
            Delete
          </button>
          <a href={`${screenData.url}`} rel="noreferrer" target="_blank">
            Buy Tickets
          </a>
        </div>
      </div>
    </>
  );
};

export default CalScreenModal;