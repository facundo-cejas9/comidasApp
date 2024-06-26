import foodModel from "../models/foodModel.js";

import fs from 'fs';

//Add food item

const addFood = async(req, res) => {
    let image_filename = `${req.file.filename}`

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename,
        stars: req.body.stars
    })

    try {
         await food.save();
        res.json({success: true, message:'Comidita agregada'})
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}


//All list food
const listFood = async(req,res) => {
    try {
        const foods = await foodModel.find({})
        res.json({success: true, data: foods})
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

//filtered food by name

const filterFood = async(req,res) => {
    try {
        const regex = new RegExp(req.body.name, 'i')
        const foods = await foodModel.find({name: {$regex: regex}})
        res.json({success: true, data: foods})
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

//Delete food

const deleteFood = async(req,res) => {
    try {
        const food = await foodModel.findById(req.body.id)
        fs.unlink(`uploads/${food.image}`, () => {})
        await foodModel.findByIdAndDelete(req.body.id)
        res.json({success: true, message: 'Comida eliminada'})
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export { addFood, listFood, deleteFood, filterFood };