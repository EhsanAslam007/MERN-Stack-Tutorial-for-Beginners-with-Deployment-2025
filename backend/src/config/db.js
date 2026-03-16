import mongoose from "mongoose"
export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Mongoose Connected Successfully!");
    } catch (error) {
        console.error("Error Connecting To Mongodb", error)
        process.exit(1);
    };

}