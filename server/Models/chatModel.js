const mongoose = require("mongoose"); 
// Per interagire con MongoDB

const chatSchema = new mongoose.Schema(
  {
    members: Array, // Array che contiene gli ID degli utenti nella chat
  },
  {
    timestamps: true, // Aggiunge automaticamente i campi `createdAt` e `updatedAt`
  }
);

const chatModel = mongoose.model("Chat", chatSchema); 
// Modello Mongoose per gestire le chat

module.exports = chatModel; 
// Esporta il modello per l'utilizzo nel progetto
