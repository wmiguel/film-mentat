import React from "react";
import { FaRegCalendarAlt } from "react-icons/fa";

import { Link } from "react-router-dom";

const FilmLocalEvents = () => {
  return (
    <Link to="/calendar">
      <button className="local inline-flex">
        <FaRegCalendarAlt size={18} />
      </button>
    </Link>
  );
};

export default FilmLocalEvents;
