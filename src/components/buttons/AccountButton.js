import React from "react";
import { NavLink } from "react-router-dom";
import { IoSettingsSharp } from "react-icons/io5";

const AccountButton = () => {
  return (
    <NavLink
      to="/account"
      className={({ isActive }) => (isActive ? "orange" : "")}
    >
      <button className="navButton flex">
        <IoSettingsSharp size={18} />
        <span>Settings</span>
      </button>
    </NavLink>
  );
};

export default AccountButton;