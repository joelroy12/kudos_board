import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CardCreate from "./CardCreate";

function BoardPage() {
  const [board, setBoard] = useState(null);
  const [cards, setCards] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [showCardForm, setShowCardForm] = useState(false);

  const { id: boardId } = useParams();
  console.log(boardId);

  useEffect(() => {
    if (!boardId) {
      return;
    }

    const fetchBoardContents = async () => {
      try {
        const boardResponse = await fetch(
          `http://localhost:4000/boards/${boardId}`
        );
        const boardData = await boardResponse.json();
        console.log("Board data fetch!: ", boardData);
        setBoard(boardData);
        const cardsResponse = await fetch(`http://localhost:4000/cards`);
        const cardsData = await cardsResponse.json();
        console.log("Card data fetched!: ", cardsData);
        const filteredCards = cardsData.filter(
          (card) => String(card.board_id) === String(boardId)
        );
        setCards(filteredCards);
      } catch (error) {
        console.error("Can't fetch either cards or board: ", error);
      }
    };
    fetchBoardContents();
  }, [boardId]);

  const handleCreateCard = async (cardData) => {
    if (!cardData.title || !cardData.gif) {
      return;
    }
    try {
      const res = await fetch("http://localhost:4000/cards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...cardData, owner: "JOEL", isPinned: false, board_id: boardId }),
      });
      const createdCard = await res.json();
      console.log(createdCard);
      setCards((previousCards) => [createdCard, ...previousCards]);
    } catch (error) {
      console.error("Was not able to create a new card: ", error);
    }
  };

  const handleInputChange = (event) => {
    setNewCard({ ...newCard, [event.target.name]: event.target.value });
  };

  const handleUpvote = async (cardId) => {
    try {
      const targetCard = cards.find((card) => card.card_id === cardId);
      if (!targetCard) {
        return;
      }
      const res = await fetch(`http://localhost:4000/cards/${cardId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ upvotes: targetCard.upvotes + 1 }),
      });
      const updatedCard = await res.json();
      setCards((previousCards) =>
        previousCards.map((card) =>
          card.card_id === cardId ? updatedCard : card
        )
      );
    } catch (error) {
      console.error("Upvotes didn't work: ", error);
    }
  };

  const handleDelete = async (cardId) => {
    await fetch(`http://localhost:4000/cards/${cardId}`, {
      method: "DELETE",
    });
    setCards((previousCards) =>
      previousCards.filter((card) => card.card_id !== cardId)
    );
  };

  const openModal = (card) => {
    setSelectedCard(card);
    setModal(true);
  };

  const closeModal = () => {
    setSelectedCard(null);
    setModal(false);
  };

  const handleDeleteCard = async (cardId) => {
    try {
      await fetch(`http://localhost:4000/cards/${cardId}`, {
        method: "DELETE",
      });

      // Delete the board from the list
      setCards((previousCards) =>
        previousCards.filter((card) => card.card_id !== cardId)
      );
    } catch (error) {
      console.error("Delete didn't work: ", error);
    }
  };

  if (!board) {
    return <div>Loading board...</div>;
  }
  console.log(cards);
  return (
    <div className="BoardPage">
      {/* <h2>{board.title}</h2>
      <p>Category: {board.category}</p>
      <p>Owner: {board.owner}</p> */}
      <button onClick={() => setShowCardForm((prev) => !prev)}>
        {showCardForm ? "Hide" : "Create a Card"}
      </button>
      {showCardForm && (
        <CardCreate onCreate={handleCreateCard} boardId={boardId} />
      )}
      <div className="cards-display">
        {cards.map((card) => {
          return (
            <div key={card.card_id} className="card">
              <h3>Title: {card.title}</h3>
              <p>Description: {card.description}</p>
              {card.gif && <img src={card.gif} />}
              <p>By: {card.author || "Anonymous"}</p>
              <button
                className="upvote-button"
                onClick={() => handleUpvote(card.card_id)}>
                ⇪ {card.upvotes}
              </button>
              <button onClick={() => openModal(card)}>Comments</button>
              <button
                className="delete-button"
                onClick={() => handleDeleteCard(card.card_id)}>
                🗑️
              </button>
            </div>
          );
        })}
      </div>
      {modal && selectedCard && (
        <CommentModal card={selectedCard} onClose={closeModal} />
      )}
    </div>
  );
}

export default BoardPage;
