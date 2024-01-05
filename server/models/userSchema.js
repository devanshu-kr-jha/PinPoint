import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new Schema({
    userName : {
        type: String,
        required: true,
        min: 3,
        max: 5
    },

    email : {
        type: String,
        required: true,
        max: 50,
        unique: true
    },

    password : {
        type: String,
        required: true,
        min: 6
    }
},{ timestamps : true });

export default mongoose.model("User", UserSchema);