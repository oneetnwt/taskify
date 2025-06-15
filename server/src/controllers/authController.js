import bcrypt from "bcryptjs";
import User from "../models/user.js"
import { encryptPassword, generateToken, getEnv, loginValidation, signupValidation } from "../utils/index.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
    try {
        const { username, password, confirmPassword } = req.body

        const isValid = await signupValidation(username, password, confirmPassword, res);
        if (!isValid) return;

        const existingUser = await User.findOne({ username });

        if (existingUser) return res.status(400).json({ message: "Username already exists" })

        const hashedPassword = await encryptPassword(password)

        const newUser = new User({
            username,
            password: hashedPassword
        })

        await newUser.save()
        generateToken(newUser._id, res)

        res.status(200).json({ message: "User created successfully" })
    } catch (error) {
        console.log(`Error in signup controller: ${error}`);
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

export const login = async (req, res) => {
    try {
        const { username, password } = req.body

        const isValid = loginValidation(username, password, res)
        if (!isValid) return;

        const user = await User.findOne({ username })

        if (!user) return res.status(400).json({ message: "Incorrect Credentials" })

        const passwordCorrect = await bcrypt.compare(password, user.password)

        if (!passwordCorrect) return res.status(400).json({ message: "Incorrect Credentials" })

        generateToken(user._id, res)
        res.status(200).json({ message: "Logged in successfully" })
    } catch (error) {
        console.log(`Error in login controller: ${error}`);
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie("jwt");
        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        console.log(`Error in logout controller: ${error}`);
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

export const checkAuth = (req, res, next) => {
    const token = req.cookies.jwt

    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token' })
    }

    try {
        const decoded = jwt.verify(token, getEnv("JWT_SECRET"));
        req.user = decoded

        res.status(200).json({ message: req.user })
    } catch (error) {
        console.log(`Error in checkAuth controller: ${error}`);
        return res.status(401).json({ message: 'Not authorized, token invalid' })
    }
};