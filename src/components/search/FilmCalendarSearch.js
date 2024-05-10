import React from "react";
import FilmCalendarSearchBox from "./FilmCalendarSearchBox";
import FilmCalendarSearchResults from "./FilmCalendarSearchResults";
// import FilmSearchCancel from "./FilmSearchCancel";
import { UserAuth } from "../../context/AuthContext";

function FilmCalendarSearch({
  fetchPage,
  pagination,
  resultsList,
  searchValue,
  setSearchValue,
  style,
  toggleOff,
}) {
  const className = style ? "toggle-on" : "toggle-off";
  const { user } = UserAuth();

  return (
    <>
      {user?.displayName ? (
        <section
          className={`film-calendar-search ${className}`}
          id="scrollableDiv"
        >
          {/* <FilmSearchCancel toggleOff={toggleOff}/> */}
          <FilmCalendarSearchBox
            searchValue={searchValue}
            setSearchValue={setSearchValue}
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