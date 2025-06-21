const express = require("express");
const cors = require("cors");
const server = express();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const port = process.env.PORT || 4000;
const boardRoutes = require("./routes/boardRoutes");
const cardRoutes = require("./routes/cardRoutes");
const commentRoutes = require("./routes/commentRoutes");
server.use(express.json());
server.use(cors());

server.get("/", (req, res) => {
  res.send("Backend server is running");
});

server.use("/boards", boardRoutes);
server.use("/cards", cardRoutes);
server.use("/comments", commentRoutes);
//import Welcome from "../frontend/src/assets/Welcome.jpg";

async function welcomeBoard() {
  const welcome = await prisma.board.findFirst({
    where: { title: "Welcome" },
  });

  if (!welcome) {
    await prisma.board.create({
      data: {
        title: "Welcome",
        description: "Create your first Kudos Board!",
        category: "Celebration",
        owner: "Kudor",
        image:
          "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.com%2Ffree-photos-vectors%2Fwelcome-store&psig=AOvVaw1lcmDBgGzvO8JJ77e7msT3&ust=1750525158850000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCPCL9MO8gI4DFQAAAAAdAAAAABAE",
      },
    });
  }
}

server.listen(port, () => {
  console.log("This works");
  welcomeBoard().catch((error) => console.error("Error: ", error));
});
