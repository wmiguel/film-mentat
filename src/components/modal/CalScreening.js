import React from "react";
import { db } from "../../firebase/firebase";
import { deleteDoc, doc } from "firebase/firestore";
import ScreeningCardDetails from "../calendar/ScreeningCardDetails";
import Cover from "../calendar/Cover";
import DeleteButton from "../buttons/DeleteButton";

const CalScreening = ({ closeModal, screenData }) => {

  const removeScreening = async () => {
    await deleteDoc(doc(db, "films", screenData.id));
    closeModal();
  };

  

  return (
    <>
      <Cover
        closeModal={closeModal}
        screen={screenData}

        backdrop={screenData.backdrop}
        date={screenData.date}
        title={screenData.title}
        time={screenData.time}
        place={screenData.place}
      />
      <div className="modal-details flex">
        {screenData.about === null ? null : (
          <div className="overview">
            <p>{screenData.about}</p>
          </div>
        )}
        <div className="stats flex">
          <div className="series">
            <p>Screening Lineup</p>
          </div>
        </div>
        {screenData.movies.length === 0 ? null : (
          <div className="screening-lineup flex">
            {screenData.movies.length > 1
              ? screenData.movies.map((movie, index) => (
                  <ScreeningCardDetails movie={movie} key={index} />
                ))
              : screenData.movies.map((movie, soloIndex) => (
                  <ScreeningCardDetails movie={movie} key={soloIndex} />
                ))}
          </div>
        )}
        <div className="buttons flex">
          <DeleteButton text={"Remove Event"} action={removeScreening} />
          <a href={`${screenData.url}`} rel="noreferrer" target="_blank">
            Buy Tickets
          </a>
        </div>
      </div>
    </>
  );
};

export default CalScreening;