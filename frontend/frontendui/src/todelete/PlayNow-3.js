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
  
  const { questions, currentQuestionIndex, score, questionsAttempted } = useSelector((state) => state.questionsStore);
  // const { topics, regions, selectedTopics, selectedRegions } = useSelector((state) => state.filters);
  const {topics, selectedTopics} = useSelector((state) => state.topicsStore);
  const {regions, selectedRegions} = useSelector((state) => state.regionsStore);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [submitAnswerMessage, setSubmitAnswerMessage] = useState('');
  
  useEffect(() => {
    const fetchInitialData = async () => {
      const topicsResponse = await api.get('/topics');
      const regionsResponse = await api.get('/regions');
      dispatch(setTopics(topicsResponse.data));
      console.log("PlayNow.js -> after dispatch of topcis")
      dispatch(setRegions(regionsResponse.data));
    };
    fetchInitialData();
  }, [dispatch]);

  
  // const fetchInitialData = async () => {
  //   const topicsResponse = await api.get('/topics');
  //   const regionsResponse = await api.get('/regions');
  //   dispatch(setTopics(topicsResponse.data));
  //   console.log("PlayNow.js -> after dispatch of topcis")
  //   dispatch(setRegions(regionsResponse.data));
  // };
  // fetchInitialData();

  // useEffect(() => {
  //   const fetchQuestions = async () => {
  //     const questionsResponse = await api.post('/questions', {
  //       topics: selectedTopics,
  //       regions: selectedRegions,
  //     });
  //     console.log("forntend -> PlayNow.js -> fetchQuestions: ", questionsResponse)
  //     dispatch(setQuestions(questionsResponse.data));
  //   };
  // }, [])

  const fetchQuestions = async () => {
    const questionsResponse = await api.post('/questions', {
      topics: selectedTopics,
      regions: selectedRegions,
    });
    console.log("forntend -> PlayNow.js -> fetchQuestions: ", questionsResponse)
    dispatch(setQuestions(questionsResponse.data));
  };
  // fetchQuestions();
  
  // useEffect(() => {
  //   if (selectedTopics.length > 0 && selectedRegions.length > 0) {
  //     fetchQuestions();
  //   }
  // }, [selectedTopics, selectedRegions]);

  useEffect(() => {
      fetchQuestions();
  }, []);
  

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
      dispatch(answerQuestion({ questionId: question._id, answer: selectedAnswer }));
      setSelectedAnswer(null);
    }
    catch (error) {
      console.error("frotend -> PlayNow.js -> handleSubmitAnswer -> error: ", error);
    }
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
          <button className="fetch-questions-button" onClick={fetchQuestions}>Submit</button>
        </div>

        {questions.length > 0 && (
          <div className="question-section">
            <div className="score-display">
              <span>Score: {score}</span> | <span>Questions Attempted: {questionsAttempted}</span>
            </div>
            <div className="question-box">
              {questions[currentQuestionIndex].question_title}
            </div>
            <div className="answers">
              {questions[currentQuestionIndex].answers.map((answer, index) => (
                <label key={index} className={`answer ${selectedAnswer === answer ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="answer"
                    value={answer.text}
                    checked={selectedAnswer === answer}
                    onChange={() => handleAnswerSelect(answer)}
                  />
                  {answer.text}
                </label>
              ))}
            </div>
            <div className="navigation-buttons">
              <button className="previous-button" onClick={() => dispatch(previousQuestion())}>Previous</button>
              <button className="submit-button" onClick={handleSubmitAnswer}>Submit</button>
              <button className="next-button" onClick={() => dispatch(nextQuestion())}>Next</button>
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
