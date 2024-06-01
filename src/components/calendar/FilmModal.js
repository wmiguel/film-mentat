import React, { useState, useEffect } from "react";
import UserModal from "./UserModal";
import ScreeningModal from "../local/ScreeningModal";
import SearchModal from "../local/SearchModal";
import { db } from "../../firebase/firebase";
import {
  doc, getDoc
} from "firebase/firestore";


const FilmModal = ({
  film,
  event,
  search,
  openModal,
  setOpenModal,
  openFilmDetails,
  openEventDetails,
  openSearchDetails,
  filterSeries,
}) => {
  const [filmData, setFilmData] = useState(null);
  const [eventData, setEventData] = useState(null);
  const [searchData, setSearchData] = useState(null);
  const open = openModal ? "open-modal" : "close-modal";
  const opacityDelay = openModal ? "opacity-100" : "opacity-0";

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
    setFilmData(null);
    setEventData(null);
    setSearchData(null);
    openFilmDetails("");
    openEventDetails("");
    openSearchDetails("");
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
          backgroundColor: "var(--sinbad)",
          overscrollBehavior: "contain",
        }}
      >
        <div
          className={`modal-body-container ${opacityDelay}`}
          style={{
            backgroundColor: "var(--sinbad)",
            // padding: "24px 24px 64px",
            borderRadius: "48px 48px 0 0",
            boxSizing: "border-box",
            height: "99%",
            display: "flex",
            flexDirection: "column",
            gap: "0",
            top: "0",
            position: "absolute",
          }}
        >
          {eventData ? (
            <ScreeningModal closeModal={closeModal} eventData={eventData} />
          ) : (
            <></>
          )}
          {filmData ? (
            <UserModal
              filterSeries={filterSeries}
              film={film}
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
