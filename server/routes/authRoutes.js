import express from 'express';
import { authUser, deleteUser, getAllEditors, logoutUser, registerUser } from '../controllers/authController.js';
import { admin, protect } from '../middlewares/authMiddleware.js';

const router = express.Router()

router.post('/login', authUser)
router.post('/register',protect, admin, registerUser)
router.post('/logout', protect, logoutUser)
router.get('/',protect, admin, getAllEditors)
router.delete('/:id',protect, admin, deleteUser)

export default router