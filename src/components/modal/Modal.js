import React, { useState, useEffect } from "react";
import { db } from "../../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import Movie from "./Movie";
import Result from "./Result";
import Screening from "./Screening";
import CalScreening from "./CalScreening";

const Modal = ({
  event,
  movie,
  seriesList,
  open,
  openMovieDetails,
  openEventDetails,
  openSearchDetails,
  openScreenDetails,
  screen,
  search,
  openModal,
}) => {
  const [movieData, setMovieData] = useState(null);
  const [eventData, setEventData] = useState(null);
  const [screenData, setScreenData] = useState(null);
  const [searchData, setSearchData] = useState(null);

  const openClose = open ? "open-modal" : "close-modal";
  const opacityDelay = open ? "opacity-100" : "opacity-0";

  const { id, overview, directors, rating, duration } = movie;

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

  useEffect(() => {
    if (!screen || typeof screen !== "object") {
      return;
    }
    if (!screen.movies || typeof screen.movies !== "object") {
      return;
    }
    setScreenData(screen);
  }, [screen]);

  useEffect(() => {
    if (!search || typeof search !== "object") {
      return;
    }
    setSearchData(search);
  }, [search]);

  useEffect(() => {
    if (!id || typeof id !== "string") {
      return;
    }
    const getData = async () => {
      try {
        const docRef = doc(db, "films", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setMovieData(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    };
    getData();
  }, [id]);

  const clearModal = () => {
    openEventDetails("");
    openMovieDetails("");
    openScreenDetails([]);
    openSearchDetails("");
    setEventData(null);
    setMovieData(null);
    setScreenData(null);
    setSearchData(null);
  };
  const closeModal = () => {
    openModal(false);
    setTimeout(function () {
      clearModal();
    }, 250);
  };

  return (
    <>
      <section className={`modal ${openClose}`}>
        <div className={`${opacityDelay}`}>
          {eventData ? (
            <Screening closeModal={closeModal} eventData={eventData} />
          ) : null}
          {screenData ? (
            <CalScreening closeModal={closeModal} screenData={screenData} />
          ) : null}
          {movieData ? (
            <Movie
              id={id}
              overview={overview}
              directors={directors}
              rating={rating}
              duration={duration}
              closeModal={closeModal}
              movieData={movieData}
              seriesList={seriesList}
            />
          ) : null}
          {searchData ? (
            <Result
              closeModal={closeModal}
              seriesList={seriesList}
              searchData={searchData}
            />
          ) : null}
        </div>
      </section>
    </>
  );
};

export default Modal;