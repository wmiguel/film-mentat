import React, { useState, useEffect } from "react";
import EditMovie from "./EditMovie";
import { db } from "../../firebase/firebase";
import {
  doc, getDoc
} from "firebase/firestore";

const FilmModal = ({
  film,
  setTodoEditing,
  openModal,
  setOpenModal,
  pauseScroll,
  setPauseScroll,
  openFilmDetails,
}) => {
  const [filmData, setFilmData] = useState(null);
  const open = openModal ? "open-modal" : "close-modal";
  const opacityDelay = openModal ? "opacity-100" : "opacity-0";

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
    setOpenModal(false); // Close the modal
    setFilmData(null); // Clear filmData
    openFilmDetails("");
  };

  return (
    <>
      <section className={`fm-details ${open}`}>
        <div className="modal-body-container">
          {filmData ? (
            <>
              <div
                className={`fm-movie-card modal ${opacityDelay}`}
                style={{
                  backgroundImage: `url("https://image.tmdb.org/t/p/w1280${filmData.backdrop}")`,
                }}
              ></div>

              <div className={`container modal-container ${opacityDelay}`}>
                <figure
                  style={{
                    backgroundImage: `url("https://image.tmdb.org/t/p/w1280${filmData.poster}")`,
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    aspectRatio: "1 / 1.47",
                  }}
                ></figure>
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
            "Loading..."
          )}
        </div>
      </section>
    </>
  );
};

export default FilmModal;
