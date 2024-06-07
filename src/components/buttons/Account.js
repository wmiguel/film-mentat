import React from "react";
import { IoSettingsSharp } from "react-icons/io5";
import { NavLink } from "react-router-dom";

const ButtonAccount = () => {
  return (
    <NavLink
      to="/account"
      className={({ isActive }) => (isActive ? "orange" : "")}
    >
      <button className="navButton">
        <IoSettingsSharp size={18} />
        <span>Settings</span>
      </button>
    </NavLink>
  );
};

export default ButtonAccount;