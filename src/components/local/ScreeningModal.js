import React from "react";
import { auth, db } from "../../firebase/firebase"
import { addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import ScreeningFilmCard from "../calendar/ScreeningFilmCard";
import FilmCover from "../calendar/FilmCover";

const ScreeningModal = ({ closeModal, eventData }) => {

  const navigate = useNavigate();
  function handleClick() {
    navigate("/calendar");
  }

  const addScreening = async (eventData) => {
    const { uid } = auth.currentUser;
    await addDoc(collection(db, "films"), {
      uid,
      title: eventData.name,
      year: dayjs(eventData.startDate).format("YYYY"),
      poster: "",
      backdrop: "",
      series: "",
      format: "",
      tmdbID: "",
      about: eventData.about,
      movies: eventData.worksPresented,
      date: dayjs(eventData.startDate).format("YYYY-MM-DD"),
      time: dayjs(eventData.startDate).format("h:mma"),
      url: eventData.url,
      place: eventData.place.name,
      type: "screening",
    });
    closeModal();
    handleClick();
  };

  return (
    <>
      <FilmCover closeModal={closeModal} screenData={eventData} />
      <div className="filmModal-details">
        {eventData.about === null ? (
          <></>
        ) : (
          <div className="overview">
            <p>{eventData.about}</p>
          </div>
        )}
        <div className="film-stats">
          <div className="series">
            <p>Screening Lineup</p>
          </div>
        </div>
        {eventData.worksPresented.length === 0 ? null : (
          <div className="screening-card">
            {eventData.worksPresented.length > 1
              ? eventData.worksPresented.map((movie, index) => (
                  <ScreeningFilmCard movie={movie} key={index} />
                ))
              : eventData.worksPresented.map((movie, soloIndex) => (
                  <ScreeningFilmCard movie={movie} key={soloIndex} />
                ))}
          </div>
        )}
        <div className="film-update-buttons">
          <button className="delete" onClick={() => addScreening(eventData)}>
            Add to Calendar
          </button>
          <a href={`${eventData.url}`} rel="noreferrer" target="_blank">
            Buy Tickets
          </a>
        </div>
      </div>
    </>
  );
};

export default ScreeningModal;