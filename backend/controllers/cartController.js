import userModel from '../models/userModel.js'


//Add items to user cart

const addToCart = async(req, res) => {
    try {
        let userData = await userModel.findById({_id: req.body.userId})
        let cartData = await userData.cartData

        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1
        } else {
            cartData[req.body.itemId] += 1
        }

        await userModel.findByIdAndUpdate(req.body.userId, {cartData})
        res.json({success: true, message: 'Item agregado al carrito'})


    } catch (error) {
        console.log(error)
        res.status(400).json({message: error.message})
        
    }
}

//Remove items from user cart

const removeFromCart = async(req, res) => {
    try {
        let userData = await userModel.findById({_id: req.body.userId})
        let cartData = await userData.cartData
        if (cartData[req.body.itemId] > 0) {
            cartData[req.body.itemId] -= 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId, {cartData})
        res.json({success: true, message: 'Item eliminado del carrito'})


    } catch (error) {
        console.log(error)
        res.json({success: false, message: 'error'})
    }
}

//Fetch user cart data

const getCartData = async(req,res) => {
    try {
        let userdata = await userModel.findById(req.body.userId)
        let cartData = await userdata.cartData;
        res.json({success: true, cartData: cartData})
    } catch (error) {
        res.json({success: false, message: 'error'})
    }
}


export { addToCart, removeFromCart, getCartData}
