import express from 'express';
import { login, logout, signup, getTrains } from '../controllers/user.controller.js';
const router = express.Router();

router.post('/signup', signup)
router.post('/login', login)
router.post('/availability', getTrains)
router.post('/logout', logout)

export default router;