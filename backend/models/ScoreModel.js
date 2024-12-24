import mongoose from "mongoose";

const scoreSchema = mongoose.Schema(
    {
        user_id: {type: Number},
        ip: {type: String},
        score: {type: String},
        questions_attempted: {type: String},
        level: {type: String},
        timestamp: {type: Date, default: Date.now},
    }
)

export const scoreModel = mongoose.model('Scores', scoreSchema, 'Score_Collection');