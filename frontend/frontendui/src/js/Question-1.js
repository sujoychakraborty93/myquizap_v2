// src/components/Question.js
import React from 'react';
import { useSelector } from 'react-redux';
import '../css/PlayNow.css'

const Question = () => {
  const currentQuestionIndex = useSelector((state) => state.questionsStore.currentQuestionIndex);
  const questions = useSelector((state) => state.questionsStore.questions);

  // if (!questions.length) return <div>No questions available</div>;
  if (!questions.length) {
    console.log("/js/Question.js -> no question")
    return <div>No questions available</div>
  };
  console.log("currentQuestionIndex in /js/Question: ", currentQuestionIndex)

  const question = questions[currentQuestionIndex];

  return (
    <div>
      <div className="question-box">
        <h2>{question.question_title}</h2>
      </div>
      <div className="options-box">
        {question.answers.map((option, index) => (
          <div key={index}>
            <input type="radio" name="option" value={option.text} id={`option-${index}`} />
            <label htmlFor={`option-${index}`}>{option.text}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Question;
