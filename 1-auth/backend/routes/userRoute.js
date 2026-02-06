import express from 'express';
import { signup, login, getProfile } from '../controllers/userController.js';
import { veryfyToken } from '../middlewares/authMiddleware.js';
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/profile', veryfyToken, getProfile);

export default router;
