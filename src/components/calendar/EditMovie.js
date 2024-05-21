import React, { useState } from "react";
import FilmUpdateEvent from "../buttons/FilmUpdateEvent";
import { db } from "../../firebase/firebase";
import { updateDoc, deleteDoc, doc } from "firebase/firestore";

const EditMovie = ({
  film,
  filmData,
  setTodoEditing,
  setOpenModal,
  setPauseScroll,
  handleCloseModal,
}) => {
  const [editingDate, setEditingDate] = useState(filmData.date);
  const [editingFormat, setEditingFormat] = useState(filmData.format);
  const [editingSeries, setEditingSeries] = useState(filmData.series);


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
    setTodoEditing(null);
    setEditingDate("");
    setEditingFormat("");
    setEditingSeries("");
    setPauseScroll(false);
    handleCloseModal();
  };

  // Delete Film
  const deleteFilm = async () => {
    await deleteDoc(doc(db, "films", film));
    setOpenModal(false);
    setTodoEditing(null);
    setEditingDate("");
    setEditingFormat("");
    setEditingSeries("");
    setPauseScroll(false);
    handleCloseModal();
  };

  // Cancel Edit
  const cancelEditFilm = () => {
    setOpenModal(false);
    setTodoEditing(null);
    setEditingFormat("");
    setEditingSeries("");
    setPauseScroll(false);
    setTimeout(function () {
      handleCloseModal();
    }, 250);

    // handleCloseModal();
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
              <option>{filmData.format}</option>
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
        filmID={film}
        updateFilm={updateFilm}
        deleteFilm={deleteFilm}
        cancelEditFilm={cancelEditFilm}
      />
    </>
  );
};

export default EditMovie;
