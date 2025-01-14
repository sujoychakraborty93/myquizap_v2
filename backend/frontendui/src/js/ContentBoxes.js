import React from 'react';
import '../css/ContentBoxes.css';

function ContentBoxes() {
  return (
    <section className="content-boxes">
      <div className="box" onClick={() => window.location.href='/page1'}>
        <h2>Play Now</h2>
        <p>1. Get Started Immediately</p>
        <p>2. Select topic</p>
        <p>3. Sign in to save your score</p>
        <button onClick={() => window.location.href='/page1'}>Get Started</button>
      </div>
      <div className="box" onClick={() => window.location.href='/page2'}>
        <h2>Box 2</h2>
        <p>Click to go to page 2</p>
      </div>
      <div className="box" onClick={() => window.location.href='/page3'}>
        <h2>Box 3</h2>
        <p>Click to go to page 3</p>
      </div>
    </section>
  );
}

export default ContentBoxes;
