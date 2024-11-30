const messageModel = require("../Models/messageModel"); 
// Modello per interagire con il database dei messaggi

const createMessage = async (req, res) => {
  const { chatId, senderId, text } = req.body;

  // Crea un nuovo messaggio associato alla chat e all'utente mittente
  const message = new messageModel({
    chatId,
    senderId,
    text,
  });

  try {
    const response = await message.save();
    res.status(200).json(response); // Restituisce il messaggio salvato
  } catch (error) {
    res.status(500).json(error); // Gestisce errori
  }
};

const getMessages = async (req, res) => {
  const { chatId } = req.params;

  try {
    // Trova tutti i messaggi associati a una specifica chat
    const messages = await messageModel.find({ chatId });
    res.status(200).json(messages); // Restituisce i messaggi trovati
  } catch (error) {
    res.status(500).json(error); // Gestisce errori
  }
};

module.exports = { createMessage, getMessages }; 
// Esporta le funzioni per l'utilizzo in altre parti del progetto
