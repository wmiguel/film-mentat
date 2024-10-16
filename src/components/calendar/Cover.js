import React, { Fragment } from "react";
import dayjs from "dayjs";
import EditButton from "../buttons/EditButton";

const Cover = ({
  backdrop,
  closeModal,
  setToEdit,
  id,
  date,
  screeningDate,
  title,
  year,
  time,
  place,
  directors,
}) => {
  return (
    <div
      className="cover flex"
      style={{
        backgroundImage: `${
          backdrop
            ? `linear-gradient( 0deg, rgba(22, 22, 22, 0.90) 0%, rgba(22, 22, 22, 0.65) 100% ),url("https://image.tmdb.org/t/p/w1280${backdrop}")`
            : ""
        }`,
        backgroundColor: `${backdrop ? "" : "var(--deep-teal)"}`,
      }}
    >
      <div className="buttons flex">
        <span onClick={() => closeModal()}>Close</span>
        {id ? <EditButton setToEdit={setToEdit} id={id} /> : null}
      </div>

      <div className="cover-details flex">
        {date ? (
          <h4>
            {dayjs(date).format("dddd, MMM DD")}
            {time ? ` • ${time}` : null}
          </h4>
        ) : null}
        {screeningDate ? (
          <h4>{dayjs(screeningDate).format("dddd, MMMM DD • h:mma")}</h4>
        ) : null}

        <div className="title">
          {year ? (
            <h1>
              {title} <span className="year">{year}</span>
            </h1>
          ) : (
            <h1>{title}</h1>
          )}
        </div>
        {place ? <p>{place}</p> : null}
        {directors ? (
          <p>
            directed by
            {directors.length > 1
              ? directors.map((director, index) => {
                  if (index + 1 === 1) {
                    return (
                      <Fragment key={index}>
                        {" " + director.name + (directors.length > 2 ? "," : "")}
                      </Fragment>
                    );
                  }
                  if (index + 1 === directors.length) {
                    return (
                      <Fragment key={index}>{" & " + director.name}</Fragment>
                    );
                  } else {
                    return (
                      <Fragment key={index}>
                        {" " + director.name + ","}
                      </Fragment>
                    );
                  }
                })
              : directors.map((director, index) => (
                  <Fragment key={index}>{" " + director.name}</Fragment>
                ))}
          </p>
        ) : null}
      </div>
    </div>
  );
};

export default Cover;