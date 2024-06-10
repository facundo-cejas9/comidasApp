import mongoose from "mongoose";

export const connectDb = async () => {
    try {
        await mongoose.connect('mongodb+srv://alojen:aloja123@cluster0.eaizysy.mongodb.net/?', {       });
        console.log("DB connected");
    } catch (error) {
        console.error("Error connecting to database:", error);
    }
}