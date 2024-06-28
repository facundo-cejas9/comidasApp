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

const filterFood = async (req, res) => {
    try {
        const searchTerm = req.query.query;

        // Verifica si se proporciona un término de búsqueda
        if (!searchTerm) {
            return res.status(400).json({ success: false, message: "Debe proporcionar un término de búsqueda" });
        }

        // Construye la consulta para buscar en el nombre o categoría
        const query = {
            $or: [
                { name: { $regex: searchTerm, $options: 'i' } }, 
                { category: { $regex: searchTerm, $options: 'i' } } 
            ]
        };

        // Realiza la consulta en la base de datos
        const foods = await foodModel.find(query);

        if (foods.length === 0) {
            return res.status(404).json({ success: true, message: "No se encontraron alimentos" });
        }

        res.json({ success: true, data: foods });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

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