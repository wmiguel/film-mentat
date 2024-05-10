import React from "react";

const FilmUpdateEvent = ({
  filmID,
  updateFilm,
  deleteFilm,
  cancelEditFilm,
}) => {
  return (
    <div className="film-update-buttons">
      <button className="save" onClick={(f) => updateFilm(f)}>Save</button>
      <button className="delete" onClick={() => deleteFilm(filmID)}>Delete</button>
      <button className="cancel" onClick={() => cancelEditFilm(null)}>Cancel</button>
    </div>
  );
};

export default FilmUpdateEvent;
