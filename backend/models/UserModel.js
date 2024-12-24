import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        name: {type: String, required: true},
        email: {type: String, unique: true, required: true},
        password: {type: String, required: true},
        ip: {type: String},
        score: {type: String},
        questions_attempted: {type: String},
        level: {type: String},
        timestamp: {type: Date, default: Date.now},
    }
)
export const userModel = mongoose.model('Users', userSchema, 'User_Collection');