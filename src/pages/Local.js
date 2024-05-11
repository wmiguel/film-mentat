import React, { useState, useEffect } from "react";
import axios from "axios";
import { auth, db } from "../firebase/firebase";
import { addDoc, collection } from "firebase/firestore";

function FilmCalendarList({ pauseScroll }) {
  const [screening, setScreening] = useState([]);
  const pause = pauseScroll ? "pause-scroll" : "";

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
      // url: "https://zeitgeists.org/api/v1/listings?type=Screening&id=997bf957-1ca1-45a7-acaa-fdea163c05ea",
      url: "https://zeitgeists.org/api/v1/listings?type=Screening&page=2",
      headers: {
        Authorization:
          "uYKG97gkcwW601bqyYRjAI2HYGpOkCw3foLLMV9HmHJh5vpU8mI9Ruzh",
      },
    };

    const getScreeningRequest = async () => {
      await axios
        .request(config)
        .then((response) => {
          const results = response.data.data.listings;
          setScreening(results);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getScreeningRequest();
  }, []);

  return (
    <section
      className={`film-calendar-list flex ${pause}`}
    >
      <div className="content-wrap">
        <div className="film-calendar-event">
          <div className="month-wrap">
            <div className="film-calendar-month flex">
              {/* <h2>May 2024</h2> */}
            </div>
            <div className="day-wrap grid">
              <div className="film-calendar-day film-date">
                <div className="film-date-border grid">
                  <span></span>
                  {/* <h3>23</h3> */}
                </div>
              </div>
              <div className="film-calendar-event">
                {screening.map((screen, index) => (
                  <div
                    key={index}
                    style={{
                      // color: "black",
                      // border: "1px solid black",
                      // marginBottom: "24px",
                      cursor: "pointer",
                      // backgroundColor: "white",
                    }}
                    onClick={() => addtoCalendar(screen)}
                    className="film-card"
                  >
                    <div className="film-event grid cover-image">
                      <div className="film-poster">
                        <div className="film-poster-img"></div>
                      </div>
                      <div className="film-text grid">
                        <div className="film-info">
                          <div className="film-title-year flex">
                            <h4>
                              {screen.name}
                              <span></span>
                            </h4>
                          </div>
                          <div className="film-series-format">
                            <p>
                              {
                                new Date(screen.startDate)
                                  .toISOString()
                                  .split("T")[0]
                              }
                            </p>
                            <p>
                              {
                                new Date(screen.startDate)
                                  .toISOString()
                                  .split("T")[1]
                              }
                            </p>
                            <p>{screen.place.name}</p>
                            <p>{screen.place.address}</p>
                            {/* <a href={screen.url}>Event Info</a> */}
                            {/* <p>{screen.startDate}</p> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default FilmCalendarList;