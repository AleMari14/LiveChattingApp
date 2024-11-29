const bcrypt = require("bcrypt"); 
// Importa bcrypt per gestire la crittografia delle password.
const jwt = require("jsonwebtoken"); 
// Importa jsonwebtoken per creare e verificare token JWT.
const validator = require("validator"); 
// Importa validator per convalidare email e password.
const userModel = require("../Models/userModel"); 
// Importa il modello `userModel` per interagire con il database per la gestione degli utenti.

const createToken = (_id) => {
  const jwtSecretKey = process.env.JWT_SECRET_KEY; 
  // Recupera la chiave segreta per il token JWT dalle variabili d'ambiente.

  return jwt.sign({ _id }, jwtSecretKey, { expiresIn: "3d" }); 
  // Crea un token JWT che include l'ID dell'utente e scade in 3 giorni.
};

const registerUser = async (req, res) => {
  const { name, email, password } = req.body; 
  // Estrae `name`, `email` e `password` dal corpo della richiesta HTTP.

  try {
    let user = await userModel.findOne({ email }); 
    // Verifica se un utente con la stessa email esiste già nel database.
    if (user) return res.status(400).json("User already exists..."); 
    // Restituisce errore se l'utente esiste già.

    user = new userModel({ name, email, password }); 
    // Crea un nuovo oggetto utente.

    if (!name || !email || !password)
      return res.status(400).json("All fields are required..."); 
    // Verifica che tutti i campi siano compilati.

    if (!validator.isEmail(email))
      return res.status(400).json("Email must be a valid email..."); 
    // Verifica che l'email sia valida.

    if (!validator.isStrongPassword(password))
      return res.status(400).json("Password must be a strong password.."); 
    // Verifica che la password sia sufficientemente forte.

    const salt = await bcrypt.genSalt(10); 
    // Genera un salt per la crittografia della password.
    user.password = await bcrypt.hash(user.password, salt); 
    // Cripta la password con il salt.

    await user.save(); 
    // Salva il nuovo utente nel database.

    const token = createToken(user._id); 
    // Crea un token JWT per il nuovo utente.

    res.status(200).json({ _id: user._id, name, email, token }); 
    // Restituisce l'ID dell'utente, il nome, l'email e il token.
  } catch (error) {
    console.log(error);
    res.status(500).json(error); 
    // Gestisce eventuali errori restituendo un codice 500 e il dettaglio dell'errore.
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body; 
  // Estrae `email` e `password` dal corpo della richiesta HTTP.

  try {
    let user = await userModel.findOne({ email }); 
    // Cerca un utente con l'email fornita nel database.

    if (!user) return res.status(400).json("Invalid email or password..."); 
    // Restituisce errore se l'utente non esiste.

    const validPassword = await bcrypt.compare(password, user.password); 
    // Confronta la password fornita con quella crittografata nel database.
    if (!validPassword)
      return res.status(400).json("Invalid email or password..."); 
    // Restituisce errore se la password non è corretta.

    const token = createToken(user._id); 
    // Crea un token JWT per l'utente autenticato.

    res.status(200).json({ _id: user._id, name: user.name, email, token }); 
    // Restituisce l'ID dell'utente, il nome, l'email e il token.
  } catch (error) {
    console.log(error);
    res.status(500).json(error); 
    // Gestisce eventuali errori restituendo un codice 500 e il dettaglio dell'errore.
  }
};

const findUser = async (req, res) => {
  const userId = req.params.userId; 
  // Estrae `userId` dai parametri della richiesta.

  try {
    const user = await userModel.findById(userId); 
    // Cerca l'utente corrispondente all'ID fornito.

    res.status(200).json(user); 
    // Restituisce i dettagli dell'utente trovato.
  } catch (error) {
    res.status(500).json(error); 
    // Gestisce eventuali errori restituendo un codice 500 e il dettaglio dell'errore.
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await userModel.find(); 
    // Recupera tutti gli utenti dal database.

    res.status(200).json(users); 
    // Restituisce un array di utenti.
  } catch (error) {
    res.status(500).json(error); 
    // Gestisce eventuali errori restituendo un codice 500 e il dettaglio dell'errore.
  }
};

module.exports = { registerUser, loginUser, findUser, getUsers }; 
// Esporta le funzioni per poterle utilizzare in altre parti dell'applicazione.
