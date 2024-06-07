import React, { useState, useEffect } from "react";
import AddMovie from "./AddMovie";
import FilmCover from "../calendar/FilmCover";
import { getFilmData } from "../../api/moviesRequests";

const SearchModal = ({
  searchData,
  setOpenModal,
  handleCloseModal,
  closeModal,
  filterSeries,
}) => {
  const [filmDirector, setFilmDirector] = useState([]);
  const filmID = searchData.id;

  useEffect(() => {
    const gettingData = async (filmID) => {
      const response = await getFilmData(filmID);
      const director = response.credits.crew.filter(
        (crew) => crew.job === "Director"
      );
      setFilmDirector(director);
    };
    gettingData(filmID);
  }, [filmID]);

  return (
    <>
      <FilmCover
        closeModal={closeModal}
        searchData={searchData}
        filmDirector={filmDirector}
      />

      <div className="filmModal-details">
        <AddMovie
          filmData={searchData}
          closeModal={closeModal}
          filterSeries={filterSeries}
        />
      </div>
    </>
  );
};

export default SearchModal;