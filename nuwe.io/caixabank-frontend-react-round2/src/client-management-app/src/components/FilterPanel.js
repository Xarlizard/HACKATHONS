import React, { memo, useCallback } from "react";

const FilterPanel = ({ onFilterChange, onSortChange }) => {
  // Memoized handlers
  const handleFilterChange = useCallback(
    (e) => {
      onFilterChange({ type: e.target.value });
    },
    [onFilterChange]
  );

  const handleSortChange = useCallback(
    (key) => {
      onSortChange((prev) => ({
        key,
        direction:
          prev?.key === key && prev.direction === "asc" ? "desc" : "asc",
      }));
    },
    [onSortChange]
  );

  return (
    <div className="filter-panel">
      <select onChange={handleFilterChange}>
        <option value="All">All Types</option>
        <option value="Stocks">Stocks</option>
        <option value="Crypto">Crypto</option>
        <option value="Funds">Funds</option>
      </select>
      <div className="sort-buttons">
        <button onClick={() => handleSortChange("name")}>Sort by Name</button>
        <button onClick={() => handleSortChange("value")}>Sort by Value</button>
        <button onClick={() => handleSortChange("change")}>
          Sort by Change
        </button>
      </div>
    </div>
  );
};

export default memo(FilterPanel);
