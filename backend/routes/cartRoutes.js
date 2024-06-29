import express from 'express';

import { addToCart, removeFromCart, getCartData, deleteAllcartItems } from '../controllers/cartController.js';
import authMiddleware from '../middlewares/auth.js';

const cartRouter = express.Router();

cartRouter.post('/add', authMiddleware, addToCart);

cartRouter.post('/remove', authMiddleware, removeFromCart);
cartRouter.post('/remove/all', authMiddleware, deleteAllcartItems);

cartRouter.post('/get',authMiddleware, getCartData);


export default cartRouter;

