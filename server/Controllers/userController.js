const bcrypt = require("bcrypt"); 
// Per la crittografia delle password
const jwt = require("jsonwebtoken"); 
// Per la creazione e verifica dei token JWT
const validator = require("validator"); 
// Per la convalida di email e password
const userModel = require("../Models/userModel"); 
// Modello per interagire con il database degli utenti

const createToken = (_id) => {
  const jwtSecretKey = process.env.JWT_SECRET_KEY; 
  // Chiave segreta per il token JWT
  return jwt.sign({ _id }, jwtSecretKey, { expiresIn: "3d" }); 
  // Crea un token JWT valido per 3 giorni
};

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Controlla se l'utente esiste già
    let user = await userModel.findOne({ email });
    if (user) return res.status(400).json("User already exists...");

    // Verifica i dati obbligatori
    if (!name || !email || !password)
      return res.status(400).json("All fields are required...");
    if (!validator.isEmail(email))
      return res.status(400).json("Email must be a valid email...");
    if (!validator.isStrongPassword(password))
      return res.status(400).json("Password must be a strong password...");

    // Crittografia della password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Crea un nuovo utente
    user = new userModel({ name, email, password: hashedPassword });
    await user.save();

    // Crea un token JWT
    const token = createToken(user._id);

    res.status(200).json({ _id: user._id, name, email, token });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Trova l'utente per email
    const user = await userModel.findOne({ email });
    if (!user) return res.status(400).json("Invalid email or password...");

    // Verifica la password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(400).json("Invalid email or password...");

    // Crea un token JWT
    const token = createToken(user._id);

    res.status(200).json({ _id: user._id, name: user.name, email, token });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const findUser = async (req, res) => {
  const userId = req.params.userId;

  try {
    // Trova un utente per ID
    const user = await userModel.findById(userId);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getUsers = async (req, res) => {
  try {
    // Recupera tutti gli utenti
    const users = await userModel.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { registerUser, loginUser, findUser, getUsers }; 
// Esporta le funzioni per l'utilizzo in altre parti del progetto
