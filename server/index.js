const cors = require("cors"); 
// Importa il modulo `cors` per gestire le politiche di Cross-Origin Resource Sharing (CORS), utile per consentire richieste da domini diversi.

const mongoose = require("mongoose"); 
// Importa il modulo `mongoose` per interagire con il database MongoDB.

const express = require("express"); 
// Importa il modulo `express` per creare il server web e gestire le rotte.

const { Server } = require("socket.io"); 
// Importa la libreria `socket.io` per implementare la comunicazione in tempo reale via WebSocket.

const chatRoute = require("./Routes/chatRoute"); 
// Importa il router per le rotte relative alle chat.

const messageRoute = require("./Routes/messageRoute"); 
// Importa il router per le rotte relative ai messaggi.

const userRoute = require("./Routes/userRoute"); 
// Importa il router per le rotte relative agli utenti.

require("dotenv").config(); 
// Carica le variabili d'ambiente dal file `.env` per configurare parametri come URL del database e porte.

const app = express(); 
// Crea un'applicazione Express.

app.use(express.json()); 
// Aggiunge il middleware che permette di parsare il corpo della richiesta in formato JSON.

app.use(cors()); 
// Aggiunge il middleware `cors` per permettere richieste provenienti da altri domini (necessario in ambienti di sviluppo e produzione).

// Definisce le rotte per gli utenti, le chat e i messaggi
app.use("/api/users", userRoute); 
app.use("/api/chats", chatRoute); 
app.use("/api/messages", messageRoute);

app.get("/", (req, res) => {
  res.send("Welcome to our chat API..."); 
  // Definisce la rotta root (`/`) che restituisce un messaggio di benvenuto all'utente.
});

const uri = process.env.ATLAS_URI; 
// Recupera l'URI del database MongoDB da una variabile d'ambiente.

const port = process.env.PORT || 5000; 
// Definisce la porta del server, cercando prima una variabile d'ambiente `PORT`, altrimenti utilizzando la porta 5000.

const expressServer = app.listen(port, () => {
  console.log(`Server running on port: ${port}...`);
}); 
// Avvia il server Express sulla porta definita, e stampa un messaggio sulla console quando il server è attivo.

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connection established..."))
  .catch((error) => console.error("MongoDB connection failed:", error.message));
// Connessione a MongoDB utilizzando Mongoose. Se la connessione ha successo, viene stampato un messaggio, altrimenti viene catturato e stampato un errore.

const io = new Server(expressServer, {
  cors: {
    origin: process.env.CLIENT_URL,
  },
}); 
// Crea un'istanza di `Socket.io` per la gestione della comunicazione WebSocket.
// Imposta la politica CORS per limitare le connessioni solo dal dominio definito nella variabile d'ambiente `CLIENT_URL`.

let onlineUsers = []; 
// Array che tiene traccia degli utenti online, con il loro `userId` e `socketId` (ID della connessione WebSocket).

io.on("connection", (socket) => { 
  // Gestisce gli eventi quando un client si connette al server via WebSocket.
  
  // add user
  socket.on("addNewUser", (userId) => { 
    // Evento che viene emesso quando un utente si connette al server. 
    // Aggiunge l'utente alla lista `onlineUsers` se non è già presente.

    // Aggiunge un nuovo utente alla lista online, se non è già presente
    !onlineUsers.some((user) => user.userId === userId) &&
      onlineUsers.push({
        userId,
        socketId: socket.id,
      });

    console.log("Connected Users:", onlineUsers);

    // Invia l'elenco degli utenti online a tutti i client connessi
    io.emit("getUsers", onlineUsers);
  });

  // add message
  socket.on("sendMessage", (message) => { 
    // Evento che viene emesso quando un client invia un messaggio.
    // Viene cercato l'utente destinatario del messaggio nella lista `onlineUsers`.

    const user = onlineUsers.find(
      (user) => user.userId === message.recipientId
    );

    if (user) {
      console.log("sending message and notification");
      // Se il destinatario è online, invia il messaggio e la notifica al destinatario
      io.to(user.socketId).emit("getMessage", message);
      io.to(user.socketId).emit("getNotification", {
        senderId: message.senderId,
        isRead: false,
        date: new Date(),
      });
    }
  });

  // disconnection
  socket.on("disconnect", () => { 
    // Evento che viene emesso quando un client si disconnette.
    // Rimuove l'utente dalla lista `onlineUsers`.

    onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
    console.log("User Disconnected:", onlineUsers);

    // Invia l'elenco aggiornato degli utenti online a tutti i client connessi
    io.emit("getUsers", onlineUsers);
  });
});
