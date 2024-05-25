import dayjs from "dayjs";
var weekday = require("dayjs/plugin/weekday");
var localeData = require("dayjs/plugin/localeData");
dayjs.extend(localeData);
dayjs.extend(weekday);

const ScreeningDetails = ({ eventData }) => {
  return (
    <>
      <div
        className={`container modal-container`}
        style={{
          flex: "1 1 auto",
        }}
      >
        <div
          className="details"
          style={{
            marginBottom: "24px",
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <div
            className="film-info film-edit show"
            style={{
              flex: "1 1 auto",
              display: "flex",
              flexDirection: "column",
              gap: "18px",
            }}
          >
            <div className="event-place" style={{ textAlign: "center" }}>
              <h2>
                <strong>{eventData.place.name}</strong>
                {/* <p>{eventData.place.address}</p> */}
              </h2>
            </div>
            <div
              className="event-title"
              style={{ textAlign: "center" }}
            >
              <h1 style={{ fontSize: "2rem", fontWeight: "600" }}>
                <strong>{eventData.name.toUpperCase()}</strong>
              </h1>
            </div>
            <div
              className="event-place"
              style={{ textAlign: "center", marginBottom: "18px" }}
            >
              <h2>
                {dayjs(eventData.startDate).format("dddd, MMMM DD • h:mma")}
              </h2>
            </div>
            <hr />
            {eventData.about === null ? (
              <></>
            ) : (
              <div className="event-about" style={{ marginTop: "12px" }}>
                <p>{eventData.about}</p>
              </div>
            )}

            {eventData.worksPresented.length === 0 ? (
              <></>
            ) : (
              <>
                <div className="film-title-year" style={{ marginTop: "12px" }}>
                  <div
                    className="event-films-presented"
                    style={{ marginBottom: "24px" }}
                  >
                    <h1>
                      <strong>Film Lineup</strong>
                    </h1>
                  </div>
                  <div
                    className="event-films-list"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "18px",
                    }}
                  >
                    {eventData.worksPresented.length > 1
                      ? eventData.worksPresented.map((movie, workIndex) => (
                          <div
                            key={workIndex}
                            className="container"
                            style={{
                              // border: "1px solid red",
                              padding: "0",
                              display: "grid",
                              gridTemplateColumns: "65px minmax(0, 1fr)",
                              gap: "18px",
                            }}
                          >
                            <figure
                              style={{
                                backgroundColor: "var(--green-mist)",
                                borderRadius: "4px",
                                overflow: "hidden",
                                margin: "0 0 auto",
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat",
                                aspectRatio: "1 / 1.47",
                              }}
                            ></figure>
                            <div style={{ margin: "auto 0" }}>
                              <h2>
                                <strong>
                                  {movie.name} <span>{movie.year}</span>
                                </strong>
                              </h2>
                              <p>directed by {movie.director}</p>
                              <p>
                                {movie.duration === null
                                  ? ""
                                  : `${movie.duration} mins`}
                                {movie.videoFormat === ""
                                  ? ""
                                  : ` in ${movie.videoFormat}`}
                              </p>
                            </div>
                          </div>
                        ))
                      : eventData.worksPresented.map((movie, soloIndex) => (
                          <div
                            key={soloIndex}
                            className="container"
                            style={{
                              // border: "1px solid red",
                              padding: "0",
                              display: "grid",
                              gridTemplateColumns: "65px minmax(0, 1fr)",
                              gap: "18px",
                            }}
                          >
                            <figure
                              style={{
                                backgroundColor: "var(--green-mist)",
                                borderRadius: "4px",
                                overflow: "hidden",
                                margin: "0 0 auto",
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat",
                                aspectRatio: "1 / 1.47",
                              }}
                            ></figure>
                            <div style={{ margin: "auto 0" }}>
                              <h2>
                                <strong>
                                  {movie.name}{" "}
                                  {movie.year === null ? (
                                    <></>
                                  ) : (
                                    <span>{movie.year}</span>
                                  )}
                                </strong>
                              </h2>
                              {movie.director === null ? (
                                <></>
                              ) : (
                                <p>directed by {movie.director}</p>
                              )}
                              <p>
                                {movie.duration === null
                                  ? ""
                                  : `${movie.duration} mins`}
                                {movie.videoFormat === null
                                  ? ""
                                  : ` in ${movie.videoFormat}`}
                              </p>
                            </div>
                          </div>
                        ))}
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="cancel-button">
            <a href={`${eventData.url}`} rel="noreferrer" target="_blank">
              <button
                className="cancel"
                style={{
                  border: "none",
                  borderRadius: "24px",
                  lineHeight: "12px",
                  padding: "9px 12px 8px",
                  cursor: "pointer",
                  transition: "ease-in-out 0.25s",
                  width: "100%",
                  height: "48px",
                  fontSize: "18px",
                }}
              >
                Get Tickets
              </button>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default ScreeningDetails;
