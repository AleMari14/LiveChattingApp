const express = require("express"); 
// Per creare e gestire le rotte con Express

const {
  createChat,
  userChats,
  findChat,
} = require("../Controllers/chatController"); 
// Importa le funzioni dal controller per la gestione delle chat

const router = express.Router(); 
// Istanza del router di Express per le rotte delle chat

router.post("/", createChat); 
// Crea una nuova chat: metodo POST, path `/`

router.get("/:userId", userChats); 
// Recupera tutte le chat di un utente specifico: metodo GET, path `/:userId`

router.get("/find/:firstId/:secondId", findChat); 
// Cerca una chat tra due utenti specifici: metodo GET, path `/find/:firstId/:secondId`

module.exports = router; 
// Esporta il router per l'utilizzo nell'applicazione
