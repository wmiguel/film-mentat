import dayjs from "dayjs";
import AddMovie from "./AddMovie";
const SearchModal = ({
  film,
  searchData,
  setOpenModal,
  handleCloseModal,
  closeModal,
  filterSeries,
}) => {
  return (
    <>
      <div
        className="cancel-button"
        style={{
          marginLeft: "auto",
          marginRight: "0",
        }}
      >
        <button
          className="cancel"
          onClick={() => closeModal()}
          style={{
            border: "none",
            borderRadius: "24px",
            lineHeight: "12px",
            padding: "9px 12px 8px",
            cursor: "pointer",
            transition: "ease-in-out 0.25s",
            width: "84px",
            height: "48px",
            fontSize: "18px",
          }}
        >
          Close
        </button>
      </div>
      {searchData.backdrop_path === undefined ? (
        <div
          className={`fm-movie-card modal`}
          // style={{
          //   borderRadius: "20px",
          // }}
        ></div>
      ) : (
        <div
          className={`fm-movie-card modal`}
          style={{
            backgroundImage: `url("https://image.tmdb.org/t/p/w1280${searchData.backdrop_path}")`,
            // borderRadius: "20px",
          }}
        ></div>
      )}

      <div
        className={`container modal-container`}
        style={{ padding: "24px 24px 64px" }}
      >
        <div
          className="film-event-details"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 3fr",
            gap: "24px",
            marginBottom: "24px",
          }}
        >
          {searchData.poster_path === undefined ? (
            <figure></figure>
          ) : (
            <figure
              style={{
                backgroundImage: `url("https://image.tmdb.org/t/p/w1280${searchData.poster_path}")`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "contain",
                aspectRatio: "1 / 1.5",
                borderRadius: "8px",
              }}
            ></figure>
          )}

          <div className="the-details">
            <h1>
              {searchData.title}{" "}
              <span className="film--year">
                {dayjs(searchData.release_date).format("YYYY")}
              </span>
            </h1>
          </div>
        </div>
        <div className="details">
          <AddMovie
            filmData={searchData}
            closeModal={closeModal}
            filterSeries={filterSeries}
          />
        </div>
      </div>
    </>
  );
};

export default SearchModal;