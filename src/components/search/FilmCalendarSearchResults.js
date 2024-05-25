import React from "react";
import FilmSearchResults from "./FilmSearchResults";

const FilmCalendarSearchResults = ({
  fetchPage,
  pagination,
  resultsList,
  searchValue,
  toggleOff,
}) => {
  const { count: countResults } = pagination;

  return (
    <>
      {resultsList.length ? (
        <FilmSearchResults
          fetchPage={fetchPage}
          pagination={pagination}
          resultsList={resultsList}
          toggleOff={toggleOff}
        />
      ) : null}

      {searchValue.length >= 3 ? (
        <div className="search-results-number">
          {countResults !== 0
            ? `${countResults} result${countResults > 1 ? "s" : ""}`
            : "No result"}
          {` for "${searchValue}"`}
        </div>
      ) : (
        <div className="search-results-number">
          {"Waiting for search results..."}
        </div>
      )}
    </>
  );
}

export default FilmCalendarSearchResults;