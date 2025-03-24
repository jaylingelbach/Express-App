 import express from 'express';
import { 
    getMe, 
    loginUser, 
    registerUser 
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();
 

// register a user
router.post('/', registerUser)

// login a user
router.post('/login', loginUser)

// get user data
router.get('/me', protect, getMe)

 export default router;