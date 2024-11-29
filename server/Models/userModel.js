const mongoose = require("mongoose"); 
// Importa il modulo Mongoose per interagire con MongoDB.

require("dotenv").config(); 
// Importa `dotenv` per caricare le variabili d'ambiente da un file `.env` (ad esempio, per configurazioni di connessione al database).

const userSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: true, 
      minlength: 3, 
      maxlength: 30 
    },
    // Campo `name`:
    // - Deve essere una stringa.
    // - Obbligatorio (`required: true`).
    // - Deve avere una lunghezza minima di 3 caratteri e una massima di 30 caratteri.

    email: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 200,
      unique: true,
    },
    // Campo `email`:
    // - Deve essere una stringa.
    // - Obbligatorio (`required: true`).
    // - Deve avere una lunghezza minima di 3 caratteri e una massima di 200 caratteri.
    // - Deve essere univoco nel database (`unique: true`).

    password: { 
      type: String, 
      required: true, 
      minlength: 3, 
      maxlength: 1024 
    },
    // Campo `password`:
    // - Deve essere una stringa.
    // - Obbligatorio (`required: true`).
    // - Deve avere una lunghezza minima di 3 caratteri e una massima di 1024 caratteri (adatto a password criptate).
  },
  {
    timestamps: true,
    // Aggiunge automaticamente i campi `createdAt` e `updatedAt`:
    // - `createdAt`: registra la data e l'ora in cui è stato creato l'utente.
    // - `updatedAt`: si aggiorna automaticamente quando il documento viene modificato.
  }
);

const userModel = mongoose.model("User", userSchema); 
// Crea un modello Mongoose chiamato "User" basato sullo schema `userSchema`.
//
