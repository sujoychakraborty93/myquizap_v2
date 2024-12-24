// src/features/questions/questionsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  questions: [],
  currentQuestionIndex: 0,
  score: 0,
  questionsAttemptedCount: 0,
  questionsAttempted: {},
  questionsState: {}, //store all q based on id
  answersState:{}, //store all answers based on id. 
  fetchNextQuestionSet: false,
  fetchPreviousQuestionSet: false,
  answers: {}, // To store answers: { questionId: { selectedAnswer: '', isCorrect: false } }
};

const questionsSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    setQuestions: (state, action) => {
        var a = state.questions; 
        var b = action.payload;
        var c = [...a, ...b]
        state.questions = c;
        b.map((q) => {
          state.questionsState[q._id] = false;
          q.answers.map((a) => {
            state.answersState[a.id]={'text': a.text, 'is_correct': a.is_correct, 'checked': false, 'disabled': false}
          })
        })
    },
    setCurrentQuestionIndex: (state, action) => {
      state.currentQuestionIndex = action.payload;
    },
    incrementQuestionIndex: (state) => {
      state.currentQuestionIndex += 1;
    },
    nextQuestion: (state) => {
        if (state.currentQuestionIndex < state.questions.length - 1) {
            state.currentQuestionIndex += 1;
            state.fetchNextQuestionSet = false
        }
        else state.fetchNextQuestionSet = true
    },
    previousQuestion: (state) => {
        if (state.currentQuestionIndex > 0) {
            state.currentQuestionIndex -= 1;
            state.fetchPreviousQuestionSet = false
        }
        else state.fetchPreviousQuestionSet = true
    },
    answerQuestion: (state, action) => {
        const { questionId, answer, answerId } = action.payload;
        state.questionsAttempted[questionId] = answer; //option 1 - store all attempted ques and ans in dict/obj
        state.questionsState[questionId] = true; //option 2 - store all attempted ques in dict/obj as true
        state.answersState[answerId].checked = true
        const question = state.questions.find((q) => q._id === questionId);
        const ans = question.answers.find((a) => a.id === answer.id)
        const isCorrect = ans.is_correct; 
        if (isCorrect) {
            state.score += 1;
        }
        state.questionsAttemptedCount += 1;
        state.answers[questionId] = { selectedAnswer: answer, isCorrect };
    },
  },
});

export const { setQuestions, nextQuestion, previousQuestion, answerQuestion } = questionsSlice.actions;

export default questionsSlice.reducer;
