import { json } from "express";
import { ObjectId } from 'mongodb';
import Pin from "../models/pinSchema.js";
import User from "../models/userSchema.js";
import bcrypt from "bcrypt";

export async function getPins(req, res) {
   try {
    const pins = await Pin.find();
    res.status(200).json(pins)

   } catch (error) {
     console.log("[FAILED] To fetch pin from DB")
        res.status(500).json(error)
   }
};

export async function createPin(req, res) {
    try {

        const pinCandidate = new Pin(req.body)
        const savedPin = await pinCandidate.save();
        res.status(200).json(savedPin)
        console.log("[SUCCESS] Pin added to DB")

    } catch (error) {
        console.log("[FAILED] To add pin to DB")
        res.status(500).json(error)
    }
};

export async function dropPins(req, res) {
    try {
        const pin_id = req.query.pin_id;
        const deletePin = await Pin.deleteOne({ "_id": new ObjectId(pin_id) });
        res.status(200).json({ msg: "Pin deleted successfully" });
    } catch (error) {
        console.error("[FAILED] To delete pin", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export async function register(req, res) {
    try {
        /** Generate Password */
        const salt = await bcrypt.genSalt(10)
        const cryptPassword = await bcrypt.hash(req.body.password, salt)


        //creating new User
        const newUser = new User({
            userName: req.body.userName,
            email: req.body.email,
            password: cryptPassword
        })

        //Push newUser to DB
        const userSaved = await newUser.save()
        res.status(200).json(userSaved)
        console.log("[SUCCESS] Registering user !")
        // console.status(200).json(userSaved._id)

    } catch (error) {
         console.log("[FAILED] Registering user !")
         res.status(500).json(error)
    }
};

export async function login(req, res) {
    try {
        /* Find a specific user*/
        const user = await User.findOne({userName: req.body.userName})
        if(!user){
            console.log({ msg : "Failed to login with credentials provided!"})
            res.status(400).json("Wrong username or password!")
        }
        else {
            /** Validate password */
            const validPassword = await bcrypt.compare (req.body.password, user.password)   
            
            if(!validPassword){
                console.log("[FAILED] logging to user")
                res.status(400).json("Wrong  username or password")
            }
            else {
                console.log("[SUCCESS] Logging to user !")
                res.status(200).json(user)
            }
        }
    } catch (error) {
        console.log("[FAILED] Logging in with user")
        res.status(500).json(error)
    }
};