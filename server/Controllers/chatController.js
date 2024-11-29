const chatModel = require("../Models/chatModel"); 
// Importa il modello `chatModel` per interagire con il database (MongoDB) per la gestione delle chat.

const createChat = async (req, res) => {
  const { senderId, receiverId } = req.body; 
  // Estrae `senderId` e `receiverId` dal corpo della richiesta HTTP.

  try {
    // Verifica se una chat tra i due utenti già esiste.
    const chat = await chatModel.findOne({
      members: { $all: [senderId, receiverId] }, 
      // `$all` verifica che entrambi gli ID siano presenti nell'array `members`.
    });

    if (chat) return res.status(200).json(chat); 
    // Se la chat esiste già, restituisce la chat trovata con codice 200.

    // Se non esiste, crea una nuova chat con i due utenti come membri.
    const newChat = new chatModel({
      members: [senderId, receiverId], 
    });

    const response = await newChat.save(); 
    // Salva la nuova chat nel database e memorizza il risultato.

    res.status(200).json(response); 
    // Restituisce la nuova chat creata con codice 200.
  } catch (error) {
    res.status(500).json(error); 
    // Gestisce eventuali errori restituendo un codice 500 e il dettaglio dell'errore.
  }
};

const userChats = async (req, res) => {
  const userId = req.params.userId; 
  // Estrae l'ID utente dai parametri della richiesta.

  try {
    const chats = await chatModel.find({
      members: { $in: [userId] }, 
      // `$in` verifica se l'ID utente è incluso nell'array `members`.
    });

    res.status(200).json(chats); 
    // Restituisce tutte le chat che includono l'utente con codice 200.
  } catch (error) {
    res.status(500).json(error); 
    // Gestisce eventuali errori restituendo un codice 500 e il dettaglio dell'errore.
  }
};

const findChat = async (req, res) => {
  const firstId = req.params.firstId;
  const secondId = req.params.secondId; 
  // Estrae i due ID dai parametri della richiesta.

  try {
    const chat = await chatModel.findOne({
      members: { $all: [firstId, secondId] }, 
      // Cerca una chat che contenga entrambi gli ID nei membri.
    });

    res.status(200).json(chat); 
    // Restituisce la chat trovata con codice 200.
  } catch (error) {
    res.status(500).json(error); 
    // Gestisce eventuali errori restituendo un codice 500 e il dettaglio dell'errore.
  }
};

module.exports = { createChat, userChats, findChat }; 
// Esporta le funzioni per poterle utilizzare in altre parti dell'applicazione.
