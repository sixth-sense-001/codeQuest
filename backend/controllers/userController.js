import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const registerUser = async (req,res) => {
    try {
        
        const {username , email, password} = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({message:"All fields are required!"});
        }

        const userExists = await User.findOne({email});
        if (userExists) {
            return res.status(400).json({message: "User with that email already exists!"});
        }

        const hashedPassword = await bcrypt.genSalt(password,10);

        const newUser = new User ({
            username,
            email,
            password: hashedPassword
        });

        await newUser.save()

        res.status(201).json({
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            message: "User registered successfully!"
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Server Error"});
    }
}