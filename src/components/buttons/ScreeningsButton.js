import React from "react";
import { NavLink } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";

const ScreeningsButton = () => {
  return (
    <NavLink
      to="/screenings"
      className={({ isActive }) => (isActive ? "orange" : "")}
    >
      <button className="navButton flex">
        <FaMapMarkerAlt size={18} />
        <span>Screenings</span>
      </button>
    </NavLink>
  );
};

export default ScreeningsButton;