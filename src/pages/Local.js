import React, { useState, useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";

import CardTicket from "../images/card-ticket-outline.svg";
import EventDates from "../components/local/EventDates";
import EventPlaces from "../components/local/EventPlaces";
import { ReactComponent as TicketSVG } from "../images/empty-ticket.svg";
// import { auth, db } from "../firebase/firebase";
// import { addDoc, collection } from "firebase/firestore";
const zeitgeistsAuth = process.env.REACT_APP_ZEITGEISTS_AUTHORIZATION;

const Local = ({ openEventDetails }) => {
  const [screenings, setScreenings] = useState([]);
  const [filterFilms, setFilterFilms] = useState([]);
  const [filterPlaces, setFilterPlaces] = useState([]);

  const [screeningDates, setScreeningDates] = useState([]);
  const [date, setDate] = useState();
  const [highlight, highlightPlace] = useState(null);
  const [displayAll, setDisplayAll] = useState(true);

  const screeningDatesFormatted = screeningDates.map((dateStr) => {
    const date = new Date(dateStr);
    const dateFormat = dayjs(date).startOf("day").format("YYYY-MM-DD");
    return dateFormat;
  });

  // const addtoCalendar = async (screen) => {
  //   const screeningInfo = [screen];
  //   const { uid } = auth.currentUser;
  //   await addDoc(collection(db, "screenings"), {
  //     uid,
  //     title: screeningInfo[0].name,
  //     year: "",
  //     poster: "",
  //     backdrop: "",
  //     series: "",
  //     format: "",
  //     tmdbID: "",
  //     date: screeningInfo[0].startDate,
  //     address: screeningInfo[0].address,
  //     eventlink: screeningInfo[0].url,
  //     completed: false,
  //   });
  // };

  const zeitgeistsRequest = async () => {
    let page = 1;
    const allResults = [];
    const pageSize = 100;
    let hasMorePages = true;

    while (hasMorePages) {
      const config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `https://zeitgeists.org/api/v1/listings?type=Screening&page=${page}`,
        headers: {
          Authorization: zeitgeistsAuth,
        },
      };
      try {
        const response = await axios.request(config);
        const results = response.data.data.listings;
        allResults.push(...results);
        hasMorePages = results.length === pageSize;
        page += 1;
      } catch (error) {
        console.log(error);
        hasMorePages = false;
      }
    }

    const allScreenings = allResults;
    allScreenings.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
    setScreenings(allScreenings);
    setFilterFilms(allScreenings);
    setFilterPlaces(allScreenings);
    const allScreeningDates = new Set(
      allResults.map((movie) => movie.startDate.split("T")[0])
    );
    const sortAllScreeningDates = [...allScreeningDates].sort(
      (a, b) => new Date(a) - new Date(b)
    );
    setScreeningDates(sortAllScreeningDates);
  };

  useEffect(() => {
    zeitgeistsRequest();
  }, []);

  function parseDate(dateString) {
    const date = dayjs(dateString).format("YYYY-MM-DD");
    const [year, month, day] = date.split("-");
    return {
      year: parseInt(year),
      month: parseInt(month),
      day: parseInt(day),
    };
  }

  function groupFilmsByMonth(screenings) {
    const groupedFilms = {};
    screenings.forEach((screening) => {
      const { year, month, day } = parseDate(screening.startDate);
      const dateObj = new Date(year, month - 1, day);
      const dayOfWeek = dateObj.toLocaleDateString("en-US", {
        weekday: "short",
      });
      const monthKey = `${year}-${month}`;
      if (!groupedFilms[monthKey]) {
        groupedFilms[monthKey] = {
          month: dayjs([month]).format("MMM"),
          year: year,
          days: {},
        };
      }
      const dayKey = `${day}`;
      if (!groupedFilms[monthKey].days[dayKey]) {
        groupedFilms[monthKey].days[dayKey] = { dayOfWeek, screenings: [] };
      }
      groupedFilms[monthKey].days[dayKey].screenings.push(screening);
    });
    return groupedFilms;
  }
  function sortFilmsByMonth(screening) {
    return Object.entries(screening).sort((a, b) => {
      const [yearA, monthA] = a[0].split().map(Number);
      const [yearB, monthB] = b[0].split().map(Number);
      if (yearA !== yearB) {
        return yearA - yearB;
      } else {
        return monthA - monthB;
      }
    });
  }
  function organizeFilmsByMonth(screenings) {
    const groupedFilms = groupFilmsByMonth(screenings);
    const sortedFilms = sortFilmsByMonth(groupedFilms);

    const organizedFilms = sortedFilms.map(([key, value]) => {
      const monthData = value;
      const monthWithDayOfWeek = Object.entries(monthData.days).map(
        ([day, dayData]) => {
          const { dayOfWeek, screenings } = dayData;
          return { day, dayOfWeek, screenings };
        }
      );
      return {
        month: monthData.month,
        year: monthData.year,
        days: monthWithDayOfWeek,
      };
    });

    return organizedFilms;
  }
  const organizedFilms = organizeFilmsByMonth(filterFilms);

  if (filterFilms.length !== 0) {
    return (
      <section className={`film-calendar-list flex`}>
        <div className="film-event-filter">
          <EventDates
            screenings={screenings}
            dates={screeningDatesFormatted}
            setFilterFilms={setFilterFilms}
            highlightPlace={highlightPlace}
            setDate={setDate}
            setFilterPlaces={setFilterPlaces}
            setDisplayAll={setDisplayAll}
          />
          <EventPlaces
            filterPlaces={filterPlaces}
            highlight={highlight}
            highlightPlace={highlightPlace}
            date={date}
            setFilterFilms={setFilterFilms}
          />
        </div>
        <div className="content-wrap">
          {displayAll === false ? (
            <div style={{ padding: "24px 16px 0" }}>
              {filterFilms.length ? (
                filterFilms.map((screen, index) => (
                  <div
                    key={index}
                    style={{ backgroundImage: `url(${CardTicket})` }}
                    onClick={() => openEventDetails(screen)}
                    className="fm-movie-card"
                  >
                    <div className="container">
                      <figure></figure>
                      <div className="details">
                        <div className="film-series-format">
                          <p>
                            {dayjs(screen.startDate).format(
                              "dddd, MMMM DD, YYYY • hh:mma"
                            )}
                          </p>
                        </div>
                        <div className="title-year show">
                          <div className="title">{screen.name}</div>
                        </div>
                        <div className="rating-duration-location">
                          <p></p>
                          <p>{screen.place.name}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="empty-wrap" style={{ height: "calc(68vh)" }}>
                  <div className="dash-border">
                    <div className="empty-text">
                      <div className="empty-ticket">
                        <TicketSVG />
                      </div>
                      <h1>No Movies Scheduled!</h1>
                      <h3>Add your next movie event.</h3>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              {organizedFilms.map((monthData, index) => (
                <div key={index} className="month-wrap">
                  <div className="film-calendar-month flex">
                    <h2>
                      {monthData.month} {monthData.year}
                    </h2>
                  </div>
                  {Object.entries(monthData.days).map(([day, dayData]) => (
                    <div key={day} className="day-wrap grid">
                      <div className="film-calendar-day film-date">
                        <div className="film-date-border grid">
                          <span>{dayData.dayOfWeek}</span>
                          <h3>{dayData.day}</h3>
                        </div>
                      </div>

                      <div className="film-calendar-event">
                        {dayData.screenings.map((screen, index) => (
                          <div
                            key={index}
                            style={{ backgroundImage: `url(${CardTicket})` }}
                            onClick={() => openEventDetails(screen)}
                            className="fm-movie-card"
                          >
                            <div className="container">
                              <figure></figure>
                              <div className="details">
                                <div className="film-series-format">
                                  {screen.worksPresented.length > 1 ? (
                                    screen.worksPresented.length === 2 ? (
                                      <p>Double Feature</p>
                                    ) : screen.worksPresented.length === 3 ? (
                                      <p>Triple Feature</p>
                                    ) : (
                                      screen.worksPresented.length > 3 && (
                                        <p>Marathon</p>
                                      )
                                    )
                                  ) : (
                                    <></>
                                  )}
                                  <p>
                                    {dayjs(screen.startDate).format(
                                      "dddd, MMMM DD, YYYY • hh:mma"
                                    )}
                                  </p>
                                </div>
                                <div className="title-year show">
                                  <div className="title">{screen.name}</div>
                                </div>
                                <div className="rating-duration-location">
                                  <p></p>
                                  <p>{screen.place.name}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </>
          )}
        </div>
      </section>
    );
  } else {
    return (
      <section id="film-calendar-list" className={`film-calendar-list flex`}>
        <div className="empty-wrap">
          <div className="dash-border">
            <div className="empty-text">
              <div className="empty-ticket">
                <TicketSVG />
              </div>
              <h1>Loading!</h1>
              <h3>Please wait...</h3>
            </div>
          </div>
        </div>
      </section>
    );
  }
};
export default Local;