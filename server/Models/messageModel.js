const mongoose = require("mongoose"); 
// Per interagire con MongoDB

const messageSchema = new mongoose.Schema(
  {
    chatId: String, // ID della chat a cui appartiene il messaggio
    senderId: String, // ID dell'utente che ha inviato il messaggio
    text: String, // Contenuto del messaggio
  },
  {
    timestamps: true, // Campi automatici `createdAt` e `updatedAt`
  }
);

const Message = mongoose.model("Message", messageSchema); 
// Modello Mongoose per gestire i messaggi

module.exports = Message; 
// Esporta il modello per l'utilizzo nel progetto
