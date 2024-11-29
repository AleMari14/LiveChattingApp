const messageModel = require("../Models/messageModel");
// Importa il modello `messageModel` per interagire con il database per la gestione dei messaggi.

const createMessage = async (req, res) => {
  const { chatId, senderId, text } = req.body; 
  // Estrae `chatId`, `senderId` e `text` dal corpo della richiesta HTTP.

  const message = new messageModel({
    chatId,
    senderId,
    text,
    // Crea un nuovo messaggio associandolo alla chat, all'utente mittente e al testo.
  });

  try {
    const response = await message.save(); 
    // Salva il messaggio nel database e memorizza il risultato.

    res.status(200).json(response); 
    // Restituisce il messaggio salvato con codice 200.
  } catch (error) {
    res.status(500).json(error); 
    // Gestisce eventuali errori restituendo un codice 500 e il dettaglio dell'errore.
  }
};

const getMessages = async (req, res) => {
  const { chatId } = req.params; 
  // Estrae `chatId` dai parametri della richiesta.

  try {
    const messages = await messageModel.find({ chatId }); 
    // Cerca tutti i messaggi associati alla chat con l'ID fornito.

    res.status(200).json(messages); 
    // Restituisce i messaggi trovati con codice 200.
  } catch (error) {
    res.status(500).json(error); 
    // Gestisce eventuali errori restituendo un codice 500 e il dettaglio dell'errore.
  }
};

module.exports = { createMessage, getMessages }; 
// Esporta le funzioni per poterle utilizzare in altre parti dell'applicazione.
