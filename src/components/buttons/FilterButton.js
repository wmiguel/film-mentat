import React from "react";
import { FaFilter } from "react-icons/fa";

const FilterButton = ({ toggleFilters }) => {
  return (
    <button className="filterButton flex" onClick={toggleFilters}>
      <FaFilter size={18} />
    </button>
  );
};

export default FilterButton;
