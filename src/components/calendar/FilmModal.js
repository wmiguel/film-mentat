import React, { useState, useEffect } from "react";
import UserModal from "./UserModal";
import ScreeningModal from "../local/ScreeningModal";
import CalScreenModal from "../local/CalScreenModal";
import SearchModal from "../local/SearchModal";
import { db } from "../../firebase/firebase";
import {
  doc, getDoc
} from "firebase/firestore";


const FilmModal = ({
  film,
  event,
  search,
  screen,
  openModal,
  setOpenModal,
  openFilmDetails,
  openEventDetails,
  openSearchDetails,
  openScreenDetails,
  filterSeries,
}) => {
  const [filmData, setFilmData] = useState(null);
  const [eventData, setEventData] = useState(null);
  const [screenData, setScreenData] = useState(null);
  const [searchData, setSearchData] = useState(null);
  const open = openModal ? "open-modal" : "close-modal";
  const opacityDelay = openModal ? "opacity-100" : "opacity-0";
  const { id, filmOverview, filmDirector, filmRating, filmDuration } = film;

  useEffect(() => {
    if (!search || typeof search !== "object") {
      return;
    }
    // if (!search.backdrop_path !== "undefined") {
    //   return;
    // }
    setSearchData(search);
  }, [search]);

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
    if (!id || typeof id !== "string") {
      return;
    }

    const getData = async () => {
      try {
        const docRef = doc(db, "films", id);
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
  }, [id]);

  const handleCloseModal = () => {
    setFilmData(null);
    setEventData(null);
    setSearchData(null);
    setScreenData(null);
    openFilmDetails("");
    openEventDetails("");
    openSearchDetails("");
    openScreenDetails([]);
  };
  const closeModal = () => {
    setOpenModal(false);
    setTimeout(function () {
      handleCloseModal();
    }, 250);
  };

  return (
    <>
      <section
        className={`fm-details ${open}`}
        style={{
          borderRadius: "0",
          backgroundColor: "var(--light-blue)",
          overscrollBehavior: "contain",
        }}
      >
        <div className={`${opacityDelay}`}>
          {eventData ? (
            <ScreeningModal closeModal={closeModal} eventData={eventData} />
          ) : (
            <></>
          )}
          {screenData ? (
            <CalScreenModal closeModal={closeModal} screenData={screenData} />
          ) : (
            <></>
          )}
          {filmData ? (
            <UserModal
              filterSeries={filterSeries}
              filmOverview={filmOverview}
              filmDirector={filmDirector}
              filmDuration={filmDuration}
              filmRating={filmRating}
              film={id}
              filmData={filmData}
              setOpenModal={setOpenModal}
              closeModal={closeModal}
              handleCloseModal={handleCloseModal}
            />
          ) : (
            <></>
          )}
          {searchData ? (
            <SearchModal
              filterSeries={filterSeries}
              searchData={searchData}
              closeModal={closeModal}
            />
          ) : (
            <></>
          )}
        </div>
      </section>
    </>
  );
};

export default FilmModal;
