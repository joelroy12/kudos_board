import React from "react";
import { useState } from "react";
import "./Dashboard.css";
import BoardCard from "./BoardCard";
import { useEffect } from "react";
import HomeSearch from "./HomeSearch";
import BoardCreate from "./BoardCreate";

function Dashboard() {
  const [pinnedBoards, setPinnedBoards] = useState([]);
  const [boards, setBoards] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    // Fetch all the boards from the backend
    async function fetchBoards() {
      try {
        const res = await fetch("http://localhost:4000/boards");
        const data = await res.json();
        const pinned = data
          .filter((board) => board.isPinned)
          .map((board) => board.board_id);
        setBoards(data);
        setPinnedBoards(pinned);
      } catch (error) {
        console.log("Error fetching boards: ", error);
      }
    }
    fetchBoards();
  }, []);

  const handlePinToggle = async (boardId) => {
    try {
      const res = await fetch(`http://localhost:4000/boards/${boardID}/pin`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      });
      const updatedBoard = await res.json();

      setBoards((previousBoards) => 
        previousBoards.map((board) =>
          board.board_id === boardId ? updatedBoard : board
        )
      );
    } catch (error) {
      console.error("Pin toggle didn't work: ", error);
    }
  };

  const handleDeleteBoard = async (boardId) => {
    try {
      await fetch(`http://localhost:4000/boards/${boardId}`, {
        method: "DELETE",
      });

      // Delete the board from the list
      setBoards((previousBoards) =>
        previousBoards.filter((board) => board.board_id !== boardId)
      );
    } catch (error) {
      console.error("Delete didn't work: ", error);
    }
  };

  const sortedBoards = [...boards].sort((firstBoard, secondBoard) => {
    const firstPinned = pinnedBoards.includes(firstBoard.board_id);
    const secondPinned = pinnedBoards.includes(secondBoard.board_id);

    if (firstPinned && !secondPinned) {
      return -1;
    }
    if (!firstPinned && secondPinned) {
      return 1;
    }
    return new Date(secondBoard.createdAt) - firstBoard.createdAt;
  });

  const handleCreateBoard = (newBoard) => {
    setBoards((prev) =>[newBoard, ...prev]);
  }

  return (
    <div className="Dashboard">
      <HomeSearch />
      <BoardCreate onCreate={handleCreateBoard} />
      <div className="category-filter">
        <label htmlFor="category-select">Filter by Category: </label>
        <select id="category-select" value={selectedCategory} onChange={(event) => setSelectedCategory(event.target.value)}>
          <option value="All">All</option>
        <option value="Recent">Recent</option>
        <option value="Celebration">Celebration</option>
        <option value="Thank you">Thank you</option>
        <option value="Inspiration">Inspiration</option>
        </select>
      </div>
      <div className="board-display">
      {sortedBoards
        .filter((board) =>
          selectedCategory === "All"
            ? true
            : board.category === selectedCategory
        )
        .map((board) => (
          <BoardCard
            key={board.board_id}
            board={board}
            pinned={pinnedBoards.includes(board.board_id)}
            onDelete={handleDeleteBoard}
            onPinToggle={handlePinToggle}
          />
        ))}
    </div>
      <div className="board-display">
        {sortedBoards.map((board) => (
          <BoardCard
            key={board.board_id}
            board={board}
            pinned={pinnedBoards.includes(board.board_id)}
            onDelete={handleDeleteBoard}
            onPinToggle={handlePinToggle}
          />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
