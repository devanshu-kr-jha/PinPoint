import mongoose from "mongoose";
const { Schema } = mongoose;

const PinSchema = new Schema({
    username : {
        type: String,
        required: true
    },

    title : {
        type: String,
        required: true,
        min: 3
    },

    rating : {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },

    lat : {
        type: Number,
        required: true
    },

    lon : {
        type: Number,
        required: true
    },
    
    descr : {
        type: String,
        required: true
    }
}, { timestamps: true });

export default mongoose.model("Pin", PinSchema);