import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

console.log("CURRENT WORKING DIR:", process.cwd());
console.log("MONGO_URI from env:", process.env.MONGO_URI);


const app = express ();

app.use(cors());
app.use(express.json());

app.get("/",(req,res) => {
    res.send("Welcome to CodeQuest API 🚀");
});

app.use("/api/auth", authRoutes)

mongoose
    .connect(process.env.MONGO_URI)
    .then(()=>console.log("MONGODB connected✈️"))
    .catch((error)=>console.log(error));
const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=> {
    console.log(`server running on port ${PORT}`);
});
