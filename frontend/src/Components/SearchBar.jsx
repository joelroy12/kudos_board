import React from "react";
import { useState } from "react";
import "./SearchBar.css";

function SearchBar() {
 
  const handleSubmit = (event) => {
    event.preventDefault();
    set
  }

  const clearSearch = () => {
    setSearchInput("");
  };

  return (
    <div className="search-components">
      <input
        type="text"
        placeholder="Search Boards..."
        //value={searchInput}
        onChange={(event) => setSearchInput(event.target.value)}></input>
      <button type="submit">Search</button>
      <button type="button" onClick={clearSearch}>
        Clear
      </button>
    </div>
  );
}

export default SearchBar;
