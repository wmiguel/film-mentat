import React, {useState, useEffect} from "react";
import SearchBox from "./SearchBox";
import SearchResults from "./SearchResults";
import { fetchMovieSearch } from "../../api/moviesRequests";

const Search = ({
  style,
  searchResults,
  setSearchResults,
  searchValue,
  setSearchValue,
  openSearchDetails,
  toggleOff,
}) => {
  const [pages, setPages] = useState({
    count: 0,
    page: 1,
    totalPages: 1,
  });
  const toggle = style ? "toggle-on" : "toggle-off";
  const { count: countResults } = pages;

  const fetchPage = async (pageNum) => {
    const response = await fetchMovieSearch({ page: pageNum, searchValue });
    setPages({
      ...pages,
      page: pageNum,
    });
    setSearchResults(searchResults.concat(response.data.results));
  };

  useEffect(() => {
    if (searchValue.length >= 3) {
      const searchMovie = async (searchValue) => {
        let count = 0;
        let searchResults = [];
        const response = await fetchMovieSearch({ page: 1, searchValue });
        const { results, total_results, total_pages } = response.data;
        count = Number(total_results);
        searchResults = results;
        setPages({
          count,
          page: 1,
          totalPages: total_pages,
        });
        setSearchResults(searchResults);
      };
      searchMovie(searchValue);
    } else {
      setSearchResults([]);
    }
  }, [searchValue, setSearchResults]);

  return (
    <section
      id="scrollableDiv"
      className={`search flex ${toggle}`}
    >
      <SearchBox
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        toggleOff={toggleOff}
      />
      {searchResults.length ? (
        <SearchResults
          fetchPage={fetchPage}
          pages={pages}
          searchResults={searchResults}
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
      ) : null}
    </section>
  );
};

export default Search;