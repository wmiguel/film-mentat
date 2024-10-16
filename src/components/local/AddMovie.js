import React, { useState } from "react";
import { auth, db } from "../../firebase/firebase";
import { addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import SaveButton from "../buttons/SaveButton";

const AddMovie = ({ closeModal, data, seriesList }) => {
  const today = dayjs().format("YYYY-MM-DD");
  const [date, submitDate] = useState(today);
  const [format, submitFormat] = useState("");
  const [series, submitSeries] = useState("");

  const seriesSet = new Set(seriesList.map((movie) => movie.series));
  const serieslist = [...seriesSet];
  const formatSet = new Set(seriesList.map((movie) => movie.format));
  const formatlist = [...formatSet];

  const navigate = useNavigate();
  function handleClick() {
    navigate("/calendar");
  }

  const addMovie = async (e) => {
    e.preventDefault(e);
    if (date === "") {
      return;
    }
    const { uid } = auth.currentUser;
    await addDoc(collection(db, "films"), {
      uid,
      title: data.title,
      year: dayjs(data.release_date).format("YYYY"),
      poster: data.poster_path,
      backdrop: data.backdrop_path,
      series: series,
      format: format,
      tmdbID: data.id,
      date: date,
      type: "personal",
    });
    closeModal();
    submitDate(today);
    submitFormat("");
    submitSeries("");
    handleClick();
  };

  return (
    <>
      <form onSubmit={addMovie} className="submit flex">
        <div className="date grid">
          <label>Date</label>
          <input
            className="date-input"
            onChange={(e) => submitDate(e.target.value)}
            required
            type="date"
            value={date}
          />
        </div>
        <div className="format grid">
          <label>Format</label>
          <input
            list="format-options"
            onChange={(e) => submitFormat(e.target.value)}
            placeholder="Add format..."
            type="text"
            value={format}
          />
          <datalist id="format-options">
            {formatlist.map((format, index) => {
              if (format === "") {
                return null;
              }
              return <option key={index} value={format}></option>;
            })}
          </datalist>
        </div>
        <div className="series grid">
          <label>Series</label>
          <input
            list="series-options"
            onChange={(e) => submitSeries(e.target.value)}
            placeholder="Add series..."
            type="text"
            value={series}
          />
          <datalist id="series-options">
            {serieslist.map((option, index) => {
              if (option === "") {
                return null;
              }
              return <option key={index} value={option}></option>;
            })}
          </datalist>
        </div>
      </form>
      <SaveButton action={addMovie} />
    </>
  );
};

export default AddMovie;