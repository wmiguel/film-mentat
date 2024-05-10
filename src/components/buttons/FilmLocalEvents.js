import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const FilmLocalEvents = () => {
  return (
    <Link to="/local">
      <button className="local inline-flex">
        <FaMapMarkerAlt size={18} />
      </button>
    </Link>
  );
};

export default FilmLocalEvents;