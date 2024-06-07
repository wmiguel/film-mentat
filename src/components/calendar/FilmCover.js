import React, { Fragment } from "react";
import dayjs from "dayjs";
import { BsThreeDots } from "react-icons/bs";

const FilmCover = ({
  closeModal,
  setTodoEditing,
  filmData,
  searchData,
  screen,
  screenData,
  filmDirector,
}) => {
  return (
    <>
      {screen ? (
        <>
          {screen.backdrop_path === null ? (
            <div
              className="filmModal-cover"
              style={{
                backgroundImage: `linear-gradient(
             0deg,
             rgba(22, 22, 22, 0.90) 0%,
             rgba(22, 22, 22, 0.65) 100%
             
         ),url("https://image.tmdb.org/t/p/w1280${screen.backdrop}")`,
              }}
            >
              <div className="cover-buttons">
                <span onClick={() => closeModal()}>Close</span>
              </div>

              <div className="cover-details">
                <h3>{dayjs(screen.date).format("dddd, MMM DD")}</h3>
                <div className="film--title">
                  <h1>{screen.title}</h1>
                </div>
              </div>
            </div>
          ) : (
            <div
              className="filmModal-cover"
              style={{
                backgroundImage: `linear-gradient(
             0deg,
             rgba(22, 22, 22, 0.90) 0%,
             rgba(22, 22, 22, 0.65) 100%
             
         ),url("")`,
              }}
            >
              <div className="cover-buttons">
                <span onClick={() => closeModal()}>Close</span>
              </div>

              <div className="cover-details">
                <h3>
                  {dayjs(screen.date).format("dddd, MMM DD")} • {screen.time}
                </h3>
                <div className="film--title">
                  <h1>{screen.title}</h1>
                </div>
                <p>{screen.place}</p>
              </div>
            </div>
          )}
        </>
      ) : (
        <></>
      )}
      {screenData ? (
        <>
          {screenData.backdrop_path === null ? (
            <div
              className="filmModal-cover"
              style={{
                backgroundImage: `linear-gradient(
             0deg,
             rgba(22, 22, 22, 0.90) 0%,
             rgba(22, 22, 22, 0.65) 100%
             
         ),url("https://image.tmdb.org/t/p/w1280${filmData.backdrop}")`,
              }}
            >
              <div className="cover-buttons">
                <span onClick={() => closeModal()}>Close</span>
              </div>

              <div className="cover-details">
                <h3>{dayjs(filmData.date).format("dddd, MMM DD")}</h3>
                <div className="film--title">
                  <h1>
                    {filmData.title}{" "}
                    <span className="film--year">{filmData.year}</span>
                  </h1>
                </div>
                <p>
                  directed by
                  {filmDirector.length > 1
                    ? filmDirector.map((director, index) => {
                        if (index + 1 === 1) {
                          return (
                            <Fragment key={index}>
                              {" " + director.name}
                            </Fragment>
                          );
                        }
                        if (index + 1 === filmDirector.length) {
                          return (
                            <Fragment key={index}>
                              {" & " + director.name}
                            </Fragment>
                          );
                        } else {
                          return (
                            <Fragment key={index}>
                              {" " + director.name + ","}
                            </Fragment>
                          );
                        }
                      })
                    : filmDirector.map((director, index) => (
                        <Fragment key={index}>{" " + director.name}</Fragment>
                      ))}
                </p>
              </div>
            </div>
          ) : (
            <div
              className="filmModal-cover"
              style={{
                backgroundImage: `linear-gradient(
             0deg,
             rgba(22, 22, 22, 0.90) 0%,
             rgba(22, 22, 22, 0.65) 100%
             
         ),url("")`,
              }}
            >
              <div className="cover-buttons">
                <span onClick={() => closeModal()}>Close</span>
              </div>

              <div className="cover-details">
                <h3>
                  {dayjs(screenData.startDate).format("dddd, MMMM DD • h:mma")}
                </h3>
                <div className="film--title">
                  <h1>{screenData.name}</h1>
                </div>
                <p>{screenData.place.name}</p>
              </div>
            </div>
          )}
        </>
      ) : (
        <></>
      )}
      {filmData ? (
        <div
          className="filmModal-cover"
          style={{
            backgroundImage: `linear-gradient(
             0deg,
             rgba(22, 22, 22, 0.90) 0%,
             rgba(22, 22, 22, 0.65) 100%
             
         ),url("https://image.tmdb.org/t/p/w1280${filmData.backdrop}")`,
          }}
        >
          <div className="cover-buttons">
            <span onClick={() => closeModal()}>Close</span>
            <button
              className="edit-button"
              onClick={() => setTodoEditing(filmData.uid)}
            >
              <BsThreeDots size={24} />
            </button>
          </div>

          <div className="cover-details">
            <h3>{dayjs(filmData.date).format("dddd, MMM DD")}</h3>
            <div className="film--title">
              <h1>
                {filmData.title}{" "}
                <span className="film--year">{filmData.year}</span>
              </h1>
            </div>
            <p>
              directed by
              {filmDirector.length > 1
                ? filmDirector.map((director, index) => {
                    if (index + 1 === 1) {
                      return (
                        <Fragment key={index}>{" " + director.name}</Fragment>
                      );
                    }
                    if (index + 1 === filmDirector.length) {
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
                : filmDirector.map((director, index) => (
                    <Fragment key={index}>{" " + director.name}</Fragment>
                  ))}
            </p>
          </div>
        </div>
      ) : (
        <></>
      )}
      {searchData ? (
        <div
          className="filmModal-cover"
          style={{
            backgroundImage: `linear-gradient(
             0deg,
             rgba(22, 22, 22, 0.90) 0%,
             rgba(22, 22, 22, 0.65) 100%
             
         ),url("https://image.tmdb.org/t/p/w1280${searchData.backdrop_path}")`,
          }}
        >
          <div className="cover-buttons">
            <span></span>
            <span onClick={() => closeModal()}>Cancel</span>
          </div>

          <div className="cover-details">
            <div className="film--title">
              <h1>
                {searchData.title}{" "}
                <span className="film--year">
                  {dayjs(searchData.release_date).format("YYYY")}
                </span>
              </h1>
            </div>
            <p>
              directed by
              {filmDirector.length > 1
                ? filmDirector.map((director, index) => {
                    if (index + 1 === 1) {
                      return (
                        <Fragment key={index}>{" " + director.name}</Fragment>
                      );
                    }
                    if (index + 1 === filmDirector.length) {
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
                : filmDirector.map((director, index) => (
                    <Fragment key={index}>{" " + director.name}</Fragment>
                  ))}
            </p>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default FilmCover;