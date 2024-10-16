import React from "react";
import { AiOutlinePlus } from "react-icons/ai";

const SearchButton = ({ toggleOn }) => {
  return (
    <button className="searchButton flex" onClick={toggleOn}>
      <AiOutlinePlus size={24} />
    </button>
  );
};

export default SearchButton;