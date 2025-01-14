import React from 'react';
import Footer from './Footer';
import Header from './Header';

function MyScores() {
  const scores = [
    { quiz: "Quiz 1", timestamp: "2024-01-01", score: 90, level: "Easy", topics: "Topic A" },
    { quiz: "Quiz 2", timestamp: "2024-01-02", score: 85, level: "Medium", topics: "Topic B" },
  ];

  return (
    <div>
      <Header/>
      <div className="MyScores">
        <section className="scores-section">
          <h2>My Scores</h2>
          <ul>
            {scores.map((score, index) => (
              <li key={index}>
                <strong>Quiz:</strong> {score.quiz}<br/>
                <strong>Date:</strong> {score.timestamp}<br/>
                <strong>Score:</strong> {score.score}<br/>
                <strong>Level:</strong> {score.level}<br/>
                <strong>Topics:</strong> {score.topics}
              </li>
            ))}
          </ul>
        </section>
      </div>
      <Footer/>
    </div>
  );
}

export default MyScores;
