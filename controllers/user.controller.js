import { db } from '../db.js';
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {

    try {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);
  
      const insertQuery = "INSERT INTO users(`username`,`password`) VALUES (?)";
      const values = [req.body.username, hash];
  
      await db.query(insertQuery, [values]);
      res.status(200).json({ message: "User has been created"});
  
    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        res.status(409).json("User already exists");
      } else {
        res.status(500).json(err);
      }
    }
}
  

export const login = async (req, res) => {
    try {
      const q = "SELECT * FROM users WHERE username = ?";

      const data = await new Promise((resolve, reject) => {
        db.query(q, [req.body.username], (err, data) => {
          if (err) reject(err);
          else resolve(data);
        });
      });
  
      if (data.length === 0) return res.status(404).json("User not found!");
  
      // Check password
      const isPasswordCorrect = bcrypt.compareSync(
        req.body.password,
        data[0].password
      );
  
      if (!isPasswordCorrect)
        return res.status(400).json("Wrong username or password!");
  
      const token = jwt.sign({ id: data[0].id }, "jwtkey");
      const { password, ...other } = data[0];
  
      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json(other);
    } catch (err) {
      res.status(500).json(err);
    }
};

export const getTrains = async (req, res) => {
    try {
      const {source, destination} = req.body
      const query = 'SELECT train_id, train_name, capacity FROM trains WHERE source = ? AND destination = ?';
      const values = [source, destination];
      const [rows] = await db.query(query, values);
      return res.status(200).json({message: "Trains fetched successfully!", body: rows});
    } catch (error) {
      console.error('Error fetching trains:', error);
    }
};

export const logout = (req, res) => {
    try {
      res.clearCookie("access_token", {
        sameSite: "none",
        secure: true
      }).status(200).json("User has been logged out.");
    } catch (err) {
      res.status(500).json(err);
    }
};
  