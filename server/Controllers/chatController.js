const chatModel = require("../Models/chatModel"); 
// Modello per interagire con il database delle chat (MongoDB)

const createChat = async (req, res) => {
  const { senderId, receiverId } = req.body;

  try {
    // Controlla se esiste già una chat tra i due utenti
    const chat = await chatModel.findOne({
      members: { $all: [senderId, receiverId] },
    });

    if (chat) return res.status(200).json(chat); // Restituisce la chat esistente

    // Crea una nuova chat se non esiste
    const newChat = new chatModel({
      members: [senderId, receiverId],
    });

    const response = await newChat.save();
    res.status(200).json(response); // Restituisce la chat creata
  } catch (error) {
    res.status(500).json(error); // Restituisce un errore in caso di problemi
  }
};

const userChats = async (req, res) => {
  const userId = req.params.userId;

  try {
    // Trova tutte le chat che includono l'utente
    const chats = await chatModel.find({
      members: { $in: [userId] },
    });

    res.status(200).json(chats); // Restituisce le chat trovate
  } catch (error) {
    res.status(500).json(error); // Gestisce errori
  }
};

const findChat = async (req, res) => {
  const { firstId, secondId } = req.params;

  try {
    // Cerca una chat specifica tra due utenti
    const chat = await chatModel.findOne({
      members: { $all: [firstId, secondId] },
    });

    res.status(200).json(chat); // Restituisce la chat trovata
  } catch (error) {
    res.status(500).json(error); // Gestisce errori
  }
};

module.exports = { createChat, userChats, findChat }; 
// Esporta le funzioni per l'utilizzo in altre parti del progetto
