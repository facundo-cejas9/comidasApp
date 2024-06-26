import mongoose, { Schema } from "mongoose";

const foodSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    
    category: {
        type: String,
        required: true
    },

    stars: {
        type: Number,
        default: 0
    }
   
})


const foodModel = mongoose.model.food || mongoose.model('food', foodSchema)
export default foodModel;