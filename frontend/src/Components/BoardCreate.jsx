import React from "react";
import { useState } from "react";
import "./BoardCreate.css";

function BoardCreate({ onCreate }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [author, setAuthor] = useState("");

  const handleSubmit = (event) => {
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
  };

  return (
    <form onSubmit={handleSubmit} className="board-create-form">
      <input placeholder="Board Title" type="text" value={title} onChange={(event) => setTitle(event.target.value)}></input>
      <text placeholder="Description" value={description} onChange={(event) => setDescription(event.target.value)}></text>
      <input placeholder="Category" type="text" value={category}></input>
      <input placeholder="Image URL" type="text" value={image}></input>
      <input placeholder="Owner" type="text" value={author}></input>
      <button type="submit">Create Board</button>
    </form>
  );
}

export default BoardCreate;
