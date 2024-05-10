import React from "react";
import FilmResult from "./FilmResult";

import { auth, db } from "../../firebase/firebase";
import { addDoc, collection } from "firebase/firestore";

const FilmResultCard = ({ film, index, toggleOff }) => {
  
  const addtoCalendar = async (film) => {
    const newFavouriteList = [film];
    const { uid } = auth.currentUser;

    const parts = newFavouriteList[0].release_date.split("-");
    const release_year = parts[0];
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1;
    let dd = today.getDate();

    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;

    const formattedToday = yyyy + "-" + mm + "-" + dd;

    await addDoc(collection(db, "tmdbFilms"), {
      uid,
      title: newFavouriteList[0].title,
      year: release_year,
      poster: newFavouriteList[0].poster_path,
      backdrop: newFavouriteList[0].backdrop_path,
      series: "",
      format: "",
      tmdbID: newFavouriteList[0].id,
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
