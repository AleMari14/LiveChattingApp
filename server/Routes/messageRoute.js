const express = require("express"); 
// Importa il modulo Express per creare il router.

const {
  createMessage,
  getMessages,
} = require("../Controllers/messageController"); 
// Importa le funzioni del controller dei messaggi dal file `messageController`.
// Queste funzioni implementano la logica per gestire le richieste relative ai messaggi.

const router = express.Router(); 
// Crea un'istanza di router di Express per definire le rotte specifiche dei messaggi.

router.post("/", createMessage); 
// Rotta POST per creare un nuovo messaggio.
// Path: `/`
// La funzione `createMessage` gestisce la logica per aggiungere un nuovo messaggio a una chat esistente.
// Richiede un corpo della richiesta (`req.body`) che includa `chatId`, `senderId` e il testo del messaggio.

router.get("/:chatId", getMessages); 
// Rotta GET per ottenere tutti i messaggi di una specifica chat.
// Path: `/:chatId`
// La funzione `getMessages` recupera tutti i messaggi associati a una chat identificata da `chatId`.

module.exports = router; 
// Esporta il router in modo che possa essere utilizzato nell'app principale (ad esempio, in `app.js`).
