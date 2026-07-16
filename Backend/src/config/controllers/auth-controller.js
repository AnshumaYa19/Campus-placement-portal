const userModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function registerUserController(req, res){
    try {
        const {name, email, password, role} = req.body;
        
        if(!name || !email || !password || !role){
            return res.status(400).json({
                message: "Please provide all required fields"
            });
        }

        if(!['student', 'recruiter'].includes(role)){
            return res.status(400).json({
                message: "Role must be either 'student' or 'recruiter'"
            });
        }

        const isUserExist = await userModel.findOne({email});
        if(isUserExist){
            return res.status(409).json({
                message: "User already exists with this email"
            });
        }

        const hash = await bcrypt.hash(password, 10);
        const user = await userModel.create({
            name, 
            email, 
            password: hash, 
            role
        });

        const token = jwt.sign(
            {id: user._id, name: user.name, role: user.role},
            process.env.JWT_SECRET,
            {expiresIn: "7d"}
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.status(201).json({
            message: "User successfully created",
            user: { 
                id: user._id,
                name: user.name, 
                email: user.email,
                role: user.role
            }
        });
    } catch(error) {
        console.error("Registration error:", error);
        res.status(500).json({
            message: "Error during registration",
            error: error.message
        });
    }
}

async function loginUserController(req, res){
    try {
        const {email, password} = req.body;
        
        if(!email || !password){
            return res.status(400).json({
                message: "Please provide email and password!"
            });
        }

        const user = await userModel.findOne({email});
        if(!user){
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if(!isPasswordCorrect){
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const token = jwt.sign(
            {id: user._id, name: user.name, role: user.role},
            process.env.JWT_SECRET,
            {expiresIn: "7d"}
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.status(200).json({
            message: "User successfully logged in",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch(error) {
        console.error("Login error:", error);
        res.status(500).json({
            message: "Error during login",
            error: error.message
        });
    }
}

module.exports = {
    registerUserController,
    loginUserController
};
