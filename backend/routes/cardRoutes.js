const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
console.log("hello");

// Get all cards
router.get("/", async (req, res) => {
  try {
    const cards = await prisma.card.findMany();
    res.json(cards);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// Get cards for a specific board
router.get("/boards/:board_id", async (req, res) => {
  const board_id = parseInt(req.params.board_id);
  try {
    const cards = await prisma.card.findMany({
      where: { board_id },
    });
    res.json(cards);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new card
router.post("/", async (req, res) => {
  const { title, description, gif, board_id, owner, isPinned, comments } = req.body;
  console.log(description, title);
  try {
    const newCard = await prisma.card.create({
      data: {
        title,
        description,
        gif,
        board_id: parseInt(board_id),
        upvotes: 0,
        owner,
        pinnedAt: new Date(), 
        isPinned,
        comments,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
    res.status(201).json(newCard);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// Update card by id
router.put("/:card_id", async (req, res) => {
  const card_id = parseInt(req.params.card_id);
  const { title, description, gif, board_id } = req.body;
  try {
    const updatedCard = await prisma.card.update({
      where: { card_id },
      data: {
        title,
        description,
        gif,
        board_id,
      },
    });
    res.json(updatedCard);
  } catch (error) {
    res.status(500).json("Error: ", { error });
  }
});

// Update whether a card is pinned or not
router.put("/:card_id/pin", async (req, res) => {
  const { card_id } = req.params;
  const { isPinned } = req.body;

  try {
    const updated = await prisma.card.update({
      where: { card_id: parseInt(card_id) },
      data: {
        isPinned,
        pinnedAt: isPinned ? new Date() : null,
      },
    });
    res.json(updated);
  } catch (error) {
    res.status(500).json("Error: ", { error });
  }
});

// Delete a card by it's id
router.delete("/:card_id", async (req, res) => {
  const card_id = parseInt(req.params.card_id);
  try {
    await prisma.card.delete({
      where: { card_id },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json("Error: ", { error });
  }
});

// Get single unique card by board_id
router.get("/:card_id", async (req, res) => {
  const card_id = parseInt(req.params.card_id);
  try {
    const card = await prisma.card.findUnique({
      where: { card_id },
    });
    res.json(card);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
