const express = require("express"); 
// Per creare e gestire le rotte con Express

const {
  createMessage,
  getMessages,
} = require("../Controllers/messageController"); 
// Importa le funzioni del controller per la gestione dei messaggi

const router = express.Router(); 
// Istanza del router di Express per le rotte dei messaggi

router.post("/", createMessage); 
// Aggiunge un nuovo messaggio a una chat: metodo POST, path `/`

router.get("/:chatId", getMessages); 
// Recupera tutti i messaggi di una chat specifica: metodo GET, path `/:chatId`

module.exports = router; 
// Esporta il router per l'utilizzo nell'applicazione
