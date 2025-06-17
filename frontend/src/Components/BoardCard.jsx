import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BoardCard.css";

function BoardCard({ board, pinned, onDelete, onPinToggle }) {
  const navigate = useNavigate();
  const [likes, setLikes] = useState(0);

  const handleCardClick = (event) => {
    event.preventDefault();
    navigate(`/board/${board.id}`);
  };

  const handleViewClick = () => {
    navigate(`/board/${board.id}`);
  };

  const handleDelete = () => {
    onDelete(board.id);
  };

  const handlePinClick = (event) => {
    event.stopPropagation();
    onPinToggle(board.id)
  };

  const handleUpvote = () => {
    setLikes(likes + 1);
  };

  return (
    <div className="board-card" onClick={handleCardClick}>
      <div className="board-image-container">
        <img className="board-image" src="./assets/Welcome.jpg"></img>
        <button
          className="pin-button"
          onClick={handlePinClick}>
          {pinned ? "📍" : "⟟"}
        </button>
      </div>
      <div className="card-content">
        <h3>Board Title: ({board.title})</h3>
        <button className="view-button" onClick={handleViewClick}>View Board</button>
        <button className="delete-button" onClick={handleDelete}>🗑️</button>
        <button className="upvote-button" onClick={handleUpvote}>⇪ {likes}</button>
      </div>
    </div>
  );
}

export default BoardCard;
