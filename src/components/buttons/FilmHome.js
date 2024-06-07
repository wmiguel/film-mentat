import React from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const FilmLocalEvents = () => {
  return (
    <NavLink
      to="/calendar"
      className={({ isActive }) => (isActive ? "orange" : "")}
    >
      <button className="navButton">
        <FaRegCalendarAlt size={18} /><span>Test</span>
      </button>
    </NavLink>
  );
};

export default FilmLocalEvents;
