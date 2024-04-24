import React from "react";
// import { AiOutlinePlus } from "react-icons/ai";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const FilmToggleSearch = ({ rotate, toggleSearch }) => {
  return (
    <IconButton
      aria-label="delete"
      onClick={toggleSearch}
      color="primary"
      size="large"
    >
      <AddCircleIcon fontSize="inherit" />
    </IconButton>
    // <button className={`search ${rotate}`} onClick={toggleSearch}>
    //   <AiOutlinePlus size={20} />
    // </button>
  );
};

export default FilmToggleSearch;