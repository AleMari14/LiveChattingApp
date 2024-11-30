const express = require("express"); 
// Importa Express per gestire le rotte.

const {
  registerUser,
  loginUser,
  findUser,
  getUsers,
} = require("../Controllers/userController"); 
// Importa le funzioni del controller per la gestione degli utenti.

const router = express.Router(); 
// Istanza del router di Express per definire le rotte degli utenti.

router.post("/register", registerUser); 
// Registra un nuovo utente: metodo POST, path `/register`.

router.post("/login", loginUser); 
// Autentica un utente: metodo POST, path `/login`.

router.get("/find/:userId", findUser); 
// Trova un utente specifico: metodo GET, path `/find/:userId`.

router.get("/", getUsers); 
// Recupera tutti gli utenti: metodo GET, path `/`.

module.exports = router; 
// Esporta il router per l'utilizzo nell'app principale.
