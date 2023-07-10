import express from 'express';
import { login, apiKeyMiddleware, addTrain } from '../controllers/admin.controller.js';
const router = express.Router();

router.post('/login', login);
// TODO: router.use(apiKeyMiddleware);
router.post('/create', addTrain);


export default router;