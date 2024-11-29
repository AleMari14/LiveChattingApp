const mongoose = require("mongoose"); 
// Importa il modulo Mongoose per interagire con MongoDB.

const messageSchema = new mongoose.Schema(
  {
    chatId: String, 
    // `chatId` è una stringa che rappresenta l'ID della chat a cui appartiene il messaggio.
    // Di solito si tratta di un `ObjectId` della chat nel database.

    senderId: String, 
    // `senderId` è una stringa che rappresenta l'ID dell'utente che ha inviato il messaggio.
    // Anche in questo caso, di solito si tratta di un `ObjectId` dell'utente.

    text: String, 
    // `text` contiene il contenuto testuale del messaggio.
  },
  {
    timestamps: true, 
    // Aggiunge automaticamente i campi `createdAt` e `updatedAt`.
    // `createdAt` registra la data e l'ora in cui il messaggio è stato creato.
    // `updatedAt` si aggiorna automaticamente quando il documento viene modificato.
  }
);

const Message = mongoose.model("Message", messageSchema); 
// Crea un modello Mongoose chiamato "Message" basato sullo schema `messageSchema`.
// Questo modello sarà utilizzato per interagire con la raccolta **Messages** nel database.

module.exports = Message; 
// Esporta il modello in modo che possa essere utilizzato in altre parti dell'applicazione.
