import React from "react";
import { useState } from "react";
import "../Components/Card.css";

function Card({ card, onDeleteCard, onUpvote }) {
  const handleUpvoteClick = (event) => {
    event.stopPropogation();
    onUpvote(card.card_id);
  };

  const handleDeleteClick = (event) => {
    event.stopPropogation();
    onDeleteCard(card.card_id);
  };

  return (
    <div className="card">
      <div className="card-content">
        <h3>{card.title}</h3>
        <p>{card.description}</p>

        {card.gif && <img src={card.gif} className="card-gif"></img>}

        <div className="card-actions">
          <button onClick={handleUpvoteClick}>⇪ {card.upvotes}</button>
          <button onClick={handleDeleteClick}>🗑️</button>
        </div>
      </div>
    </div>
  );
}

export default Card;
