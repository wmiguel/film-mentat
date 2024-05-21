import React from "react";
import { FaTicketAlt } from "react-icons/fa";

import { NavLink } from "react-router-dom";

const Letterboxd = () => {
  return (
    <NavLink
      to="/letterboxd"
      className={({ isActive }) => (isActive ? "highlight" : "")}
    >
      <button className="local inline-flex">
        <FaTicketAlt size={18} />
      </button>
    </NavLink>
  );
};

export default Letterboxd;
