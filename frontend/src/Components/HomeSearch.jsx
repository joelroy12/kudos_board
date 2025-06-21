import React from "react";
import { useState } from "react";

function HomeSearch({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (onSearch) {
      onSearch(query);
    }
  };

  const clearSearch = () => {
    setQuery("");
    if (onSearch) {
      onSearch("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search boards..."
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <button type="submit">Search</button>
      <button type="button" onClick={clearSearch}>
        Clear
      </button>
    </form>
  );
}

export default HomeSearch;
