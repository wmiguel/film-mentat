import React from "react";
import dayjs from "dayjs";

const MovieDetails = ({
  title,
  screeningTime,
  time,
  place,
  format,
  series,
  year,
  duration,
  rating,
  works,
}) => {

  return (
    <div className="details flex">
      {works ? (
        <>
          {works.length > 1 ? (
            <div className="series flex">
              {works.length === 2 ? (
                <span>Double Feature</span>
              ) : works.length === 3 ? (
                <span>Triple Feature</span>
              ) : (
                works.length > 3 && <span>Marathon</span>
              )}
            </div>
          ) : null}
        </>
      ) : null}
      {series ? (
        <div className="series flex">
          {series ? <span>{series}</span> : null}
        </div>
      ) : null}

      <div className="title-year">
        {year ? (
          <h4>
            {title} <span className="year">{year}</span>
          </h4>
        ) : (
          <h4>{title}</h4>
        )}
      </div>
      <div className="rating-duration-location">
        {screeningTime ? (
          <p>
            {dayjs(screeningTime).format("hh:mma")}
            {" • "}
            {place}
          </p>
        ) : null}
        {time ? (
          <p>
            {time} • {place}
          </p>
        ) : null}
        {duration ? (
          <p>
            {rating ? rating + " · " : "NR · "}
            {duration} mins
            {format ? " · " + format : null}
          </p>
        ) : null}
      </div>
    </div>
  );
};
export default MovieDetails;