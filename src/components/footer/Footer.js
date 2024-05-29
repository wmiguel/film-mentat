import React, { useState, useEffect } from "react";
import FilmCalendarSearch from "../search/FilmCalendarSearch";
import FilmHome from "../buttons/FilmHome";
import FilmLocalEvents from "../buttons/FilmLocalEvents";
import FilmToggleSearch from "../buttons/FilmToggleSearch";
import AccountButton from "../buttons/Account";
import LetterboxdButton from "../buttons/Letterboxd";
import { UserAuth } from "../../context/AuthContext";
import { requestFetchMovies } from "../../api/moviesRequests";

const Footer = ({ openSearchDetails }) => {
  const [style, setStyle] = useState(false);

  const [searchValue, setSearchValue] = useState("");
  const [resultsList, setResultsList] = useState([]);
  const [pagination, setPagination] = useState({
    count: 0,
    page: 1,
    totalPages: 1,
  });
  // const itemsPerpage = 10;

  const searchMovie = async (searchValue) => {
    let count = 0;
    let tmdbResults = [];
    const response = await requestFetchMovies({ page: 1, searchValue });
    const { results, total_results, total_pages } = response.data;
    count = Number(total_results);
    tmdbResults = results;
    setPagination({
      count,
      page: 1,
      totalPages: total_pages,
      // totalPages: count === 0 ? 1 : Math.ceil(count / itemsPerpage),
    });
    setResultsList(tmdbResults);
  };

  // fetch results page
  const fetchPage = async (pageNum) => {
    const response = await requestFetchMovies({ page: pageNum, searchValue });
    // const { Search: results } = response.data;
    setPagination({
      ...pagination,
      page: pageNum,
    });
    setResultsList(resultsList.concat(response.data.results));
  };

  // get results when searchValue change
  useEffect(() => {
    if (searchValue.length >= 3) {
      searchMovie(searchValue);
    } else {
      setResultsList([]);
    }
  }, [searchValue]);

  const toggleSearch = () => {
    setStyle(!style);
    setSearchValue("");
    setResultsList([]);
  };

  const { user } = UserAuth();

  return (
    <>
      {user?.displayName ? (
        <>
          <FilmCalendarSearch
            fetchPage={fetchPage}
            pagination={pagination}
            resultsList={resultsList}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            style={style}
            openSearchDetails={openSearchDetails}
            toggleOff={toggleSearch}
          />
          <footer className="film-calendar-footer">
            <div className="footer-wrap">
              <FilmHome />
              <FilmLocalEvents />
              <FilmToggleSearch toggleSearch={toggleSearch} />
              <LetterboxdButton />
              <AccountButton />
            </div>
          </footer>
        </>
      ) : null}
    </>
  );
};
export default Footer;