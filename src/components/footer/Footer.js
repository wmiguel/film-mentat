import React, { useState } from "react";
import Search from "../search/Search";
import CalendarButton from "../buttons/CalendarButton";
import ScreeningsButton from "../buttons/ScreeningsButton";
import SearchButton from "../buttons/SearchButton";
import AccountButton from "../buttons/AccountButton";
import { UserAuth } from "../../context/AuthContext";

const Footer = ({ openSearchDetails }) => {
  const [style, setStyle] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const toggleSearch = () => {
    setStyle(!style);
    setSearchValue("");
    setSearchResults([]);
  };
  const { user } = UserAuth();
  return (
    <>
      {user?.displayName ? (
        <>
          <Search
            style={style}
            searchResults={searchResults}
            setSearchResults={setSearchResults}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            openSearchDetails={openSearchDetails}
            toggleOff={toggleSearch}
          />
          <footer className="sc-footer flex">
            <div className="wrap flex">
              <CalendarButton />
              <ScreeningsButton />
              <AccountButton />
              <SearchButton toggleOn={toggleSearch} />
            </div>
          </footer>
        </>
      ) : null}
    </>
  );
};
export default Footer;