import express from 'express';
import authMiddleware from '../middlewares/auth.js';
import { dataUser, deleteUser, forgotPassword, getAllUsers, loginUser, registerUser, resetPassword, resetPasswordConfirm, userEmail } from '../controllers/userController.js';

const userRouter = express.Router()

userRouter.post('/login', loginUser)
userRouter.post('/register', registerUser)
userRouter.get('/me', authMiddleware, dataUser)
userRouter.get('/me/email', userEmail)
userRouter.post('/login/forgotpassword', forgotPassword)
userRouter.get('/login/recoverypassword/:id/:token', resetPassword)
userRouter.post('/login/recoverypassword/:id/:token', resetPasswordConfirm)
userRouter.get('/users', getAllUsers)
userRouter.post('/users/delete', deleteUser)


export default userRouter;