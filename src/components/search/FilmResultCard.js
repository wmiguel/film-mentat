import React from "react";
import FilmResult from "./FilmResult";

import { db } from "../../firebase/firebase";
import { collection, addDoc } from "firebase/firestore";

const FilmResultCard = ({ film, index, toggleOff }) => {
  const addtoCalendar = async (film) => {
    const newFavouriteList = [film];
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();

    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;

    const formattedToday = yyyy + "-" + mm + "-" + dd;

    await addDoc(collection(db, "films"), {
      title: newFavouriteList[0].Title,
      year: newFavouriteList[0].Year,
      poster: newFavouriteList[0].Poster,
      series: "",
      format: "",
      IMDbID: newFavouriteList[0].imdbID,
      date: formattedToday,
      completed: false,
    });
    toggleOff();
  };

  return (
    <div
      className="search-result-card"
      key={index}
      onClick={() => addtoCalendar(film)}
    >
      <FilmResult film={film} />
    </div>
  );
};

export default FilmResultCard;
