import React, { Fragment } from "react";
import { auth, db } from "../../firebase/firebase"
import { addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import ScreeningCardDetails from "../calendar/ScreeningCardDetails";
import Cover from "../calendar/Cover";
import AddScreeningButton from "../buttons/AddScreeningButton";

const Screening = ({ closeModal, eventData }) => {

  console.log(eventData);
  
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
      <Cover 
        closeModal={closeModal} 
        screenData={eventData}

        screeningDate={eventData.startDate}
        title={eventData.name}
        place={eventData.place.name}
      />

      <div className="modal-details flex">

        {eventData.about === null ? null : (
          <div className="overview">
            <p>{eventData.about}</p>
          </div>
        )}

        <div className="stats flex">
          <div className="series">
            <p>Screening Lineup</p>
          </div>
        </div>

        {eventData.worksPresented.length === 0 ? null : (
          <div className="screening-lineup flex">
            {eventData.worksPresented.length > 1
              ? eventData.worksPresented.map((movie, index) => (
                  <Fragment key={index}>
                    <ScreeningCardDetails movie={movie} key={index} />
                  </Fragment>
                ))
              : eventData.worksPresented.map((movie, soloIndex) => (
                  <Fragment key={soloIndex}>
                    <ScreeningCardDetails movie={movie} />
                  </Fragment>
                ))}
          </div>
        )}

        <div className="buttons flex">
          <a href={`${eventData.url}`} rel="noreferrer" target="_blank">
            Buy Tickets
          </a>
          <AddScreeningButton
            addScreening={addScreening}
            eventData={eventData}
          />
        </div>

      </div>
    </>
  );
};

export default Screening;