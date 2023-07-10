import { db } from '../db.js';
import bcrypt from 'bcryptjs';

//Admin Login
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const q = "SELECT * FROM admin WHERE username = ?";

    const data = await new Promise((resolve, reject) => {
      db.query(q, [username], (err, data) => {
        if (err) reject(err);
        else resolve(data);
      });
    });

    if(data.length === 0) return res.status(404).json("User not found!");

    const isPasswordCorrect = bcrypt.compareSync(password, data[0].password);

    if (!isPasswordCorrect) return res.status(400).json("Wrong username or password!"); 

    // TODO: Generating API Key Middleware
    // TODO: Updating db with generated API Key

    res.json({ message: 'Login successful' });

  } catch (err) {
    res.status(500).json(err);
  }
};

// TODO Middleware to validate API key 
export const apiKeyMiddleware = (req, res, next) => {
  const apiKey = req.headers['api-key'];
  // Necessary logic to validate the API key

  if (apiKey1 && apiKey2) {
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

//Adding Train
export const addTrain = async (req,res) => {
  try {
    const {train_name, source, destination, capacity, arrival_src, arrival_dst} = req.body;
    const query = 'INSERT INTO trains(train_name, source, destination, capacity, arrival_src, arrival_dst) VALUES (?, ?, ?, ?, ?, ?)';
    const values = [train_name, source, destination, capacity, arrival_src, arrival_dst];
    const [result] = await db.query(query, values);
    res.status(200).json("Train is Added", result.insertId);

  } catch (error) {
    console.error('Error adding train:', error);
  }
};
