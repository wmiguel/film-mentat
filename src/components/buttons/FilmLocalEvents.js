import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const FilmLocalEvents = () => {
  return (
    <NavLink
      to="/local"
      className={({ isActive }) => (isActive ? "orange" : "")}
    >
      <button className="local inline-flex">
        <FaMapMarkerAlt size={18} />
      </button>
    </NavLink>
  );
};

export default FilmLocalEvents;