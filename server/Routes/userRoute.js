const express = require("express"); 
// Importa il modulo Express per creare il router.

const {
  registerUser,
  loginUser,
  findUser,
  getUsers,
} = require("../Controllers/userController"); 
// Importa le funzioni del controller degli utenti dal file `userController`.
// Queste funzioni implementano la logica per gestire le richieste relative agli utenti.

const router = express.Router(); 
// Crea un'istanza di router di Express per definire le rotte specifiche per la gestione degli utenti.

router.post("/register", registerUser); 
// Rotta POST per registrare un nuovo utente.
// Path: `/register`
// La funzione `registerUser` gestisce la logica per creare un nuovo utente.
// Richiede un corpo della richiesta (`req.body`) con i campi `name`, `email` e `password`.

router.post("/login", loginUser); 
// Rotta POST per autenticare un utente.
// Path: `/login`
// La funzione `loginUser` gestisce la logica per verificare le credenziali dell'utente.
// Richiede un corpo della richiesta con i campi `email` e `password`.

router.get("/find/:userId", findUser); 
// Rotta GET per trovare un utente specifico.
// Path: `/find/:userId`
// La funzione `findUser` cerca un utente nel database utilizzando l'ID fornito come parametro.

router.get("/", getUsers); 
// Rotta GET per ottenere tutti gli utenti.
// Path: `/`
// La funzione `getUsers` recupera l'elenco di tutti gli utenti presenti nel database.

module.exports = router; 
// Esporta il router in modo che possa essere utilizzato nell'app principale (ad esempio, in `app.js`).
