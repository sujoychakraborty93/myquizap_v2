import mongoose from "mongoose";

// Define the Answer subdocument schema
const answerSchema = new mongoose.Schema({
    text: {type: String, required: true},
    is_correct: {type: Boolean, default: false}
  });

const quizQuestionSchema = mongoose.Schema(
    {
        question_id: {type: Number},
        question_title: {type: String,required: true},
        answers: [{type: answerSchema,required: true}],
        region: {type: String,required: true},
        topic: [String],
        difficulty:  {type: String,required: true}
    }
)

export const quizQuestionModel = mongoose.model('Questions', quizQuestionSchema, 'QuizQuestion_Collection');