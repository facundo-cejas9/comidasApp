import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'
import nodemailer from 'nodemailer'




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
        const name = user.name

        res.json({success: true, token, name, message: `Bienvenido de vuelta ${name}`})



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
    res.json({success: true, token, message: 'Usuario creado correctamente'})
    } catch (error) {
        console.log(error);
        res.json({success: false, error: error})
    }


}

//Forgotpassword 
const forgotPassword = async (req, res) => {
    const { email } = req.body;
  
    try {
      const existingAccount = await userModel.findOne({ email });
      if (!existingAccount) return res.json({ success: false, message: "El usuario no existe" });
  
      const secret = process.env.JWT_SECRET + existingAccount.password;
      const token = jwt.sign({ email: existingAccount.email, id: existingAccount._id }, secret);
      const link = `http://localhost:5173/recoverypassword/${existingAccount._id}/${token}`;
  
      // Selecciona el transportador basado en el dominio del email
      const transporter = email.includes('@gmail.com') ? 
        nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS,
          },
        }) : 
        nodemailer.createTransport({
          host: 'smtp.office365.com',
          port: 587,
          secure: false,
          auth: {
            user: process.env.OUTLOOK_USER,
            pass: process.env.OUTLOOK_PASS,
          },
          tls: {
            ciphers: 'SSLv3',
          },
        });
  
      let mailOptions = {
        from: '"Aplicacion de comidas🍔" <facundo962010@hotmail.com>',
        to: email,
        subject: 'Recuperación de contraseña',
        html: `
        <h3>Recuperación de contraseña</h3>
        <p>Hola ${existingAccount.name},</p>
        <p>Aquí está tu <a href="${link}">enlace de recuperación de contraseña</a>.</p>
        <p>Por favor, ignora este mensaje si no solicitaste restablecer tu contraseña.</p>
      `,
      };
  
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          res.json({ success: false, error: error });
        }
        
      });
      
  
      res.json({ success: true, message: "Enviando Email al usuario", email, token });
  
    } catch (error) {
      res.json({ success: false, error: error });
    }
  }

//Get
const resetPassword = async(req, res) => {
 const { id, token } = req.params
 

 const existingAccount = await userModel.findOne({_id: id})
 if (!existingAccount) return res.json({ success: false, message: "No se encontro el usuario"})
    const secret = process.env.JWT_SECRET + existingAccount.password

 try {
    const verify = jwt.verify(token, secret)
    if (!verify) return res.json({ success: false, message: "Token inválido"})
    res.json({ success: true, message: "verifie"})
  
   
 } catch (error) {
    res.json({ success: false, message: "Usuario no verificado" })
 }
}
//Post
const resetPasswordConfirm = async (req, res) => {
    const { id, token } = req.params;
    const { password } = req.body;
  
    try {
      // Buscar el usuario por su ID
      const existingAccount = await userModel.findOne({ _id: id });
      if (!existingAccount) {
        return res.status(404).json({ success: false, message: "No se encontró el usuario" });
      }
  
      // Construir el secreto para verificar el token
      const secret = process.env.JWT_SECRET + existingAccount.password;
  
      // Verificar el token
      const decodedToken = jwt.verify(token, secret);
      if (!decodedToken) {
        return res.status(400).json({ success: false, message: "Token inválido" });
      }
  
      // Hash de la nueva contraseña
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Actualizar la contraseña del usuario en la base de datos
      await userModel.updateOne({ _id: id }, { password: hashedPassword });
  
      res.status(200).json({ success: true, message: "Contraseña restablecida exitosamente" });
    } catch (error) {
      res.status(401).json({ success: false, message: "Error en la verificación del usuario" });
    }
  };


const dataUser = async (req,res) => {
    const userId = req.body.userId;
    try {
        const userName = await userModel.findById(userId).select('name');
        res.json({success: true, userName: userName})
    } catch (error) {
        res.status(401).json({ success: false, message: "Error"})
    }
}

const userEmail = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await userModel.findOne({email});
        if (!user) {
            return res.json({success: false, message: 'El usuario no se encuentra registrado'})
        }
        res.json({success: true, email: user.email, message: 'El email está disponible'})

    } catch (error) {

        res.json({success: false, error: error})
    }
 
}
//Obtener todos los usuarios
const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find({});
    res.json({ success: true, users });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
}

//Borrar usuario
const deleteUser = async(req,res) => {
  try {
      
      await userModel.findByIdAndDelete(req.body._id)
      res.json({success: true, message: 'Usuario Eliminado'})
  } catch (error) {
      res.status(400).json({ message: error.message });
  }
}

export { loginUser, registerUser, dataUser, forgotPassword, resetPassword, userEmail, resetPasswordConfirm, getAllUsers, deleteUser }