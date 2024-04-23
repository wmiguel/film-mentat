// import React, { useEffect } from "react";
// import FilmCard from "../components/calendar/FilmCard";

function FilmCalendarList({ pauseScroll }) {

  //         ? `/api/region/${regionName}/listings/`
  //         : `/api/listings/regions`
  //       setRegions(data.regions);

  // const fetchListings = async () => {
  //   try {
  //     const response = await fetch(
  //       regionName
  //         ? `/api/region/${regionName}/listings/`
  //         : `/api/listings/regions`
  //     );
  //     if (response.ok) {
  //       const data = await response.json();
  //       setRegions(data.regions);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  async function fetchData() {
    const apiKey = "oVhy7kH4Vcfj0UjdnZc5Wdn0RDmbaqJOz4Lke7qJxDciEspoyc9R0GI8";
    // const apiUrl = "https://zeitgeists.org/api/regions";
    const apiUrl = "https://zeitgeists.org/api/listings/los-angeles/";

    try {
      const response = await fetch(apiUrl, {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      console.log(data);
      // console.log(data.places[0].name);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  fetchData();

  return (
    <section id="film-calendar-list" className="film-calendar-list">
      <div className="content-wrap">
        {/* {organizedFilms.map((monthData, index) => ( */}
        <div className="month-wrap">
          <div className="film-calendar-month">
            {/* <h2>{monthData.month}</h2> */}
            <h2>Heading 2</h2>
          </div>
          {/* {Object.entries(monthData.days).map(([day, films]) => ( */}
          <div className="day-wrap">
            <div className="film-calendar-day film-date">
              <div className="film-date-border">
                <span></span>
                {/* <h3>{day}</h3> */}
                <h3>Heading 3</h3>
              </div>
            </div>

            <div className="film-calendar-event">
              {/* {films.map((film, index) => (
                <FilmCard key={index} film={film}/>
                ))} */}
              {/* <FilmCard/> */}
            </div>
          </div>
          {/* ))} */}
        </div>
        {/* ))} */}
      </div>
    </section>
  );
}
export default FilmCalendarList;