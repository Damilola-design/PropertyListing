import mongoose from 'mongoose';

const { Schema } = mongoose;

const VerifySchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    photo:{
        type: String,
    },
    type:{
        type: String,
    },
    user_id:{
        type: String,
    },
    verified:{
        type: String,
        default: "Pending",
    }
})

export default mongoose.model("Verify", VerifySchema)