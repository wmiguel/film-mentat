import React, { useState } from "react";
import FilmUpdateEvent from "../buttons/FilmUpdateEvent";
import { db } from "../../firebase/firebase";
import { updateDoc, deleteDoc, doc } from "firebase/firestore";

const EditMovie = ({
  filterSeries,
  film,
  filmData,
  setOpenModal,
  handleCloseModal,
}) => {
  const [editingDate, setEditingDate] = useState(filmData.date);
  const [editingFormat, setEditingFormat] = useState(filmData.format);
  const [editingSeries, setEditingSeries] = useState(filmData.series);

  const filteredSeries = new Set(filterSeries.map((movie) => movie.series));
  const seriesOptions = [...filteredSeries];

  const filteredFormats = new Set(filterSeries.map((movie) => movie.format));
  const formatOptions = [...filteredFormats];

  // Update Film
  const updateFilm = async (f) => {
    f.preventDefault(f);
    if (editingDate === "") {
      return;
    }
    await updateDoc(doc(db, "films", film), {
      date: editingDate,
      format: editingFormat,
      series: editingSeries,
    });
    setOpenModal(false);
    setEditingDate("");
    setEditingFormat("");
    setEditingSeries("");
    handleCloseModal();
  };

  // Delete Film
  const deleteFilm = async () => {
    await deleteDoc(doc(db, "films", film));
    setOpenModal(false);
    setEditingDate("");
    setEditingFormat("");
    setEditingSeries("");
    handleCloseModal();
  };

  return (
    <>
      <div className="film-info film-edit show">
        <form onSubmit={updateFilm} className="film-edit-form flex">
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
      <FilmUpdateEvent
        filmID={film}
        updateFilm={updateFilm}
        deleteFilm={deleteFilm}
      />
    </>
  );
};

export default EditMovie;
