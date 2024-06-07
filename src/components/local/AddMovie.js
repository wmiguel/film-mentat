import React, { useState } from "react";
import { auth, db } from "../../firebase/firebase";
import {
  addDoc,
  collection,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

const AddMovie = ({ filmData, closeModal, filterSeries }) => {
  const today = dayjs().format("YYYY-MM-DD");
  const [editingDate, setEditingDate] = useState(today);
  const [editingFormat, setEditingFormat] = useState("");
  const [editingSeries, setEditingSeries] = useState("");

  const filteredSeries = new Set(filterSeries.map((movie) => movie.series));
  const seriesOptions = [...filteredSeries];

  const filteredFormats = new Set(filterSeries.map((movie) => movie.format));
  const formatOptions = [...filteredFormats];

  const navigate = useNavigate();
  function handleClick() {
    navigate("/calendar");
  }


  // Add Film
  const addFilm = async (f) => {
    f.preventDefault(f);
    if (editingDate === "") {
      return;
    }
    const { uid } = auth.currentUser;
    await addDoc(collection(db, "films"), {
      uid,
      title: filmData.title,
      year: dayjs(filmData.release_date).format("YYYY"),
      poster: filmData.poster_path,
      backdrop: filmData.backdrop_path,
      series: editingSeries,
      format: editingFormat,
      tmdbID: filmData.id,
      date: editingDate,
      type: "personal",
    });
    closeModal();
    setEditingDate(today);
    setEditingFormat("");
    setEditingSeries("");
    handleClick();
  };
  
  return (
    <>
      <div className="film-info film-edit show">
        <form onSubmit={addFilm} className="film-edit-form flex">
          <div className="edit-film-date grid">
            <label>Date</label>
            <input
              value={editingDate}
              onChange={(f) => setEditingDate(f.target.value)}
              type="date"
              className="date-input"
              required
            />
          </div>
          <div className="edit-film-format grid">
            <label>Format</label>
            <input
              value={editingFormat}
              placeholder="Add format..."
              onChange={(f) => setEditingFormat(f.target.value)}
              type="text"
              list="format-options"
            />
            <datalist id="format-options">
              {formatOptions.map((format, index) => {
                if (format === "") {
                  return null;
                }
                return <option key={index} value={format}></option>;
              })}
            </datalist>
          </div>
          <div className="edit-film-series grid">
            <label>Series</label>
            <input
              value={editingSeries}
              placeholder="Add series..."
              onChange={(f) => setEditingSeries(f.target.value)}
              type="text"
              list="series-options"
            />
            <datalist id="series-options">
              {seriesOptions.map((option, index) => {
                if (option === "") {
                  return null;
                }
                return <option key={index} value={option}></option>;
              })}
            </datalist>
          </div>
        </form>
      </div>
      <div className="search-save-button">
        <button className="save" onClick={(f) => addFilm(f)}>
          Save
        </button>
      </div>
    </>
  );
};

export default AddMovie;