import React, { useState, useEffect } from "react";
import axios from "axios";
import { auth, db } from "../firebase/firebase";
import { addDoc, collection } from "firebase/firestore";

function FilmCalendarList() {
  const [screening, setScreening] = useState([]);

  const addtoCalendar = async (screen) => {
    const screeningInfo = [screen];
    const { uid } = auth.currentUser;

    await addDoc(collection(db, "screenings"), {
      uid,
      title: screeningInfo[0].name,
      year: "",
      poster: "",
      backdrop: "",
      series: "",
      format: "",
      tmdbID: "",
      date: screeningInfo[0].startDate,
      address: screeningInfo[0].address,
      eventlink: screeningInfo[0].url,
      completed: false,
    });
  };

  useEffect(() => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "https://zeitgeists.org/api/v1/listings?type=Screening&id=997bf957-1ca1-45a7-acaa-fdea163c05ea",
      headers: {
        Authorization:
          "uYKG97gkcwW601bqyYRjAI2HYGpOkCw3foLLMV9HmHJh5vpU8mI9Ruzh",
      },
    };

    const getScreeningRequest = async () => {
      await axios.request(config).then((response) => {
        const results = response.data.data.listings;
        // console.log(results);
        setScreening(results);
      }).catch((error) => {
        console.log(error);
      });
    };
    getScreeningRequest();
  }, []);




  return (
    <section style={{ marginTop: "80px" }}>
      {screening.map((screen, index) => (
        <div
          key={index}
          style={{
            color: "black",
            border: "1px solid black",
            marginBottom: "24px",
            width: "800px",
            cursor: "pointer",
            backgroundColor: "white"
          }}
          onClick={() => addtoCalendar(screen)}
        >
          <p>{new Date(screen.startDate).toISOString().split("T")[0]}</p>
          <p>{new Date(screen.startDate).toISOString().split("T")[1]}</p>
          {/* <p>{screen.startDate}</p> */}
          <h1 style={{ fontSize: "24px" }}>
            <strong>{screen.name}</strong>
          </h1>
          <p>{screen.place.name}</p>
          <p>{screen.place.address}</p>
          <a href={screen.url}>Event Info</a>
        </div>
      ))}
    </section>
  );
}
export default FilmCalendarList;