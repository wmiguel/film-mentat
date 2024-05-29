import React from "react";
import FilmSearchCancel from "./FilmSearchCancel";

const FilmCalendarSearchBox = ({ searchValue, setSearchValue, toggleOff }) => {
  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className="film-calendar-search-box">
      <FilmSearchCancel toggleOff={toggleOff} />
      <form
        className="search-form flex"
        onSubmit={(e) => {
          e.preventDefault();
          const searchInput = document.getElementById("search-input");
          searchInput.blur();
        }}
      >
        <input
          id="search-input"
          className="search-input"
          onChange={handleInputChange}
          value={searchValue}
          placeholder="Type to search..."
          type="text"
          enterKeyHint="search"
        />
      </form>
    </div>
  );
};

export default FilmCalendarSearchBox;