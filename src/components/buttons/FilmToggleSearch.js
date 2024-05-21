import React from "react";
import { AiOutlinePlus } from "react-icons/ai";

const FilmToggleSearch = ({ toggleSearch }) => {
  return (
    <button className="search inline-flex" onClick={toggleSearch}>
      <AiOutlinePlus size={20} />
    </button>
  );
};

export default FilmToggleSearch;