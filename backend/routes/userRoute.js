import express from 'express';
import authMiddleware from '../middlewares/auth.js';
import { dataUser, forgotPassword, loginUser, registerUser, resetPassword, resetPasswordConfirm, userEmail } from '../controllers/userController.js';

const userRouter = express.Router()

userRouter.post('/login', loginUser)
userRouter.post('/register', registerUser)
userRouter.get('/me', authMiddleware, dataUser)
userRouter.get('/me/email', userEmail)
userRouter.post('/login/forgotpassword', forgotPassword)
userRouter.get('/login/recoverypassword/:id/:token', resetPassword)
userRouter.post('/login/recoverypassword/:id/:token', resetPasswordConfirm)


export default userRouter;