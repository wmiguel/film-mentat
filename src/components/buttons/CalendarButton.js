import React from "react";
import { NavLink } from "react-router-dom";
import { FaRegCalendarAlt } from "react-icons/fa";

const CalendarButton = () => {
  return (
    <NavLink
      to="/calendar"
      className={({ isActive }) => (isActive ? "orange" : "")}
    >
      <button className="navButton flex">
        <FaRegCalendarAlt size={18} />
        <span>Calendar</span>
      </button>
    </NavLink>
  );
};

export default CalendarButton;
