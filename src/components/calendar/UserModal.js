import dayjs from "dayjs";
import EditMovie from "./EditMovie";
const userModal = ({
  film,
  filmData,
  setTodoEditing,
  setOpenModal,
  handleCloseModal,
}) => {
  return (
    <>
      <div
        className={`fm-movie-card modal`}
        style={{
          backgroundImage: `url("https://image.tmdb.org/t/p/w1280${filmData.backdrop}")`,
          borderRadius: "20px",
        }}
      ></div>

      <div className={`container modal-container`} style={{ padding: "0" }}>
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
              aspectRatio: "1 / 1.47",
              borderRadius: "20px",
            }}
          ></figure>
          <div className="the-details">
            <p>{dayjs(filmData.date).format("dddd, MMM DD YYYY")}</p>
            <h1>
              {filmData.title} <span>{filmData.year}</span>
            </h1>
            <span>{filmData.series}</span>
            <p>{filmData.format}</p>
          </div>
        </div>
        <div className="details">
          <EditMovie
            film={film}
            filmData={filmData}
            setTodoEditing={setTodoEditing}
            setOpenModal={setOpenModal}
            handleCloseModal={handleCloseModal}
          />
        </div>
      </div>
    </>
  );
};

export default userModal;