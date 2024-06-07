import React, { useState } from "react";
import EditMovie from "./EditMovie";
import FilmCover from "./FilmCover";

const UserModal = ({
  filterSeries,
  film,
  filmDuration,
  filmRating,
  filmOverview,
  filmDirector,
  filmData,
  setOpenModal,
  handleCloseModal,
  closeModal,
}) => {
  const [todoEditing, setTodoEditing] = useState(null);
  return (
    <>
      <FilmCover
        closeModal={closeModal}
        setTodoEditing={setTodoEditing}
        filmData={filmData}
        filmDirector={filmDirector}
      />

      <div className="filmModal-details">
        {todoEditing === filmData.uid ? (
          <EditMovie
            filterSeries={filterSeries}
            film={film}
            filmData={filmData}
            setOpenModal={setOpenModal}
            handleCloseModal={handleCloseModal}
          />
        ) : (
          <>
            <div className="film-stats">
              <div className="series">
                <p>{filmData.series}</p>
              </div>
              <div className="rating-duration-format">
                <p>
                  {filmRating} • {filmDuration} mins • {filmData.format}
                </p>
              </div>
            </div>
            <div className="overview">
              <p>{filmOverview}</p>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default UserModal;