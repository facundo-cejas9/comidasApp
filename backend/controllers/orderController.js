import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import { Stripe } from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const placeOrder = async (req, res) => {
    const frontend_url = 'http://localhost:5173';

    try {
        
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
            status: 'Procesando',
            date: new Date(),
            payment: false,
            haveDiscount: req.body.haveDiscount
        });

        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });


        const line_items = [
            {
                price_data: {
                    currency: 'ARS',
                    product_data: {
                        name: 'Monto Total a pagar'
                    },
                    unit_amount: Math.round(req.body.amount * 100) // Convertir el monto total a centavos
                },
                quantity: 1
            }
        ];
              

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: line_items,
            mode: 'payment',
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        });

        res.json({
            success: true,
            sesion_url: session.url
        });

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message
        });
    }
}

const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body;

    try {
        if (success === "true") {
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            res.json({ success: true, message: 'Orden confirmada' });
        } else {
            await orderModel.findByIdAndDelete(orderId);
            res.json({
                success: false,
                message: 'Orden rechazada'
            });
        }
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message
        });
    }
}

const userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.body.userId });
        console.log(orders);
        res.json({ success: true, data: orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

const listOrders = async (req, res) => {
    try {
        const listOrder = await orderModel.find({});
        res.json({ success: true, data: listOrder });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

const updateOrderStatus = async (req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
        res.json({ success: true, message: 'Orden actualizada' });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export {
    placeOrder,
    verifyOrder,
    userOrders,
    listOrders,
    updateOrderStatus
};
