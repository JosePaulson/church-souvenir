import express from 'express';
import { authUser, logoutUser, registerUser } from '../controllers/authController.js';
import { admin, protect } from '../middlewares/authMiddleware.js';

const router = express.Router()

router.post('/login', authUser)
router.post('/register', admin, registerUser)
router.post('/logout', protect, logoutUser)

export default router