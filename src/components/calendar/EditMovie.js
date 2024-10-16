import React, { useState } from "react";
import { db } from "../../firebase/firebase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import DeleteButton from "../buttons/DeleteButton";
import SaveButton from "../buttons/SaveButton";

const EditMovie = ({
  id,
  movieData,
  seriesList,
  closeModal,
}) => {
  const [date, submitDate] = useState(movieData.date);
  const [format, submitFormat] = useState(movieData.format);
  const [series, submitSeries] = useState(movieData.series);
  
  const seriesSet = new Set(seriesList.map((movie) => movie.series));
  const serieslist = [...seriesSet];
  const formatSet = new Set(seriesList.map((movie) => movie.format));
  const formatlist = [...formatSet];

  const clearForm = () => {
    submitDate("");
    submitFormat("");
    submitSeries("");
    closeModal();
  }

  const updateMovie = async (e) => {
    e.preventDefault(e);
    if (date === "") {
      return;
    }
    await updateDoc(doc(db, "films", id), {
      date: date,
      format: format,
      series: series,
    });
    clearForm();
  };

  const deleteMovie = async () => {
    await deleteDoc(doc(db, "films", id));
    clearForm();
  };

  return (
    <>
      <form onSubmit={updateMovie} className="submit flex">
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
      <div className="buttons flex">
        <DeleteButton text={"Delete"} action={deleteMovie} />
        <SaveButton action={updateMovie} />
      </div>
    </>
  );
};

export default EditMovie;