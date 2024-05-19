import React, { useState, useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";
import CardTicket from "../images/card-ticket.svg";
import EventDates from "../components/local/EventDates";
import EventPlaces from "../components/local/EventPlaces";
import { auth, db } from "../firebase/firebase";
import { addDoc, collection } from "firebase/firestore";
const zeitgeistsAuth = process.env.REACT_APP_ZEITGEISTS_AUTHORIZATION;


function Local({ pauseScroll }) {
  const [screening, setScreening] = useState([]);
  const [screeningDates, setScreeningDates] = useState([]);
  const [screeningPlaces, setScreeningPlaces] = useState([]);
  const [currentDateSelected, setCurrentDateSelected] = useState();
  const [dateHighlight, setDateHighlight] = useState(null);
  const [placeHighlight, setPlaceHighlight] = useState(null);
  const [calendarNoMonth, setCalendarNoMonth] = useState(false);
  const pause = pauseScroll ? "pause-scroll" : "";
  const allMonths = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

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

  const placeSelected = (placeSelected, index) => {
    setPlaceHighlight(index);
    if (placeSelected == null) {

      if (currentDateSelected == null) {
        getScreeningRequests(
          currentDateSelected,
          currentDateSelected,
          placeSelected
        );
      } else {
        const startofDate = new Date(currentDateSelected);
        startofDate.setHours(0, 0, 0, 0);
        const startofDateISO = startofDate.toISOString().split("Z")[0];

        const endofDate = new Date(currentDateSelected);
        endofDate.setHours(23, 59, 59, 999);
        const endofDateISO = endofDate.toISOString().split("Z")[0];
        getScreeningRequests(startofDateISO, endofDateISO, placeSelected);
      }
    } else {
      if (currentDateSelected == null) {
        getScreeningRequests(
          currentDateSelected,
          currentDateSelected,
          placeSelected
        );
      } else {
        const startofDate = new Date(currentDateSelected);
        startofDate.setHours(0, 0, 0, 0);
        const startofDateISO = startofDate.toISOString().split("Z")[0];

        const endofDate = new Date(currentDateSelected);
        endofDate.setHours(23, 59, 59, 999);
        const endofDateISO = endofDate.toISOString().split("Z")[0];
        getScreeningRequests(startofDateISO, endofDateISO, placeSelected);
      }
    }
  }

  const dateSelectedFormating = (dateSelected, index) => {
    setDateHighlight(index);
    setPlaceHighlight(null);
    setCurrentDateSelected(dateSelected);
    if (dateSelected == null) {
      setCalendarNoMonth(false);
      getScreeningRequests();
    } else {
      setCalendarNoMonth(true);
      const startofDate = new Date(dateSelected);
      startofDate.setHours(0, 0, 0, 0);
      const startofDateISO = startofDate.toISOString().split("Z")[0];

      const endofDate = new Date(dateSelected);
      endofDate.setHours(23, 59, 59, 999);
      const endofDateISO = endofDate.toISOString().split("Z")[0];

      getScreeningRequests(startofDateISO, endofDateISO);
    }
  }

  const getScreeningRequests = async (
    startofDateISO,
    endofDateISO,
    placeSelected
  ) => {
    console.log(startofDateISO);
    console.log(endofDateISO);
    console.log(placeSelected);
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

        // Check if there are more pages
        hasMorePages = results.length === pageSize;
        page += 1;
      } catch (error) {
        console.log(error);
        hasMorePages = false;
      }
    }

    // useState for all dates listed
    const resultScreeningDates = new Set(
      allResults.map((movie) => movie.startDate.split("T")[0])
    );
    const sortedDates = [...resultScreeningDates].sort(
      (a, b) => new Date(a) - new Date(b)
    );
    setScreeningDates(sortedDates);

    //  useState for all events listed
    if (startofDateISO == null && endofDateISO == null) {
      const todayScreenings = allResults;
      todayScreenings.sort(
        (a, b) => new Date(a.startDate) - new Date(b.startDate)
      );
      if (placeSelected == null) {
        const resultPlaces = new Set(todayScreenings.map((movie) => movie.place.name));
        const sortedPlaces = [...resultPlaces].sort();
        setScreeningPlaces([...sortedPlaces]);
        setScreening(todayScreenings);
      } else {
        const todayPlaceScreenings = todayScreenings.filter(
          (movie) => movie.place.name === placeSelected
        );
        setScreening(todayPlaceScreenings);
      }
    } else {
      // setCalendarNoMonth(true);
      const todayScreenings = allResults.filter(
        (movie) =>
          movie.startDate.split("Z")[0] >= startofDateISO &&
          movie.startDate.split("Z")[0] <= endofDateISO
      );
      todayScreenings.sort(
        (a, b) => new Date(a.startDate) - new Date(b.startDate)
      );
      if (placeSelected == null) {
        const resultPlaces = new Set(todayScreenings.map((movie) => movie.place.name));
        const sortedPlaces = [...resultPlaces].sort();
        setScreeningPlaces([...sortedPlaces]);
        setScreening(todayScreenings); 
      } else {
        const todayPlaceScreenings = todayScreenings.filter(
          (movie) => movie.place.name === placeSelected
        );
        setScreening(todayPlaceScreenings);
      }
    }
  };
  

  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);
  const startOfDayISO = startOfDay.toISOString().split("Z")[0];
  

  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  const tomorrowStart = new Date(startOfDay);
  tomorrowStart.setDate(startOfDay.getDate() + 1);
  tomorrowStart.setHours(0, 0, 0, 0);
  const tomorrowStartISO = tomorrowStart.toISOString().split("Z")[0];

  const tomorrowEnd = new Date(startOfDay);
  tomorrowEnd.setDate(startOfDay.getDate() + 1);
  tomorrowEnd.setHours(23, 59, 59, 999);


  useEffect(() => {
    console.log("beginning...");
    getScreeningRequests();
  }, []);

  const modifiedScreeningDates = screeningDates.map((dateStr) => {
    const date = new Date(dateStr);
    date.setHours(0, 0, 0, 0);
    const dateISO = date.toISOString().split("Z")[0];
    return dateISO;
  });

  const eventTime = (dateString) => {
    const date = dayjs(dateString).format("dddd, MMMM D, YYYY • hh:mm a");
    return date;
  };

  function parseDate(dateString) {
    const dayRemix = dayjs(dateString).format("YYYY-MM-DD"); 

    const [year, month, day] = dayRemix.split("-");
    return {
      year: parseInt(year),
      month: parseInt(month),
      day: parseInt(day),
    }
  }

  function groupFilmsByMonth(screening) {
    const groupedFilms = {};
    screening.forEach((screening) => {
      const { year, month, day } = parseDate(screening.startDate);
      const dateObj = new Date(year, month - 1, day);
      const dayOfWeek = dateObj.toLocaleDateString("en-US", {weekday: "short",});
      const monthKey = `${year}-${month}`;
      if (!groupedFilms[monthKey]) {
        groupedFilms[monthKey] = {
          month: allMonths[month - 1],
          year: year,
          days: {},
        };
      }
      const dayKey = `${day}`;
      if (!groupedFilms[monthKey].days[dayKey]) {
        groupedFilms[monthKey].days[dayKey] = { dayOfWeek, screening: [] };
      }
      groupedFilms[monthKey].days[dayKey].screening.push(screening);
    });
    return groupedFilms;
  };

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

  function organizeFilmsByMonth(screening) {
    const groupedFilms = groupFilmsByMonth(screening);
    const sortedFilms = sortFilmsByMonth(groupedFilms);

    const organizedFilms = sortedFilms.map(([key, value]) => {
      const monthData = value;
      const monthWithDayOfWeek = Object.entries(monthData.days).map(
        ([day, dayData]) => {
          const { dayOfWeek, screening } = dayData;
          return { day, dayOfWeek, screening };
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
  const organizedFilms = organizeFilmsByMonth(screening);
  console.log(organizedFilms);

  console.log(calendarNoMonth);

  return (
    <section className={`film-calendar-list flex ${pause}`}>
      <EventDates
        dateHighlight={dateHighlight}
        dateSelectedFormating={dateSelectedFormating}
        modifiedScreeningDates={modifiedScreeningDates}
        startOfDayISO={startOfDayISO}
        tomorrowStartISO={tomorrowStartISO}
      />
      <EventPlaces
        placeSelected={placeSelected}
        placeHighlight={placeHighlight}
        screeningPlaces={screeningPlaces}
      />
      <div className="content-wrap">
        {calendarNoMonth === true ? (
          <div style={{ padding: "24px 16px 0" }}>
            {screening.map((screen, index) => (
              <div
                key={index}
                style={{ backgroundImage: `url(${CardTicket})` }}
                onClick={() => addtoCalendar(screen)}
                className="fm-movie-card"
              >
                <div className="container">
                  <figure></figure>
                  <div className="details">
                    <div className="film-series-format">
                      <p>{eventTime(screen.startDate)}</p>
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
                      {dayData.screening.map((screen, index) => (
                        <div
                          key={index}
                          style={{ backgroundImage: `url(${CardTicket})` }}
                          onClick={() => addtoCalendar(screen)}
                          className="fm-movie-card"
                        >
                          <div className="container">
                            <figure></figure>
                            <div className="details">
                              <div className="film-series-format">
                                <p>{eventTime(screen.startDate)}</p>
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

        {/* <div className="film-calendar-event">
              
            </div> */}
      </div>
    </section>
  );
}
export default Local;