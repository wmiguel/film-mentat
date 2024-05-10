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
        <div className="film-title-year flex">
          <h4>
            {film.title} <span>{film.year}</span>
          </h4>
        </div>

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
              <option>{film.format}</option>
              {/* {film.format.map((option) => (
                
                // <option key={formats.id} value={formats.format}></option>
              ))} */}
            </datalist>
          </div>
          <div className="edit-film-series grid">
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
