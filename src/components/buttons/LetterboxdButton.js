import React from "react";
import { NavLink } from "react-router-dom";
import { FaTicketAlt } from "react-icons/fa";

const LetterboxdButton = () => {
  return (
    <NavLink
      to="/letterboxd"
      className={({ isActive }) => (isActive ? "orange" : "")}
    >
      <button className="navButton flex">
        <FaTicketAlt size={18} />
      </button>
    </NavLink>
  );
};

export default LetterboxdButton;
