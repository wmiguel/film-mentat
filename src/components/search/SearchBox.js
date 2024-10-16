import React from "react";
import CancelButton from "../buttons/CancelButton";

const SearchBox = ({ searchValue, setSearchValue, toggleOff }) => {
  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className="search-box flex">
      <div className="buttons flex">
        <h4>Add a Movie</h4>
        <CancelButton toggleOff={toggleOff} />
      </div>

      <form
        className="flex"
        onSubmit={(e) => {
          e.preventDefault();
          const searchInput = document.getElementById("search-input");
          searchInput.blur();
        }}
      >
        <input
          id="search-input"
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

export default SearchBox;