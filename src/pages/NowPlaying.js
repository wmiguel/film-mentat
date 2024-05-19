import React, { useState, useEffect } from "react";
import { requestNowPlaying } from "../api/moviesRequests";

function FilmCalendarList() {
  const [resultsList, setResultsList] = useState([]);
  // const [pagination, setPagination] = useState(1);

  useEffect(() => {
    nowplayingList(1, "US");
  }, []);

  const nowplayingList = async (pageNum, region) => {
    const response = await requestNowPlaying({ page: pageNum, region: region });
    setResultsList(response.data.results);
  };
  return (
    <section className={`film-calendar-list flex`}>
      <div className="content-wrap">
        <div className="film-calendar-event">
          <div className="month-wrap">
            <div className="film-calendar-month flex">
              <h2>Now Playing</h2>
            </div>
            <div className="day-wrap grid">
              <div className="film-calendar-day film-date">
                <div className="film-date-border grid">
                  <span>May</span>
                  <h3>23</h3>
                </div>
              </div>
              <div className="film-calendar-event">
                <div className="fm-movie-card">
                  <div className="container">
                    <figure
                      style={{
                        backgroundImage: `url("https://image.tmdb.org/t/p/w200/t5v2Zsb5sa6PSP9jMUWY4GdIb3c.jpg")`,
                      }}
                    ></figure>

                    <div className="details">
                      <div className="title-year">
                        <div className="title">Fantastic Mr. Fox</div>
                        <div className="year">2009</div>
                      </div>
                      <div className="director">
                        <p>directed by Quentin Taran slasdfasdfaasstino</p>
                      </div>
                      <div className="rating-duration-location">
                        <p>PG-13 • 9999 min • Aero Theatreasdfasdf</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="film-calendar-event">
          <div className="month-wrap">
            <div className="film-calendar-month flex">
              <h2>Now Playing</h2>
            </div>
            <div className="day-wrap grid">
              <div className="film-calendar-day film-date">
                <div className="film-date-border grid">
                  <span></span>
                  {/* <h3>23</h3> */}
                </div>
              </div>
              <div className="film-calendar-event">
                {resultsList.map((screen, index) => (
                  <div key={index} className="fm-movie-card">
                    <div className="container">
                      <figure
                        style={{
                          backgroundImage: `url("https://image.tmdb.org/t/p/w200/${screen.poster_path}")`,
                        }}
                      ></figure>

                      <div className="details">
                        <div className="title-year">
                          <div className="title">
                            {/* <h4> */}
                            {screen.title}
                            {/* </h4> */}
                          </div>
                          <div className="year">2024</div>
                        </div>

                        <div className="director">
                          <p>directed by Quentin Tarantino</p>
                        </div>

                        <div className="rating-duration-location">
                          <p>
                            Released:{" "}
                            {
                              new Date(screen.release_date)
                                .toISOString()
                                .split("T")[0]
                            }
                          </p>
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
