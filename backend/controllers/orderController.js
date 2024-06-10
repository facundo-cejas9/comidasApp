import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import { Stripe } from 'stripe'


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

//Mostrar orden en el frontend

const placeOrder = async(req, res) => {

    const fronten_url = 'http://localhost:5173'
    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        })
        await newOrder.save()
        await userModel.findByIdAndUpdate(req.body.userId, {cartData: {}})

        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: 'ARS',
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100
            }, 
            quantity: item.quantity
        }))

        line_items.push({
            price_data: {
                currency: 'ARS',
                product_data: {
                    name: 'Envio'
                },
                unit_amount: 1000 * 100
            }, 
            quantity: 1

        })

        const sesion = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: 'payment',
            success_url: `${fronten_url}/verify?success=true&orderId${newOrder._id}`,
            cancel_url: `${fronten_url}/verify?success=false&orderId${newOrder._id}`,
        })

        res.json({
            success: true,
            sesion_url: sesion.url
        })

    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: error.message
        })
    }
}

const verifyOrder = async(req,res) => {
    const {orderId, success} = req.body

    try {
        if (success === "true") {
            await orderModel.findByIdAndUpdateOrder(orderId, {payment: true})
            res.json({
                success: true,
                message: 'Orden confirmada'
            })
        } else {
            await orderModel.findByIdAndDelete(orderId)
            res.json({
                success: false,
                message: 'Orden rechazada'
            })
        }
    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: error.message
        })
    }
}


export { placeOrder, verifyOrder}