import React from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const FilmLocalEvents = () => {
  return (
    <NavLink
      to="/calendar"
      className={({ isActive }) => (isActive ? "highlight" : "")}
    >
      <button className="local inline-flex">
        <FaRegCalendarAlt size={18} />
      </button>
    </NavLink>
  );
};

export default FilmLocalEvents;
