import React from "react";
// import { FaUser } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { NavLink } from "react-router-dom";

const ButtonAccount = () => {
  return (
    <NavLink
      to="/account"
      className={({ isActive }) => (isActive ? "orange" : "")}
    >
      <button className="account inline-flex">
        <IoSettingsSharp size={18} />
      </button>
    </NavLink>
  );
};

export default ButtonAccount;