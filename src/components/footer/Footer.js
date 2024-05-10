import React, { useState, useEffect } from "react";
import FilmCalendarSearch from "../search/FilmCalendarSearch";
import { FaTicketAlt } from "react-icons/fa";
import FilmHome from "../buttons/FilmHome";
import FilmLocalEvents from "../buttons/FilmLocalEvents";
import FilmToggleSearch from "../buttons/FilmToggleSearch";
import FilmCalendarAccount from "../buttons/FilmCalendarAccount";
import { UserAuth } from "../../context/AuthContext";
import { requestFetchMovies } from "../../api/moviesRequests";

function Footer({ pauseScroll, setPauseScroll }) {
  const [style, setStyle] = useState(false);
  const [rotateStyle, setRotate] = useState(false);

  const [searchValue, setSearchValue] = useState("");
  const [resultsList, setResultsList] = useState([]);
  const [pagination, setPagination] = useState({
    count: 0,
    page: 1,
    totalPages: 1,
  });
  const itemsPerpage = 10;

  const searchMovie = async (searchValue) => {
    let count = 0;
    let tmdbResults = [];
    const response = await requestFetchMovies({ page: 1, searchValue });
    // console.log(response.data);
    const { results, total_results } = response.data;
    count = Number(total_results);
    tmdbResults = results;
    setPagination({
      count,
      page: 1,
      totalPages: count === 0 ? 1 : Math.ceil(count / itemsPerpage),
    });
    // console.log(results);
    setResultsList(tmdbResults);
  };

  // fetch results page
  const fetchPage = async (pageNum) => {
    const response = await requestFetchMovies({ page: pageNum, searchValue });
    const { Search: results } = response.data;
    setPagination({
      ...pagination,
      page: pageNum,
    });
    setResultsList(resultsList.concat(results));
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
    setRotate(!rotateStyle);
    setPauseScroll(!pauseScroll);
    setSearchValue("");
    setResultsList([]);
  };

  const rotate = rotateStyle ? "turn-right" : "";
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
            toggleOff={toggleSearch}
          />
          <footer className="film-calendar-footer">
            <div className="footer-wrap">
              <FilmHome />
              <FilmLocalEvents />
              <FilmToggleSearch rotate={rotate} toggleSearch={toggleSearch} />
              <FaTicketAlt color="white" />
              <FilmCalendarAccount />
            </div>
          </footer>
        </>
      ) : null}
    </>
  );
}
export default Footer;