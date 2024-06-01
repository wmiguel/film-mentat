import dayjs from "dayjs";
import EditMovie from "./EditMovie";
import { IoAdd } from "react-icons/io5";
const userModal = ({
  filterSeries,
  film,
  filmData,
  setOpenModal,
  handleCloseModal,
  closeModal,
}) => {
  return (
    <>
      <div
        className={`fm-movie-card modal`}
        style={{
          backgroundImage: `url("https://image.tmdb.org/t/p/w1280${filmData.backdrop}")`,
          cursor: "auto",
        }}
      >
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
              cursor: "pointer",
              width: "36px",
              height: "36px",
              fontSize: "18px",
              rotate: "45deg",
            }}
          >
            <IoAdd size={28} />
          </button>
        </div>
      </div>

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
          <figure
            style={{
              backgroundImage: `url("https://image.tmdb.org/t/p/w1280${filmData.poster}")`,
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "contain",
              aspectRatio: "1 / 1.5",
              borderRadius: "8px",
            }}
          ></figure>
          <div className="the-details">
            <p>{dayjs(filmData.date).format("dddd, MMM DD YYYY")}</p>
            <h1>
              {filmData.title}{" "}
              <span className="film--year">{filmData.year}</span>
            </h1>
            <span>{filmData.series}</span>
            <p>{filmData.format}</p>
          </div>
        </div>
        <div className="details">
          <EditMovie
            filterSeries={filterSeries}
            film={film}
            filmData={filmData}
            setOpenModal={setOpenModal}
            handleCloseModal={handleCloseModal}
          />
        </div>
      </div>
    </>
  );
};

export default userModal;