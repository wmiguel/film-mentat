import React, { useState, useEffect } from "react";
import { zeitgeists } from "../api/moviesRequests";
import dayjs from "dayjs";

import CardTicket from "../images/ticket-background.svg";
import { ReactComponent as TicketSVG } from "../images/empty-ticket.svg";
import NavigationBar from "../components/navbar/Navigation";


const Local = ({ openEventDetails }) => {
  const [screenings, setScreenings] = useState([]);
  const [filterFilms, setFilterFilms] = useState([]);
  const [filterPlaces, setFilterPlaces] = useState([]);

  const [screeningDates, setScreeningDates] = useState([]);
  const [date, setDate] = useState();
  const [highlight, highlightPlace] = useState(null);
  const [displayAll, setDisplayAll] = useState(true);

  useEffect(() => {
    const getZeitgeist = async () => {
      const response = await zeitgeists();

      const allScreenings = response;
      allScreenings.sort((a, b) =>
        dayjs(a.startDate).isAfter(dayjs(b.startDate)) ? 1 : -1
      );
      setScreenings(allScreenings);
      setFilterFilms(allScreenings);
      setFilterPlaces(allScreenings);

      const allScreeningDates = new Set(
        allScreenings.map((movie) =>
          dayjs(movie.startDate).format("YYYY-MM-DD")
        )
      );
      const sortAllScreeningDates = [...allScreeningDates].sort((a, b) =>
        dayjs(a).isAfter(dayjs(b)) ? 1 : -1
      );
      setScreeningDates(sortAllScreeningDates);
    };
    getZeitgeist();
  }, []);

  function groupFilmsByMonth(screenings) {
    const groupedFilms = {};
    screenings.forEach((screening) => {
      const dayOfWeek = dayjs(screening.startDate).format("ddd");
      const monthKey = dayjs(screening.startDate).format("YYYY-M");
      if (!groupedFilms[monthKey]) {
        groupedFilms[monthKey] = {
          month: dayjs(screening.startDate).format("MMM"),
          year: dayjs(screening.startDate).format("YYYY"),
          days: {},
        };
      }
      const dayKey = dayjs(screening.startDate).format("D");
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
      <>
        <NavigationBar
          title="Screening"
          screenings={screenings}
          dates={screeningDates}
          setFilterFilms={setFilterFilms}
          highlightPlace={highlightPlace}
          setDate={setDate}
          setFilterPlaces={setFilterPlaces}
          setDisplayAll={setDisplayAll}
          filterPlaces={filterPlaces}
          highlight={highlight}
          date={date}
        />
        <section className={`film-calendar-list flex`}>
          <div className="content-wrap">
            {displayAll === false ? (
              <div
                className="film-calendar-event"
                style={{ padding: "24px 0" }}
              >
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
                          <div className="film-series flex">
                            {screen.worksPresented.length > 1 ? (
                              screen.worksPresented.length === 2 ? (
                                <span>Double Feature</span>
                              ) : screen.worksPresented.length === 3 ? (
                                <span>Triple Feature</span>
                              ) : (
                                screen.worksPresented.length > 3 && (
                                  <span>Marathon</span>
                                )
                              )
                            ) : (
                              <></>
                            )}
                          </div>
                          <div className="title-year show">
                            <h4>{screen.name}</h4>
                          </div>
                          <div className="rating-duration-location">
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
                                  <div className="film-series flex">
                                    {screen.worksPresented.length > 1 ? (
                                      screen.worksPresented.length === 2 ? (
                                        <span>Double Feature</span>
                                      ) : screen.worksPresented.length === 3 ? (
                                        <span>Triple Feature</span>
                                      ) : (
                                        screen.worksPresented.length > 3 && (
                                          <span>Marathon</span>
                                        )
                                      )
                                    ) : (
                                      <></>
                                    )}
                                  </div>
                                  <div className="title-year show">
                                    {/* <div className="title">{screen.name}</div> */}
                                    <h4>{screen.name}</h4>
                                  </div>
                                  <div className="rating-duration-location">
                                    <p>
                                      {dayjs(screen.startDate).format("hh:mma")}
                                      {" • "}
                                      {screen.place.name}
                                    </p>
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
      </>
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