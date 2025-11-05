import express from 'express';
import { register, login, getProfile } from '../controllers/authController.js';
import { isAuthenticated } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', isAuthenticated, getProfile);

export default router;

