const express = require("express"); 
// Importa il modulo Express per creare il router.

const {
  createChat,
  userChats,
  findChat,
} = require("../Controllers/chatController"); 
// Importa le funzioni del controller della chat dal file `chatController`.
// Queste funzioni implementano la logica per gestire le richieste relative alle chat.

const router = express.Router(); 
// Crea un'istanza di router di Express per definire le rotte specifiche della chat.

router.post("/", createChat); 
// Rotta POST per creare una nuova chat.
// Path: `/`
// La funzione `createChat` gestisce la logica per creare una chat tra due utenti.

router.get("/:userId", userChats); 
// Rotta GET per ottenere tutte le chat di un determinato utente.
// Path: `/:userId`
// La funzione `userChats` recupera tutte le chat in cui l'utente con l'ID specificato è un membro.

router.get("/find/:firstId/:secondId", findChat); 
// Rotta GET per trovare una chat specifica tra due utenti.
// Path: `/find/:firstId/:secondId`
// La funzione `findChat` cerca una chat in base agli ID dei due utenti forniti nei parametri.

module.exports = router; 
// Esporta il router in modo che possa essere utilizzato nell'app principale (ad esempio, in `app.js`).
