import React, { useState, useEffect } from "react";
import AddMovie from "../local/AddMovie";
import Cover from "../calendar/Cover";
import { fetchMovieDetails } from "../../api/moviesRequests";
import dayjs from "dayjs";

const Result = ({
  searchData,
  closeModal,
  seriesList,
}) => {
  const [directors, setDirectors] = useState([]);
  const resultYear = dayjs(searchData.release_date).format("YYYY");

  useEffect(() => {
    const tmdbID = searchData.id;
    if (tmdbID !== undefined) {
      const gettingData = async (tmdbID) => {
        const response = await fetchMovieDetails(tmdbID);
        try {
          const resDirector = response.credits.crew.filter(
            (crew) => crew.job === "Director"
          );
          setDirectors(resDirector);
        } catch (error) {
          return;
        }
      };
      gettingData(tmdbID);
    }
  });

  return (
    <>
      <Cover
        closeModal={closeModal}
        searchData={searchData}
        directors={directors}
        backdrop={searchData.backdrop_path}
        title={searchData.title}
        year={resultYear}
      />

      <div className="modal-details flex">
        <AddMovie
          data={searchData}
          closeModal={closeModal}
          seriesList={seriesList}
        />
      </div>
    </>
  );
};

export default Result;