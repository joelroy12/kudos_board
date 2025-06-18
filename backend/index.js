const express = require("express");
const app = express();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient()
const PORT = 3000;
const boardRoutes = require('./routes/boardRoutes')
const cardRoutes = require('./routes/cardRoutes')
const commentRoutes = require('./routes/commentRoutes');

app.use('./boards', boardRoutes)
app.use('./cards', cardRoutes)
app.use('./comments', commentRoutes)

