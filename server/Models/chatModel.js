const mongoose = require("mongoose"); 
// Importa il modulo Mongoose per interagire con MongoDB.

const chatSchema = new mongoose.Schema(
  {
    members: Array, 
    // Definisce un campo `members` che sarà un array.
    // Questo array contiene gli ID degli utenti che fanno parte della chat.
  },
  {
    timestamps: true, 
    // Abilita la creazione automatica dei campi `createdAt` e `updatedAt`.
    // `createdAt` registra quando è stato creato il documento.
    // `updatedAt` si aggiorna automaticamente ogni volta che il documento viene modificato.
  }
);

const chatModel = mongoose.model("Chat", chatSchema); 
// Crea un modello Mongoose chiamato "Chat" basato sullo schema `chatSchema`.
// Questo modello viene utilizzato per eseguire operazioni CRUD nel database.

module.exports = chatModel; 
// Esporta il modello in modo che possa essere utilizzato in altre parti dell'applicazione.
