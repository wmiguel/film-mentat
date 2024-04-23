import React from "react";
import { MdEvent } from "react-icons/md";
import { Link } from "react-router-dom";

const FilmLocalEvents = () => {
  return (
    <Link to="/local">
      <button className="local">
        <MdEvent size={18} />
      </button>
    </Link>
  );
};

export default FilmLocalEvents;