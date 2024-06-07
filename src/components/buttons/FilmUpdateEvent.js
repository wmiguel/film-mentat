import React from "react";

const FilmUpdateEvent = ({
  updateFilm,
  deleteFilm,
}) => {
  return (
    <div className="film-update-buttons">
      <button className="delete" onClick={() => deleteFilm()}>
        Delete
      </button>
      <button className="save" onClick={(f) => updateFilm(f)}>
        Save
      </button>
    </div>
  );
};

export default FilmUpdateEvent;