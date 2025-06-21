import React from "react";
import { useState } from "react";
import "./BoardCreate.css";

function BoardCreate({ onCreate }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [author, setAuthor] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const categoryOptions = ["Recent", "Celebration", "Thank you", "Inspiration"];

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!title || !category) {
      alert("Please fill out the title and select a category");
      return;
    }
    const newBoard = {
      title,
      category,
      owner: author.trim() || undefined,
    };
    onCreate(newBoard);

    setTitle("");
    setCategory("");
    setAuthor("");
    setImageUrl("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}></input>
      </label>
      <label>
        Category:
        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}>
          <option value="" disabled>
            Select Category
          </option>
          {categoryOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>

      <label>
        Author (optional):
        <input
          type="text"
          value={author}
          onChange={(event) => setAuthor(event.target.value)}
          placeholder="Enter author name"
        />
      </label>
      {/* <label>
        Image URL
        <input type="text" value={imageUrl} onChange={(event) => setImageUrl(event.target.value)} placeholder="Link here!"></input>
      </label> */}
      <button type="submit">Create Board</button>
    </form>
  );
}

export default BoardCreate;
