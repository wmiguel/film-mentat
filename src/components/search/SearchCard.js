import React from "react";
import dayjs from "dayjs";

const SearchCard = ({ result, index, openSearchDetails, toggleOff }) => {
  const addtoCalendar = async (result) => {
    openSearchDetails(result);
    setTimeout(function () {
      toggleOff();
    }, 600);
  };

  if (result !== undefined) {
    const release_year = dayjs(result.release_date).format("YYYY");
    return (
      <div
        className="search-card"
        key={index}
        onClick={() => addtoCalendar(result)}
      >
        <div className="container">
          <figure
            style={{
              backgroundImage: `${
                result.poster_path
                  ? `url("https://image.tmdb.org/t/p/w1280${result.poster_path}")`
                  : ""
              }`,
            }}
          ></figure>
          <div className="details flex">
            <div className="title-year flex">
              <h4>
                {result.title + " "}
                {result.release_date === "" ||
                result.release_date === undefined ? null : (
                  <span className="year">{release_year}</span>
                )}
              </h4>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default SearchCard;