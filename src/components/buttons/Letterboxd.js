import React from "react";
import { FaTicketAlt } from "react-icons/fa";

import { NavLink } from "react-router-dom";

const Letterboxd = () => {
  return (
    <NavLink
      // to="/letterboxd"
      to="/now-playing"
      className={({ isActive }) => (isActive ? "orange" : "")}
    >
      <button className="local inline-flex">
        <FaTicketAlt size={18} />
      </button>
    </NavLink>
  );
};

export default Letterboxd;
