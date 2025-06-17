import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import BoardCard from "./BoardCard";

function Dashboard() {
  const [pinnedBoards, setPinnedBoards] = useState([]);
  const [deleteBoards, setDeleteBoards] = useState([]);
  const [boards, setBoards] = useState([
    {
      id: 1,
      title: "Team Kudos",
    },
    {
      id: 2,
      title: "Project Wins",
    },
    {
      id: 3,
      title: "Customer Success Stories",
    },
    {
      id: 4,
      title: "Innovation Ideas",
    },
    {
      id: 5,
      title: "Monthly Highlights",
    },
  ]);

  const handlePinToggle = (boardId) => {
    if (pinnedBoards.includes(boardId)) {
      setPinnedBoards(pinnedBoards.filter((id) => id !== boardId));
    } else {
      setPinnedBoards([...pinnedBoards, boardId]);
    }
  };

  const handleDelete = (boardId) => {
    setBoards((prevBoards) =>
      prevBoards.filter((board) => board.id !== boardId)
    );
    setPinnedBoards((prev) => prev.filter((id) => id !== boardId));
  };

  const sortedBoards = [...boards].sort((firstBoard, secondBoard) => {
    const firstPinned = pinnedBoards.includes(firstBoard.id);
    const secondPinned = pinnedBoards.includes(secondBoard.id);

    if (firstPinned && !secondPinned) {
      return -1;
    }
    if (!firstPinned && secondPinned) {
      return 1;
    }
    return 0;
  });

  return (
    <div className="Dashboard">
      {/* <BoardCreate /> */}
      {sortedBoards.map((board) => (
        <BoardCard
          key={board.id}
          board={board}
          pinned={pinnedBoards.includes(board.id)}
          onDelete={handleDelete}
          onPinToggle={handlePinToggle}
        />
      ))}
    </div>
  );
}

export default Dashboard;
