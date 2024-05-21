import React, { useState, useEffect } from "react";
import EditMovie from "./EditMovie";
import { db } from "../../firebase/firebase";
import {
  doc, getDoc
} from "firebase/firestore";
import dayjs from "dayjs";
var weekday = require("dayjs/plugin/weekday");
var localeData = require("dayjs/plugin/localeData");
dayjs.extend(localeData);
dayjs.extend(weekday);


const FilmModal = ({
  film,
  event,
  setTodoEditing,
  openModal,
  setOpenModal,
  pauseScroll,
  setPauseScroll,
  openFilmDetails,
}) => {
  const [filmData, setFilmData] = useState(null);
  const [eventData, setEventData] = useState(null);
  const open = openModal ? "open-modal" : "close-modal";
  const opacityDelay = openModal ? "opacity-100" : "opacity-0";

  useEffect(() => {
    if (!event || typeof event !== "object") {
      return;
    }
    if (!event.place || typeof event.place !== "object") {
      return;
    }
    if (!event.worksPresented || typeof event.worksPresented !== "object") { 
      return;
    }
    setEventData(event);
  }, [event]);
  // console.log(eventData);

  useEffect(() => {
    if (!film || typeof film !== "string") {
      return;
    }

    const getData = async () => {
      try {
        const docRef = doc(db, "films", film);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setFilmData(docSnap.data());
          // console.log("Document data:", docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    };
    getData();
  }, [film]);

  const handleCloseModal = () => {
    console.log("activated");
    setFilmData(null); // Clear filmData
    setEventData(null);
    openFilmDetails("");
  };

  // Cancel Edit
  const cancelEditFilm = () => {
    setOpenModal(false);
    setPauseScroll(false);
    setTimeout(function () {
      handleCloseModal();
    }, 250);
  };

  console.log(filmData);

  return (
    <>
      <section
        className={`fm-details ${open}`}
        style={{ borderRadius: "36px 36px 0 0" }}
      >
        <div
          className={`modal-body-container ${opacityDelay}`}
          style={{
            padding: "16px",
            boxSizing: "border-box",
          }}
        >
          {eventData ? (
            <>
              <div
                className={`container modal-container`}
                style={{ border: "1px solid blue" }}
              >
                <div className="details" style={{marginBottom: "24px"}}>
                  <div className="film-info film-edit show">
                    <div className="film-title-year">
                      <h1>
                        <strong>{eventData.name}</strong>
                      </h1>
                      <br />
                      {eventData.worksPresented.map((movie, index) => (
                        <>
                          <div key={index} style={{ marginBottom: "24px" }}>
                            <h1>
                              {movie.name} <span>{movie.year}</span>
                            </h1>
                            <h4>directed by {movie.director}</h4>
                            <p>
                              {movie.duration}mins in {movie.format}
                            </p>
                          </div>
                        </>
                      ))}
                    </div>
                    <div>
                      <p>{eventData.place.name}</p>
                      <p>{eventData.place.address}</p>
                      <h2>
                        {dayjs(eventData.startDate).format(
                          "dddd, MMMM DD • h:mma"
                        )}
                      </h2>
                      <br />
                      <a
                        href={`${eventData.url}`}
                        rel="noreferrer"
                        target="_blank"
                      >
                        Get Tickets
                      </a>
                    </div>
                  </div>
                </div>
                <div className="film-update-buttons">
                  <button className="cancel" onClick={() => cancelEditFilm()}>
                    Cancel
                  </button>
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
          {filmData ? (
            <>
              <div
                className={`fm-movie-card modal`}
                style={{
                  backgroundImage: `url("https://image.tmdb.org/t/p/w1280${filmData.backdrop}")`,
                  borderRadius: "20px",
                }}
              ></div>

              <div
                className={`container modal-container`}
                style={{ padding: "0" }}
              >
                <div
                  className="film-event-details"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 3fr",
                    gap: "24px",
                    marginBottom: "24px",
                  }}
                >
                  <figure
                    style={{
                      backgroundImage: `url("https://image.tmdb.org/t/p/w1280${filmData.poster}")`,
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "contain",
                      aspectRatio: "1 / 1.47",
                      borderRadius: "20px",
                    }}
                  ></figure>
                  <div className="the-details">
                    <p>{dayjs(filmData.date).format("dddd, MMM DD YYYY")}</p>
                    <h1>
                      {filmData.title} <span>{filmData.year}</span>
                    </h1>
                    <span>{filmData.series}</span>
                    <p>{filmData.format}</p>
                  </div>
                </div>
                <div className="details">
                  <EditMovie
                    film={film}
                    filmData={filmData}
                    setTodoEditing={setTodoEditing}
                    setOpenModal={setOpenModal}
                    pauseScroll={pauseScroll}
                    setPauseScroll={setPauseScroll}
                    handleCloseModal={handleCloseModal}
                  />
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </section>
    </>
  );
};

export default FilmModal;
