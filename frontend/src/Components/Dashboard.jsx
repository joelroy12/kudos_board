import React from "react";
import { useState } from "react";
import "./Dashboard.css";
import BoardCard from "./BoardCard";
import { useEffect } from "react";

function Dashboard() {
  const [pinnedBoards, setPinnedBoards] = useState([]);
  const [deleteBoards, setDeleteBoards] = useState([]);
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    // Fetch all the boards from the backend
    async function fetchBoards() {
      const res = await fetch("http://localhost:3000/boards");
      const data = await res.json();
      setBoards(data);
    }

    // Fetched the pinned boards from the user
    async function fetchPinned() {
      const res = await fetch("/");
      const data = await res.json();
      setPinnedBoards(data);
    }

    fetchBoards();
    //fetchPinned();
  }, []);

  const handlePinToggle = async (boardId) => {
    const isPinned = pinnedBoards.includes(boardId);
    let updatedPins;
    if (isPinned) {
      updatedPins = pinnedBoards.filter((id) => id !== boardId);
    } else {
      updatedPins = [...pinnedBoards, boardId];
    }
    setPinnedBoards(updatedPins);

    // Udpate the backend with the newly pinned boards
    await fetch(""),
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pinnedBoards: updatedPins }),
      };
  };

  const handleDelete = async (boardId) => {
    await fetch("/boards/${boardId}", {
      method: "DELETE",
    });

    // Delete the board from the local
    setBoards((prevBoards) =>
      prevBoards.filter((board) => board.board_id !== boardId)
    );
    setPinnedBoards((prev) => prev.filter((id) => id !== boardId));
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
    return 0;
  });

  const handleCreateBoard = (newBoard) => {
    setBoards((prev) => [...newBoard, ...prev]);
  };

  return (
    <div className="Dashboard">
      {/* <BoardCreate onCreate={handleCreateBoard} /> */}
      {sortedBoards.map((board) => (
        <BoardCard
          key={board.board_id}
          board={board}
          pinned={pinnedBoards.includes(board.board_id)}
          onDelete={handleDelete}
          onPinToggle={handlePinToggle}
        />
      ))}
    </div>
  );
}

export default Dashboard;
