import React from "react";
import { FaUser } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const ButtonAccount = () => {
  return (
    <NavLink
      to="/account"
      className={({ isActive }) => (isActive ? "highlight" : "")}
    >
      <button className="account inline-flex">
        <FaUser size={12} />
      </button>
    </NavLink>
  );
};

export default ButtonAccount;