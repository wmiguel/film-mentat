import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const FilmLocalEvents = () => {
  return (
    <NavLink
      to="/local"
      className={({ isActive }) => (isActive ? "orange" : "")}
    >
      <button className="navButton">
        <FaMapMarkerAlt size={18} />
        <span>Screenings</span>
      </button>
    </NavLink>
  );
};

export default FilmLocalEvents;