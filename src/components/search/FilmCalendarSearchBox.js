import React from "react";

const FilmCalendarSearchBox = ({ searchValue, setSearchValue }) => {
  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className="film-calendar-search-box">
      <form
        className="search-form"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <input
          id="searchInput"
          className="search-input"
          onChange={handleInputChange}
          value={searchValue}
          placeholder="Type to search..."
          type="text"
        />
      </form>
    </div>
  );
};

export default FilmCalendarSearchBox;