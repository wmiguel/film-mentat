import React from "react";
import { GiBrain } from "react-icons/gi";
import FilmToggleSearch from "../buttons/FilmToggleSearch";
import FilmCalendarAccount from "../buttons/FilmCalendarAccount";
import { UserAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

function FilmCalendarNavigation({ toggleSearch, rotateStyle }) {
  const rotate = rotateStyle ? "turn-right" : "toggle-left";
  const { user, logOut } = UserAuth();
  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className="film-calendar-header">
      <div className="film-calendar-sitename">
        <GiBrain size={25} />
        <h1>Mentat</h1>
      </div>
      <div className="film-calendar-nav">

        <FilmToggleSearch rotate={rotate} toggleSearch={toggleSearch} />

        {user?.displayName ? (
          <>
            <FilmCalendarAccount />
            <button onClick={handleSignOut}>Log Out</button>
          </>
        ) : (
          <Link style={{ color: "white" }} to="/signin">
            Sign In
          </Link>
        )}
      </div>
    </header>
  );
}

export default FilmCalendarNavigation;