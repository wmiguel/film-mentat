import React from "react";
import { AiOutlinePlus } from "react-icons/ai";

const FilmToggleSearch = ({ rotate, toggleSearch }) => {
  return (
    <button className={`search inline-flex ${rotate}`} onClick={toggleSearch}>
      <AiOutlinePlus size={20} />
    </button>
  );
};

export default FilmToggleSearch;