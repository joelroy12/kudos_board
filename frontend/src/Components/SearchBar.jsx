import React from "react";
import { useState } from "react";
import "./SearchBar.css";

function SearchBar({ onCreateBoard }) {
  const [searchInput, setSearchInput] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [author, setAuthor] = useState("");

  const handleSearchSubmit = (event) => {
    event.preventDefault();
  };

  const clearSearch = () => {
    setSearchInput("");
  };

  const handleCreateSubmit = (event) => {
    event.preventDefault();
    if (!title || !description || !category || !image) {
      alert("Please fill in all fields!");
      return;
    }
    // Create new board object
    const newBoard = {
      board_id: Date.now(),
      title,
      description,
      category,
      author: author || null,
      image,
      createdAt: new Date().toISOString(), // This is the string format for dates
      updatedAt: new Date().toISOString(),
    };
    // This will add the newBoard to the boards list
    onCreate(newBoard);

    // Reset the form fields after completing it
    setTitle("");
    setDescription("");
    setCategory("");
    setImage("");
    setAuthor("");
    setShowForm(false);

    return (
  
      <div className="search-bar-container">
        <form onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Search Boards..."
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}></input>
          <button type="submit">Search</button>
          <button type="button" onClick={clearSearch}>
            Clear
          </button>
        </form>

        <button onClick={() => setShowForm(!showForm)}>
          {showForm ? "Cancel" : "Create Board"}{" "}
        </button>
        {showForm && (
          <form onSubmit={handleSubmit} className="board-create-form">
            <input
              placeholder="Board Title"
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}></input>
            <textarea
              placeholder="Description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              rows={2}></textarea>
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              required>
              <option value="" disabled>
                Select Category
              </option>
              <option value="Recent">Recent</option>
              <option value="Celebration">Celebration</option>
              <option value="Thank You">Thank You</option>
              <option value="Inspiration">Inspiration</option>
            </select>
            <input
              placeholder="Image URL"
              type="text"
              value={image}
              onChange={(event) => setImage(event.target.value)}></input>
            <input
              placeholder="Owner"
              type="text"
              value={author}
              onChange={(event) => setAuthor(event.target.value)}></input>
            <button type="submit">Create Board</button>
          </form>
        )}
      </div>
    );
  };
}

export default SearchBar;
