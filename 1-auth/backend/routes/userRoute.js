import express from 'express';
import {
  signup,
  login,
  getProfile,
  logout,
} from '../controllers/userController.js';
import { veryfyToken } from '../middlewares/authMiddleware.js';
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/profile', veryfyToken, getProfile);
router.post('/logout', veryfyToken, logout);

export default router;
