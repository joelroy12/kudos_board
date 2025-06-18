const express = require("express");
const app = express();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const boardRoutes = require("./routes/boardRoutes");
const cardRoutes = require("./routes/cardRoutes");
const commentRoutes = require("./routes/commentRoutes");
const port = process.env.PORT || 5433;

app.use("./boards", boardRoutes);
app.use("./cards", cardRoutes);
app.use("./comments", commentRoutes);
