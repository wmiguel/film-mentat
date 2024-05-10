import React from "react";
import { FaTicketAlt } from "react-icons/fa";

import { Link } from "react-router-dom";

const FilmLetterboxd = () => {
  return (
    <Link to="/letterboxd">
      <button className="local inline-flex">
        <FaTicketAlt size={18} />
      </button>
    </Link>
  );
};

export default FilmLetterboxd;
