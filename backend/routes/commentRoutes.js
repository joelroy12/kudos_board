const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Get all comments
router.get("/", async (req, res) => {
  try {
    const comments = await prisma.comment.findMany();
    res.json(comments);
  } catch {
    res.status(404).send("Error: ", { error });
  }
});

// Get all comments for a specified card
router.get("/card/:card_id", async (req, res) => {
  const card_id = parseInt(req.params.card_id);
  try {
    const comments = await prisma.comment.findMany({
      where: { card_id },
    });
    res.json(comments);
  } catch {
    res.status(500).send("Error: ", { error });
  }
});

// Get single commend by id
router.get("/:comment_id", async (req, res) => {
  const comment_id = parseInt(req.params.comment_id);
  try {
    const comment = await prisma.comment.findMany({
      where: { comment_id },
    });
    res.json(comment);
  } catch {
    res.status(500).send("Error: ", { error });
  }
});

// Create a new comment
router.post("/", async (req, res) => {
  const { body, author, card_id } = req.body;
  try {
    const newComment = await prisma.comment.create({
      data: {
        body,
        author,
        card_id,
      },
    });
    res.status(201).json(newComment);
  } catch {
    res.status(404).send("Error: ", { error });
  }
});

// Update comment by id
router.put("/:comment_id", async (req, res) => {
  const comment_id = parseInt(req.params.comment_id);
  const { body, author} = req.body;
  try {
    const updatedComment = await prisma.comment.update({
      where: { comment_id },
      data: {
        body,
        author,
        updatedAt,
      },
    });
    res.json(updatedComment);
  } catch {
    res.status(500).json("Error: ", { error });
  }
});

// Delete a comment by it's id
router.delete("/:comment_id", async (req, res) => {
  const comment_id = parseInt(req.params.comment_id);
  try {
    await prisma.comment.delete({
      where: { comment_id },
    });
    res.status(204).send();
  } catch {
    res.status(500).json("Error: ", { error });
  }
});

module.exports = router;
