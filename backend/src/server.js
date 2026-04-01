import express from "express"
import dotenv from "dotenv"
import cors from 'cors';
import notesRoute from "./routes/notesRoute.js"
import { connectDB } from "./config/db.js"
import rateLimiter from "./config/middleware/rateLimiter.js"
import path from "path";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();
if (process.env.NODE_ENV !== "production") {
    app.use(cors({
        origin: "http://localhost:5173",
    })
    );
}

app.use(express.json());
app.use(rateLimiter);
// app.use((req,res,next)=>{
//     console.log(`Req method is ${req.method} & Req Url is ${req.url}`);
//     next();
// });
// src/server.js
app.use("/api/notes", notesRoute); // fine
if (process.env.NODE_ENV === "production") {
    // 1. Correct the static path to point to the right folder
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    // 2. Use a REGEX LITERAL (no quotes) to catch all routes
    // This bypasses the string parser that is causing your crash
    app.get(/.*/, (req, res) => {
        res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html"));
    });
}

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server Started on Port", PORT);
    });
}); 