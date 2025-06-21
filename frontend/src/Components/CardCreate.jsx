import React from "react";
import { Grid } from "@giphy/react-components";
import { GiphyFetch } from "@giphy/js-fetch-api";
import { useState } from "react";

const gf = new GiphyFetch("NFz2Axtf9hU8zh0SJ4dm3XkrWg4nKlQH");

function CardCreate({ onCreate, boardId }) {
  const [gifSearchTerm, setGifSearchTerm] = useState("");
  const [showGifGrid, setShowGifGrid] = useState(false);
  const [newCard, setNewCard] = useState({
    title: "",
    gif: "",
    description: "",
    author: "",
  });

  const handleInputChange = (event) => {
    setNewCard({ ...newCard, [event.target.name]: event.target.value });
  };

  const handleGifSelect = (gif) => {
    setNewCard((prev) => ({ ...prev, gif: gif.images.fixed_width.url }));
    setShowGifGrid(false);
    setGifSearchTerm("");
  };

  const handleGifSearchKeyDown = (event) => {
    if (event.key === "Enter") {
      console.log("This worked");
      event.preventDefault();
      setShowGifGrid(true);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!newCard.title || !newCard.gif) {
      return;
    }
    onCreate({ ...newCard, board_id: boardId });
    setNewCard({ title: "", description: "", author: "", gif: "" });
    try {
      const res = await fetch("http://localhost:4000/cards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...newCard, board_id: boardId }),
      });
      const createdCard = await res.json();
      onCreate(createdCard);
      //setNewCard({ title: "", gif: "", description: "", author: "" });
    } catch (error) {
      console.error("Error when creating card: ", error);
    }
  };

  return (
    <form className="card-create-form" onSubmit={handleSubmit}>
      <input
        name="title"
        placeholder="Title"
        value={newCard.title}
        onChange={handleInputChange}></input>
      <input
        name="description"
        placeholder="Message"
        value={newCard.description}
        onChange={handleInputChange}></input>
      <input
        name="author"
        placeholder="Author (optional)"
        value={newCard.author}
        onChange={handleInputChange}></input>
      <input
        type="text"
        placeholder="Search GIFs"
        value={gifSearchTerm}
        onChange={(event) => setGifSearchTerm(event.target.value)}
        onKeyDown={handleGifSearchKeyDown}></input>

      {showGifGrid && (
        <Grid
          width={400}
          columns={3}
          fetchGifs={(offset) => gf.search(gifSearchTerm, { offset, limit: 9 })}
          onGifClick={(gif, event) => {
            event.preventDefault();
            handleGifSelect(gif);
          }}
        />
      )}
      {newCard.gif && <img src={newCard.gif} />}
      <button type="submit">Submit Form</button>
    </form>
  );
}

export default CardCreate;
