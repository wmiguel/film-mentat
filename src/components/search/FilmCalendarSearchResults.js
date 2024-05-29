import React from "react";
import FilmSearchResults from "./FilmSearchResults";

const FilmCalendarSearchResults = ({
  fetchPage,
  pagination,
  resultsList,
  searchValue,
  openSearchDetails,
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
          openSearchDetails={openSearchDetails}
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
};

export default FilmCalendarSearchResults;