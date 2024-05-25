import React from "react";
import FilmCalendarSearchBox from "./FilmCalendarSearchBox";
import FilmCalendarSearchResults from "./FilmCalendarSearchResults";
import { UserAuth } from "../../context/AuthContext";

const FilmCalendarSearch = ({
  fetchPage,
  pagination,
  resultsList,
  searchValue,
  setSearchValue,
  style,
  toggleOff,
}) => {
  const className = style ? "toggle-on" : "toggle-off";
  const { user } = UserAuth();

  return (
    <>
      {user?.displayName ? (
        <section
          className={`film-calendar-search ${className}`}
          id="scrollableDiv"
        >
          <FilmCalendarSearchBox
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            toggleOff={toggleOff}
          />
          <FilmCalendarSearchResults
            fetchPage={fetchPage}
            pagination={pagination}
            resultsList={resultsList}
            searchValue={searchValue}
            toggleOff={toggleOff}
          />
        </section>
      ) : null}
    </>
  );
}

export default FilmCalendarSearch;