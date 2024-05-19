import React from "react";

const FilmUpdateEvent = ({
  // filmID,
  updateFilm,
  deleteFilm,
  cancelEditFilm,
}) => {
  return (
    <div className="film-update-buttons">
      <button className="save" onClick={(f) => updateFilm(f)}>Save</button>
      <button className="delete" onClick={() => deleteFilm()}>Delete</button>
      <button className="cancel" onClick={() => cancelEditFilm()}>Cancel</button>
    </div>
  );
};

export default FilmUpdateEvent;
