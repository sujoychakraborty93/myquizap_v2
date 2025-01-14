// src/components/Playnow.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setQuestions, nextQuestion, previousQuestion, answerQuestion } from '../redux/questionsSlice';
import { setTopics, toggleTopic } from '../redux/topicsSlice';
import { setRegions, toggleRegion } from '../redux/regionsSlice';
import ModeSelectionModal from './ModeSelectionModal'

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
  
  const { questions, currentQuestionIndex, score, questionsAttemptedCount, questionsAttempted} = useSelector((state) => state.questionsStore);
  // const { questions, currentQuestionIndex, score, questionsAttemptedCount, } = useSelector((state) => state.questionsStore);
  // const { topics, regions, selectedTopics, selectedRegions } = useSelector((state) => state.filters);
  const {topics, selectedTopics} = useSelector((state) => state.topicsStore);
  const {regions, selectedRegions} = useSelector((state) => state.regionsStore);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [submitAnswerMessage, setSubmitAnswerMessage] = useState('');
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [mode, setMode] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState({});
  

  const shuffleArray = (array) => {
    let shuffledArray = array.slice(); // Copy the array to avoid mutating the original one
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };
  
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

  
  // const fetchInitialData = async () => {
  //   const topicsResponse = await api.get('/topics');
  //   const regionsResponse = await api.get('/regions');
  //   dispatch(setTopics(topicsResponse.data));
  //   console.log("PlayNow.js -> after dispatch of topcis")
  //   dispatch(setRegions(regionsResponse.data));
  // };
  // fetchInitialData();

  // useEffect(() => {
  //   if (questions.length > 0) {
  //     const questionId = questions[currentQuestionIndex]._id;
  //     if (answers[questionId]) {
  //       setSelectedAnswer(answers[questionId].selectedAnswer);
  //     } else {
  //       setSelectedAnswer(null);
  //     }
  //   }
  // }, [currentQuestionIndex, questions, answers]);

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

  // useEffect(() => {
  //     fetchQuestions();
  // }, []);

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
  //   if (fetchNextQuestionSet) fetchQuestions();
  // }, [fetchNextQuestionSet])

  // if (fetchNextQuestionSet) fetchQuestions();
  
  useEffect(() => {
    if (questions[currentQuestionIndex]) {
      setShuffledOptions(shuffleArray(questions[currentQuestionIndex].answers));
      setIsDisabled(false);
    }
  }, [questions[currentQuestionIndex]]);

  // const handleAnswerSelect = (answer) => {
  //   if (!isDisabled) {
  //     setSelectedAnswer(answer);
  //   }
  // };

  // const handleAnswerSelect = (answer) => {
  //     setSelectedAnswer(answer);
  // };

  // const handleAnswerSelect = (answer) => {
  //   if (!answers[questions[currentQuestionIndex]._id]) {
  //     setSelectedAnswer(answer);
  //   }
  // };
  
  const handleAnswerSelect = (questionId, answerIndex) => {
    setSelectedAnswer({ ...selectedAnswer, [questionId]: answerIndex });
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
      // setIsDisabled(true);
      // setSelectedAnswer(null);
      setSubmitted({ ...submitted, [question._id]: true });
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

  const handleModeSelection = (selectedMode) => {
    setMode(selectedMode);
  };

  return (
    <div>
      <Header/>
      <div className="playnow-container">
        {/* {!mode && <ModeSelectionModal onSelectMode={handleModeSelection} />} */}
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
              <span>Score: {score}</span> | <span>Questions Attempted: {questionsAttemptedCount}</span> | <span>Question Number: {currentQuestionIndex}</span> | <span>Total Questions: {questions.length}</span>
            </div>
            <div className="question-box">
              {questions[currentQuestionIndex].question_title}
            </div>
            <div className="answers">
              {/* {shuffledOptions.map((answer, index) => ( */}
              {questions[currentQuestionIndex].answers.map((answer, index) => (
                <label key={index} 
                  className={`answer ${selectedAnswer === answer ? 'selected' : ''}`}
                  // className={`answer ${selectedAnswer === answer ? 'selected' : ''} ${answers[questions[currentQuestionIndex]._id]?.selectedAnswer === answer ? 'disabled' : ''} ${answers[questions[currentQuestionIndex]._id]?.isCorrect && answer === questions[currentQuestionIndex].correctAnswer ? 'correct' : ''}`}
                  // className={`answer ${selectedAnswer === answer ? 'selected' : ''} ${answers[questions[currentQuestionIndex]._id]?.selectedAnswer === answer ? 'disabled' : ''} ${answer === questions[currentQuestionIndex].correctAnswer ? 'correct' : ''}`}
                  >
                  <input
                    type="radio"
                    name="answer"
                    value={answer.text}
                    checked={selectedAnswer === answer}
                    onChange={() => handleAnswerSelect(answer)}
                    // style={{ pointerEvents: isDisabled ? 'none' : 'auto', opacity: isDisabled && selectedAnswer !== answer ? 0.5 : 1 }}
                    // disabled={selectedAnswers[currentQuestionIndex]?.isDisabled}
                    // disabled={answers[questions[currentQuestionIndex]._id] ? true : false}
                    disabled={submitted[questions[currentQuestionIndex]._id]}
                  />
                  {answer.text}
                </label>
              ))}
            </div>
            <div className="navigation-buttons">
              <button className="previous-button" onClick={() => dispatch(previousQuestion())}>Previous</button>
              <button className="submit-button" onClick={handleSubmitAnswer} disabled={submitted[questions[currentQuestionIndex]._id]}>Submit Answer</button>
              {/* <button className="next-button" onClick={() => dispatch(nextQuestion())}>Next</button> */}
              <button className="next-button" onClick={handleNext}>Next</button>
            </div>
            {submitted[questions[currentQuestionIndex]._id] &&
              <div>
                {questions[currentQuestionIndex].answers.map((answer, index) => (
                  <div key={index} style={{ color: answer.is_correct ? 'green' : 'black' }}>
                    {answer.text}
                  </div>
                ))}
              </div>
            }
            {submitAnswerMessage && <p>{submitAnswerMessage}</p>}
          </div>
        )}
      </div>
      <Footer/>
    </div>
  );
};

export default Playnow;
