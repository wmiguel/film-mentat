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
  openSearchDetails,
  toggleOff,
}) => {
  const className = style ? "toggle-on" : "toggle-off";
  const { user } = UserAuth();

  return (
    <>
      {user?.displayName ? (
        <section
          id="scrollableDiv"
          className={`film-calendar-search ${className}`}
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
            openSearchDetails={openSearchDetails}
            toggleOff={toggleOff}
          />
        </section>
      ) : null}
    </>
  );
};

export default FilmCalendarSearch;