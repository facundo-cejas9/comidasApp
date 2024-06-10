import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'



//Creamos el token
const createToken = (id) => {
    return jwt.sign({ id}, process.env.JWT_SECRET)
}


//loginuser
const loginUser = async(req, res) => {
    const {email, password} = req.body
    try {
        const user = await userModel.findOne({email})

        if (!user) {
            return res.json({success: false, message: 'El usuario no se encuentra registrado'})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch) {
            return res.json({success: false, message: 'Credenciales inválidas'})
        }

        const token = createToken(user._id)

        res.json({success: true, token})



    } catch (error) {
        res.json({success: false, message: error.message})
    }

}


//registeruser
const registerUser = async(req, res) => {
    const { name, email, password } = req.body;
    
    try {
        const exists = await userModel.findOne({ email });
    //Validamos si el usuario existe
    if (exists) {
        return res.json({success: false, message: 'El usuario ya se encuentra registrado'})
    }
    //Validamos si el email es valido
    if (!validator.isEmail(email)) {
        return res.json({success: false, message: 'El email no es valido'})
    }
    //Validamos si la contraseña es valida
    if (!validator.isLength(password, { min: 6 })) {
        return res.json({success: false, message: 'La contraseña debe tener al menos 6 caracteres'})
    }
    //Encriptamos la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    //Creamos el usuario
    const newUser = new userModel({
        name,
        email,
        password:  hashedPassword
    })
    //Guardamos el usuario
    const user = await newUser.save();
    const token = createToken(user._id)
    res.json({success: true, token})
    } catch (error) {
        console.log(error);
        res.json({success: false, error: error})
    }


}

export { loginUser, registerUser }