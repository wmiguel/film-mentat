import React from "react";
import { MdEdit } from "react-icons/md";

const FilmEditEvent = ({ filmID, setTodoEditing }) => {
  return (
    <div className="film-edit-button">
      <button className="edit">
        {<MdEdit onClick={() => setTodoEditing(filmID)} size={20} />}
      </button>
    </div>
  );
};

export default FilmEditEvent;