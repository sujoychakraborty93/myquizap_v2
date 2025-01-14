import React from 'react';

function PlayNow() {
  return (
    <div className="playnow">
      <section className="quiz-section">
        <div className="quiz-box">
          <h2>Quiz Topic</h2>
          <p>Placeholder topic for the quiz.</p>
        </div>
      </section>
    </div>
  );
}

export default PlayNow;

// ========================

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/PlayNow.css'
import Header from './Header';
import Footer from './Footer';

const QuestionComponent = () => {
  const [selectedBox, setSelectedBox] = useState(null);
  const [question, setQuestion] = useState('');
  const [answers, setAnswers] = useState([]);
  const [region, setRegion] = useState('');
  const [topic, setTopic] = useState('');

  useEffect(() => {
    // Fetch the question and answers from the backend
    axios.get('/api/question', { withCredentials: true })
      .then(response => {
        setQuestion(response.data.question);
        setAnswers(response.data.answers);
      })
      .catch(error => console.error('Error fetching question:', error));
  }, []);

  const handleBoxClick = (index) => {
    setSelectedBox(index);
  };

  const handleSubmit = () => {
    if (selectedBox === null) {
      alert('Please select an answer');
      return;
    }
    const answer = answers[selectedBox];
    axios.post('/api/submit-answer', { answer })
      .then(response => {
        alert('Answer submitted successfully');
      })
      .catch(error => console.error('Error submitting answer:', error));
  };

  const handleFilterChange = (type, value) => {
    if (type === 'region') {
      setRegion(value);
    } else if (type === 'topic') {
      setTopic(value);
    }
    axios.post('/api/filter', { type, value })
      .then(response => {
        // Handle the response as needed
        console.log('Filter applied:', response.data);
      })
      .catch(error => console.error('Error applying filter:', error));
  };

  return (
    <div>
      <Header/>
      <div className="container">
        <div className="left-panel">
          <div className="filter-menu">
            <label>
              Region:
              <select value={region} onChange={(e) => handleFilterChange('region', e.target.value)}>
                <option value="">Select Region</option>
                <option value="Region 1">Region 1</option>
                <option value="Region 2">Region 2</option>
                <option value="Region 3">Region 3</option>
                <option value="Region 4">Region 4</option>
                <option value="Region 5">Region 5</option>
              </select>
            </label>
            <label>
              Topic:
              <select value={topic} onChange={(e) => handleFilterChange('topic', e.target.value)}>
                <option value="">Select Topic</option>
                <option value="Topic 1">Topic 1</option>
                <option value="Topic 2">Topic 2</option>
                <option value="Topic 3">Topic 3</option>
                <option value="Topic 4">Topic 4</option>
                <option value="Topic 5">Topic 5</option>
              </select>
            </label>
          </div>
        </div>
        <div className="main-content">
          <section className="question-section">
            <h1>{question}</h1>
          </section>
          <section className="answer-section">
            <div className="answers-grid">
              {answers.map((answer, index) => (
                <div
                  key={index}
                  className={`answer-box ${selectedBox === index ? 'selected' : ''}`}
                  onClick={() => handleBoxClick(index)}
                >
                  {answer}
                </div>
              ))}
            </div>
            <button onClick={handleSubmit}>Submit</button>
          </section>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default QuestionComponent;
