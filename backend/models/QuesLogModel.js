import mongoose from "mongoose";

const quesLogSchema = mongoose.Schema(
    {
        userId: {type: String, required: true},
        questionId: {type: String, required: true},
        timestamp: {type: Date, default: Date.now},
    }
)
export const quesLogModel = mongoose.model('QuesLog', quesLogSchema, 'Ques_Log_Collection');