import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Pin from "../models/pinSchema.js";
import User from "../models/userSchema.js";
import { ObjectId } from 'mongodb'; 


export const register = async (req, res) => {
     try {
        const salt = await bcrypt.genSalt(10);
        const cryptPassword = await bcrypt.hash(req.body.password, salt);

        const newUser = new User({
            userName: req.body.userName,
            email: req.body.email,
            password: cryptPassword
        });

        const userSaved = await newUser.save();
        return res.status(200).json({message: 'success', data: userSaved});
    // return res.status(200).json({message: '/register'})
    } catch (error) {
        console.log("[FAILED] Registering user!");
        return res.status(500).json(error);
    }
};

export const login = async (req, res) => {
    try {
        const user = await User.findOne({ userName: req.body.userName });
        if (!user) {
            return res.status(401).json({ message: "Failed to login with credentials provided!" });
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.status(400).json({ message: "Failed to login with credentials provided!" });
        }

        const tokenObject = {
            _id: user._id,
            name: user.userName,
            email: user.email,
        };

        const jwtToken = jwt.sign(tokenObject, process.env.SERVER_SECRET, { expiresIn: '3m' });

        res.cookie("token", jwtToken, {
            httpOnly: true,
            secure: false,
            maxAge: 60 * 3 * 1000, // 1 minute in milliseconds
            sameSite: 'None'
        });

        return res.status(200).json({ user });
    } catch (error) {
        console.log("[FAILED] Logging in with user");
        return res.status(500).json(error);
    }
};

export const logout = async (req, res) => {
    res.clearCookie('token')
    return res.status(200).json({message: 'Logged out successfully'})
}

export const getPins = async (req, res) => {
    try {
        const pins = await Pin.find();
        return res.status(200).json(pins);
    } catch (error) {
        console.log("[FAILED] To fetch pin from DB");
        return res.status(500).json(error);
    }
};

export const createPin = async (req, res) => {
    try {
        const pinCandidate = new Pin(req.body);
        const savedPin = await pinCandidate.save();
        console.log("[SUCCESS] Pin added to DB");
        return res.status(200).json(savedPin);
    } catch (error) {
        console.log("[FAILED] To add pin to DB");
        return res.status(500).json(error);
    }
};

export const dropPins = async (req, res) => {
    try {
        const pin_id = req.query.pin_id;
        const deletePin = await Pin.deleteOne({ "_id": new ObjectId(pin_id) });
        return res.status(200).json({ msg: "Pin deleted successfully" });
    } catch (error) {
        console.error("[FAILED] To delete pin", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};




