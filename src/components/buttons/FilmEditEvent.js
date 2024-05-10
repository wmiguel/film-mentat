import React from "react";
import { HiDotsHorizontal } from "react-icons/hi";

const FilmEditEvent = ({ filmID, setTodoEditing }) => {
  return (
    <div className="film-edit-button flex">
      <button className="edit inline-flex">
        <HiDotsHorizontal onClick={() => setTodoEditing(filmID)} size={20} />
      </button>
    </div>
  );
};

export default FilmEditEvent;