// src/components/ModeSelectionModal.js
import React from 'react';
import '../css/ModeSelectionModal.css';

const ModeSelectionModal = ({ onSelectMode }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Select Play Mode</h2>
        <button onClick={() => onSelectMode('easy')}>Easy Mode</button>
        <button onClick={() => onSelectMode('medium')}>Medium Mode</button>
        <button onClick={() => onSelectMode('hard')}>Hard Mode</button>
      </div>
    </div>
  );
};

export default ModeSelectionModal;
