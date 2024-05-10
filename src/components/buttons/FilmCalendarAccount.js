import React from "react";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

const FilmCalendarAccount = () => {
  return (
    <Link to="/account">
      <button className="account inline-flex">
        <FaUser size={12} />
      </button>
    </Link>
  );
};

export default FilmCalendarAccount;