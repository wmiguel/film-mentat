import React from "react";
import { AiOutlinePlus } from "react-icons/ai";

const FilmToggleSearch = ({ rotate, toggleSearch }) => {
  return (
    <div>
      <button className={`search ${rotate}`} onClick={toggleSearch}>
        <AiOutlinePlus size={20} />
      </button>
    </div>
  );
};

export default FilmToggleSearch;