import React, { useState, useEffect } from "react";
import UserModal from "./UserModal";
import ScreeningModal from "../local/ScreeningModal";
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
  openFilmDetails,
  openEventDetails,
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
    setFilmData(null); // Clear filmData
    setEventData(null);
    openFilmDetails("");
    openEventDetails("");
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
          backgroundColor: "rgba(1,1,1,0.8)",
          overscrollBehavior: "contain",
        }}
      >
        <div
          className={`modal-body-container ${opacityDelay}`}
          style={{
            backgroundColor: "var(--sinbad)",
            padding: "24px 24px 64px",
            borderRadius: "48px 48px 0 0",
            boxSizing: "border-box",
            height: "99%",
            display: "flex",
            flexDirection: "column",
            gap: "32px",
            bottom: "0",
            position: "absolute",
            // opacity: "0.35",
          }}
        >
          {eventData ? (
            <ScreeningModal closeModal={closeModal} eventData={eventData} />
          ) : (
            <></>
          )}
          {filmData ? (
            <UserModal
              film={film}
              filmData={filmData}
              setTodoEditing={setTodoEditing}
              setOpenModal={setOpenModal}
              handleCloseModal={handleCloseModal}
            />
          ) : (
            // <>
            //   <div
            //     className={`fm-movie-card modal`}
            //     style={{
            //       backgroundImage: `url("https://image.tmdb.org/t/p/w1280${filmData.backdrop}")`,
            //       borderRadius: "20px",
            //     }}
            //   ></div>

            //   <div
            //     className={`container modal-container`}
            //     style={{ padding: "0" }}
            //   >
            //     <div
            //       className="film-event-details"
            //       style={{
            //         display: "grid",
            //         gridTemplateColumns: "1fr 3fr",
            //         gap: "24px",
            //         marginBottom: "24px",
            //       }}
            //     >
            //       <figure
            //         style={{
            //           backgroundImage: `url("https://image.tmdb.org/t/p/w1280${filmData.poster}")`,
            //           backgroundPosition: "center",
            //           backgroundRepeat: "no-repeat",
            //           backgroundSize: "contain",
            //           aspectRatio: "1 / 1.47",
            //           borderRadius: "20px",
            //         }}
            //       ></figure>
            //       <div className="the-details">
            //         <p>{dayjs(filmData.date).format("dddd, MMM DD YYYY")}</p>
            //         <h1>
            //           {filmData.title} <span>{filmData.year}</span>
            //         </h1>
            //         <span>{filmData.series}</span>
            //         <p>{filmData.format}</p>
            //       </div>
            //     </div>
            //     <div className="details">
            //       <EditMovie
            //         film={film}
            //         filmData={filmData}
            //         setTodoEditing={setTodoEditing}
            //         setOpenModal={setOpenModal}
            //         handleCloseModal={handleCloseModal}
            //       />
            //     </div>
            //   </div>
            // </>
            <></>
          )}
        </div>
      </section>
    </>
  );
};

export default FilmModal;
