import React from "react";
import FilmCalendarSearchBox from "./FilmCalendarSearchBox";
import FilmCalendarSearchResults from "./FilmCalendarSearchResults";

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

  return (
    <section className={`film-calendar-search ${className}`} id="scrollableDiv">
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
  );
}

export default FilmCalendarSearch;