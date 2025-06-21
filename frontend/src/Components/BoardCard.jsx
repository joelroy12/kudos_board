import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BoardCard.css";

function BoardCard({ board, card, pinned, onDelete, onPinToggle }) {
  const navigate = useNavigate();

  // When the board card is clicked, go to board page
  const handleCardClick = (event) => {
    event.preventDefault();
    navigate(`/boards/${board.board_id}`);
  };

  // For the view board button
  const handleViewClick = (event) => {
    event.stopPropagation();
    navigate(`/boards/${board.board_id}`);
  };

  // Deletes the board when clicking the button
  const handleDelete = (event) => {
    event.stopPropagation();
    onDelete(board.board_id);
  };

  // For pinning/unpinning
  const handlePinClick = (event) => {
    event.stopPropagation();
    onPinToggle(board.board_id);
  };

  return (
    <div className="board-card" onClick={handleCardClick} role="button">
      <div className="board-image-container">
        <img className="board-image" src={board.image}></img>
      </div>
      <button
        className="pin-button"
        onClick={(event) => {
          event.stopPropagation();
          handlePinClick;
        }}>
        {pinned ? "📍" : "⟟"}
      </button>
      <div className="board-content">
        <div className="board-text">
          <h3 className="board-title">{board.title}</h3>
          <p className="board-description">{board.category}</p>
          <p className="board-owner">Owner: {board.owner || "Anonymous"}</p>
        </div>
        <div className="board-buttons">
          <button className="view-button" onClick={handleViewClick}>
            View Board
          </button>
          <button className="delete-button" onClick={handleDelete}>
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
}

export default BoardCard;
