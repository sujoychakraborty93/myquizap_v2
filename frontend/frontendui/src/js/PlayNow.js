// src/components/Playnow.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setQuestions, nextQuestion, previousQuestion, answerQuestion } from '../redux/questionsSlice';
import { setTopics, toggleTopic } from '../redux/topicsSlice';
import { setRegions, toggleRegion } from '../redux/regionsSlice';

import axios from 'axios';
import config from '../config';
import Header from './Header';
import Footer from './Footer';
import '../css/PlayNow.css'; // Assuming you create a CSS file for styling

const api = axios.create({
  baseURL: config.apiUrl,
  withCredentials: true,
});

const Playnow = () => {
  const dispatch = useDispatch();
  
  const { questions, currentQuestionIndex, score, questionsAttemptedCount, questionsAttempted, questionsState, answersState} = useSelector((state) => state.questionsStore);
  const {topics, selectedTopics} = useSelector((state) => state.topicsStore);
  const {regions, selectedRegions} = useSelector((state) => state.regionsStore);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [submitAnswerMessage, setSubmitAnswerMessage] = useState('');
  // const [shuffledOptions, setShuffledOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  

  // const shuffleArray = (array) => {
  //   let shuffledArray = array.slice(); // Copy the array to avoid mutating the original one
  //   for (let i = shuffledArray.length - 1; i > 0; i--) {
  //     const j = Math.floor(Math.random() * (i + 1));
  //     [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  //   }
  //   return shuffledArray;
  // };
  
  useEffect(() => {
    const fetchInitialData = async () => {
      const topicsResponse = await api.get('/topics');
      const regionsResponse = await api.get('/regions');
      dispatch(setTopics(topicsResponse.data));
      console.log("PlayNow.js -> after dispatch of topcis")
      dispatch(setRegions(regionsResponse.data));
    };
    // if page refresh, dont execute api 
    const hasTopicsRegionsRendered = sessionStorage.getItem('hasTopicsRegionsRendered');
    if (!hasTopicsRegionsRendered) {
      fetchInitialData();
      // Set a flag in sessionStorage to prevent re-execution
      sessionStorage.setItem('hasTopicsRegionsRendered', 'true');
    }
    // fetchInitialData();
  }, [dispatch]);

  const fetchQuestions = async () => {
    const questionsResponse = await api.post('/questions', {
      topics: selectedTopics,
      regions: selectedRegions,
    });
    console.log("forntend -> PlayNow.js -> fetchQuestions: ", questionsResponse)
    dispatch(setQuestions(questionsResponse.data));
  };

  // if page refresh, dont execute api 
  useEffect(() => {
    const hasRendered = sessionStorage.getItem('hasRendered');
    console.log("frotend -> PlayNow.js -> hasRendered: ", hasRendered)
    if (!hasRendered) {
      fetchQuestions();
      // Set a flag in sessionStorage to prevent re-execution
      sessionStorage.setItem('hasRendered', 'true');
    }
  }, [])

  
  // useEffect(() => {
  //   if (questions[currentQuestionIndex]) {
  //     setShuffledOptions(shuffleArray(questions[currentQuestionIndex].answers));
  //   }
  // }, [questions[currentQuestionIndex]]);

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleSubmitAnswer = () => {
    try {
      if (!selectedAnswer) {
        setSubmitAnswerMessage('Please select an answer');
        return;
      } else {
        setSubmitAnswerMessage('');
      }
      const question = questions[currentQuestionIndex];
      dispatch(answerQuestion({ questionId: question._id, answer: selectedAnswer, answerId: selectedAnswer.id}));
      // setSelectedAnswer(null);
    }
    catch (error) {
      console.error("frotend -> PlayNow.js -> handleSubmitAnswer -> error: ", error);
    }
  };
  const handleNext = () => {
    console.log("handleNext -> currentQuestionIndex: ", currentQuestionIndex)
    console.log("handleNext -> questions.length: ", questions.length)
    if (currentQuestionIndex === questions.length - 2) {
      // No more questions, dispatch an action to fetch new questions
      fetchQuestions();
    }
    dispatch(nextQuestion());
  };
  return (
    <div>
      <Header/>
      <div className="playnow-container">
        <div className="filter-section">
          <h3>Topics</h3>
          <div className="topics">
            {topics.map((topic) => (
              <button
                key={topic._id}
                className={`filter-button ${selectedTopics.includes(topic.topic_name) ? 'selected' : ''}`}
                onClick={() => dispatch(toggleTopic(topic.topic_name))}
              >
                {topic.topic_name}
              </button>
            ))}
          </div>
          <h3>Regions</h3>
          <div className="regions">
            {regions.map((region) => (
              <button
                key={region._id}
                className={`filter-button ${selectedRegions.includes(region.region_name) ? 'selected' : ''}`}
                onClick={() => dispatch(toggleRegion(region.region_name))}
              >
                {region.region_name}
              </button>
            ))}
          </div>
          <button className="fetch-questions-button" onClick={fetchQuestions}>Filter</button>
        </div>

        {questions.length > 0 && (
          <div className="question-section">
            <div className="score-display">
              <span>Score: {score}</span> | <span>Questions Attempted: {questionsAttemptedCount}</span> | <span>Question Number: {currentQuestionIndex + 1}</span> | <span>Total Questions: {questions.length}</span>
            </div>
            {/* <div disabled={questionsAttempted[questions[currentQuestionIndex]._id]}> */}
            {/* {console.log("frontend -> playnow -> ui -> 1 -> ", questions[currentQuestionIndex]._id, questionsAttempted)}
            {console.log("fromtend -> playnow -> ui -> 2 -> ", (questions[currentQuestionIndex]._id in questionsAttempted ? true : false))} */}
            {/* <div disabled={questions[currentQuestionIndex]._id in questionsAttempted ? true : false}> */}
            {/* <div className="ques-ans-box" disabled={true}> */}
            <div 
              // className={`ques-ans-box ${questions[currentQuestionIndex]._id in questionsAttempted ? 'disabled' : ''}`}
              // className={`${questionsState[questions[currentQuestionIndex]._id] ? 'disabled' : ''}`}
              className={questionsState[questions[currentQuestionIndex]._id] ? 'disabled' : ''}
            >
              <div className="question-box">
                {questions[currentQuestionIndex].question_title}
              </div>
              <div className="answers">
                {/* {shuffledOptions.map((answer, index) => ( */}
                {questions[currentQuestionIndex].answers.map((answer, index) => (
                  <label key={index} 
                  className={`answer ${selectedAnswer === answer ? 'selected' : ''}`}
                  // style={{ backgroundColor: (questionsState[questions[currentQuestionIndex]._id] && answersState[answer.id].is_correct) ? 'green' : '' }}
                  style={{ backgroundColor: (questionsState[questions[currentQuestionIndex]._id] && answersState[answer.id].is_correct) ? '#90ee90' : '' }}
                  >
                    <input
                      // disabled={true}
                      type="radio"
                      name="answer"
                      value={answer.text}
                      checked={answersState[answer.id].checked ? true : (selectedAnswer === answer)}
                      onChange={() => handleAnswerSelect(answer)}
                    />
                    {answer.text}
                  </label>
                ))}
              </div>
            </div>
            <div className="navigation-buttons">
              <button className="previous-button" onClick={() => dispatch(previousQuestion())}>Previous</button>
              <button className={`submit-button ${questionsState[questions[currentQuestionIndex]._id] ? 'disabled' : ''}`} onClick={handleSubmitAnswer}>Submit Answer</button>
              {/* <button className="next-button" onClick={() => dispatch(nextQuestion())}>Next</button> */}
              <button className="next-button" onClick={handleNext}>Next</button>
            </div>
            {submitAnswerMessage && <p>{submitAnswerMessage}</p>}
          </div>
        )}
      </div>
      <Footer/>
    </div>
  );
};

export default Playnow;
