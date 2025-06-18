const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Get all cards
router.get("/", async (req, res) => {
  try {
    const cards = await prisma.card.findMany();
    res.json(cards);
  } catch {
    res.status(404).send("Error: ", { error });
  }
});

// Get cards for a specific board
router.get("./board/:board_id", async (req, res) => {
  const board_id = parseInt(req.params.board_id);
  try {
    const cards = await prisma.card.findMany({
      where: { board_id },
    });
    res.json(cards);
  } catch {
    res.status(500).send("Error: ", { error });
  }
});

// Get single unique card by board_id
router.get("/:card_id", async (req, res) => {
  const card_id = parseInt(req.params.board_id);
  try {
    const card = await prisma.card.findUnique({
      where: { card_id },
    });
    res.json(card);
  } catch {
    res.status(500).send("Error: ", { error });
  }
});

// Create a new card
router.post("/", async (req, res) => {
  const { title, content, gif, board_id } = req.body;
  try {
    const newCard = await prisma.card.create({
      data: {
        title,
        content,
        gif,
        board_id,
        upvotes,
        createdAt,
        updatedAt,
      },
    });
    res.status(201).json(newCard);
  } catch {
    res.status(404).send("Error: ", { error });
  }
});

// Update card by id
router.put("/:card_id", async (req, res) => {
  const card_id = parseInt(req.params.card_id)
  const { title, content, gif, upvotes } = req.body;
  try {
    const updatedCard = await prisma.card.update({
      where: { card_id },
      data: {
        title,
        content,
        gif,
        upvotes,
        updatedAt,
      },
    });
    res.json(updatedCard);
  } catch {
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
  } catch {
    res.status(500).json("Error: ", { error });
  }
});

module.exports = router;
