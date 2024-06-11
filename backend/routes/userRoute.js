import express from 'express';
import authMiddleware from '../middlewares/auth.js';
import { dataUser, loginUser, registerUser } from '../controllers/userController.js';

const userRouter = express.Router()

userRouter.post('/login', loginUser)
userRouter.post('/register', registerUser)
userRouter.get('/me', authMiddleware, dataUser)


export default userRouter;