const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Get all boards
router.get("/", async (req, res) => {
  try {
    const boards = await prisma.board.findMany();
    res.json(boards);
  } catch {
    res.status(404).json({ error: error.message });
  }
});

// Get one unique board by id
router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const board = await prisma.board.findUnique({
      where: { board_id: parseInt(id) },
    });
    res.json(board);
  } catch {
    res.status(500).json({ error: error.message });
  }
});

// Create a new board
router.post("/", async (req, res) => {
  const { title, category, owner } = req.body;
  try {
    const newBoard = await prisma.board.create({
      data: {
        title,
        category,
        owner,
      },
    });
    res.status(201).json(newBoard);
  } catch {
    res.status(404).json({ error: error.message });
  }
});

// Update board by id
router.put("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const { title, category, owner } = req.body;
  try {
    const updatedBoard = await prisma.board.update({
      where: { board_id: id },
      data: {
        title,
        category,
        owner,
      },
    });
    res.json(updatedBoard);
  } catch {
    res.status(500).json("Error: ", { error });
  }
});

// Delete a board by it's id
router.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await prisma.board.delete({
      where: { board_id: id },
    });
    res.status(204).send();
  } catch {
    res.status(500).json("Error: ", { error });
  }
});

module.exports = router;
