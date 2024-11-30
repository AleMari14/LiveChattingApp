const cors = require("cors");
const mongoose = require("mongoose");
const express = require("express");
const { Server } = require("socket.io");
const chatRoute = require("./Routes/chatRoute");
const messageRoute = require("./Routes/messageRoute");
const userRoute = require("./Routes/userRoute");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

// Definisce le rotte API
app.use("/api/users", userRoute);
app.use("/api/chats", chatRoute);
app.use("/api/messages", messageRoute);

app.get("/", (req, res) => {
  res.send("Benvenuto nella nostra API di chat...");
});

const uri = process.env.ATLAS_URI;
const port = process.env.PORT || 5000;

const expressServer = app.listen(port, () => {
  console.log(`Server in esecuzione sulla porta: ${port}...`);
});

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connessione a MongoDB stabilita..."))
  .catch((error) => console.error("Connessione a MongoDB fallita:", error.message));

const io = new Server(expressServer, {
  cors: {
    origin: process.env.CLIENT_URL,
  },
});

let onlineUsers = [];

io.on("connection", (socket) => {
  // Gestisce la connessione di un nuovo utente
  socket.on("addNewUser", (userId) => {
    if (!onlineUsers.some((user) => user.userId === userId)) {
      onlineUsers.push({ userId, socketId: socket.id });
    }
    io.emit("getUsers", onlineUsers);
  });

  // Gestisce l'invio dei messaggi
  socket.on("sendMessage", (message) => {
    const user = onlineUsers.find((user) => user.userId === message.recipientId);
    if (user) {
      io.to(user.socketId).emit("getMessage", message);
      io.to(user.socketId).emit("getNotification", {
        senderId: message.senderId,
        isRead: false,
        date: new Date(),
      });
    }
  });

  // Gestisce la disconnessione dell'utente
  socket.on("disconnect", () => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
    io.emit("getUsers", onlineUsers);
  });
});
