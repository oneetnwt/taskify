import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const signupValidation = async (username, password, confirmPassword, res) => {
    if (!username || !password || !confirmPassword) {
        res.status(400).json({ message: "All fields are required" });
        return false;
    }

    if (password !== confirmPassword) {
        res.status(400).json({ message: "Passwords do not match" });
        return false;
    }

    if (username.length < 5) {
        res.status(400).json({ message: "Username should contain at least 5 characters" });
        return false;
    }

    if (password.length < 8) {
        res.status(400).json({ message: "Password should contain at least 8 characters" });
        return false;
    }

    return true;
};

export const loginValidation = async (username, password, res) => {
    if (!username || !password) {
        res.status(400).json({ message: "All fields are required" });
        return false;
    }

    return true;
}


export const encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = bcrypt.hash(password, salt);

    return hashedPassword
}

export const generateToken = (userId, res) => {
    const token = jwt.sign({ userId }, getEnv(JWT_SECRET), {
        expiresIn: "1d"
    })

    res.cookie("jwt", token, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
        secure: getEnv(NODE_ENV) !== "development"
    })

    return token
}

export const getEnv = (key) => {
    return process.env[key];
};