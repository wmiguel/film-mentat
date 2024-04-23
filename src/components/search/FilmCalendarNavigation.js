import React from "react";
import { GiBrain } from "react-icons/gi";
import FilmToggleSearch from "../buttons/FilmToggleSearch";
import FilmCalendarAccount from "../buttons/FilmCalendarAccount";
import { UserAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

function FilmCalendarNavigation({ toggleSearch, rotateStyle }) {
  const rotate = rotateStyle ? "turn-right" : "toggle-left";
  const { user } = UserAuth();
  return (
    <header className="film-calendar-header">
      <Link style={{ color: "white", textDecoration: "none" }} to="/">
        <div className="film-calendar-sitename">
          <GiBrain size={25} />
          <h1>Mentat</h1>
        </div>
      </Link>
      {user?.displayName ? (
        <div className="film-calendar-nav">
          <FilmToggleSearch rotate={rotate} toggleSearch={toggleSearch} />
          <FilmCalendarAccount />
        </div>
      ) : null}
    </header>
  );
}

export default FilmCalendarNavigation;