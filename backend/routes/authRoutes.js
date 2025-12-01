import express from "express";
import {registerUser} from "../controllers/userController.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
//login route

const router = express.Router();

router.post("/login", async (req,res)=>{
    try {
        
        const {email, password} = req.body;
        const isUserExisting = await User.findOne({email});

        if(!isUserExisting) {
            return res.status(400).json({message:"User not found"});
        }

        const checkPassword = await bcrypt.compare(password, isUserExisting.password);

        if (!checkPassword) {
            return res.status(404).json({message:"Wrong password"});
        }

        const token = jwt.sign({
            id: isUserExisting._id,
            email: isUserExisting.email
        },
            proces.env.JWT_SECRET,{expiresIn:"1h"}
        );

        res.json({
            message:"Login successful",
            token,
            User :
            {
                id: isUserExisting._id,
                email: isUserExisting.email,
            }
        });

    } catch (error) {
        res.status(500).json({message:"Internal server error"});
    }
})

//register route

router.post("/register",registerUser);

export default router;