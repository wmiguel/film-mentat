import React, { useState } from "react";
import FilmUpdateEvent from "../buttons/FilmUpdateEvent";
import { db } from "../../firebase/firebase";
import { updateDoc, deleteDoc, doc } from "firebase/firestore";

const EditMovie = ({ film, setTodoEditing }) => {
  const [editingDate, setEditingDate] = useState(film.date);
  const [editingFormat, setEditingFormat] = useState(film.format);
  const [editingSeries, setEditingSeries] = useState(film.series);

  // Update Film
  const updateFilm = async (f) => {
    f.preventDefault(f);
    if (editingDate === "") {
      return;
    }
    await updateDoc(doc(db, "films", film.id), {
      date: editingDate,
      format: editingFormat,
      series: editingSeries,
    });
    setTodoEditing(null);
    setEditingDate("");
    setEditingFormat("");
    setEditingSeries("");
  };

  // Delete Film
  const deleteFilm = async () => {
    await deleteDoc(doc(db, "films", film.id));
    setTodoEditing(null);
    setEditingDate("");
    setEditingFormat("");
    setEditingSeries("");
  };

  // Cancel Edit
  const cancelEditFilm = () => {
    setTodoEditing(null);
    setEditingDate("");
    setEditingFormat("");
    setEditingSeries("");
  };

  return (
    <>
      <div className="film-info film-edit show">
        <div className="film-title-year">
          <h4>{film.title}</h4>
          <span>{film.year}</span>
        </div>

        <form onSubmit={updateFilm} className="film-edit-form">
          <div className="edit-film-date">
            <label>Date</label>
            <input
              value={editingDate}
              onChange={(f) => setEditingDate(f.target.value)}
              type="date"
              className="date-input"
              required
            />
          </div>
          <div className="edit-film-format">
            <label>Format</label>
            <input
              value={editingFormat}
              onChange={(f) => setEditingFormat(f.target.value)}
              type="text"
              list="format-options"
            />
            {/* <datalist id="format-options">
                <option key={index} value={film.format}></option>
            </datalist> */}
          </div>
          <div className="edit-film-series">
            <label>Series</label>
            <input
              value={editingSeries}
              onChange={(f) => setEditingSeries(f.target.value)}
              type="text"
            />
          </div>
        </form>
      </div>
      <FilmUpdateEvent
        filmID={film.id}
        updateFilm={updateFilm}
        deleteFilm={deleteFilm}
        cancelEditFilm={cancelEditFilm}
      />
    </>
  );
};

export default EditMovie;
