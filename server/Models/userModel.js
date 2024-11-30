const mongoose = require("mongoose"); 
// Per interagire con MongoDB

require("dotenv").config(); 
// Carica le variabili d'ambiente dal file `.env`

const userSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: true, 
      minlength: 3, 
      maxlength: 30 
    }, // Nome utente: stringa obbligatoria, lunghezza tra 3 e 30 caratteri

    email: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 200,
      unique: true,
    }, // Email utente: stringa obbligatoria, lunghezza tra 3 e 200 caratteri, unica nel database

    password: { 
      type: String, 
      required: true, 
      minlength: 3, 
      maxlength: 1024 
    }, // Password utente: stringa obbligatoria, lunghezza tra 3 e 1024 caratteri (adatta a password criptate)
  },
  {
    timestamps: true, // Aggiunge i campi `createdAt` e `updatedAt`
  }
);

const userModel = mongoose.model("User", userSchema); 
// Modello Mongoose per gestire gli utenti

module.exports = userModel; 
// Esporta il modello per l'utilizzo nel progetto
