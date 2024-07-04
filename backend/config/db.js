import mongoose from "mongoose";

export const connectDb = async () => {
    try {
        await mongoose.connect(process.env.DB_PASS, {       });
        console.log("DB connected");
    } catch (error) {
        console.error("Error connecting to database:", error);
    }
}