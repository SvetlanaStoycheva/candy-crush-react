import React from 'react';

const ScoreBoard = ({ score }) => {
  return (
    <div className='score-board'>
      <h3>
        score: <span>{score}</span>
      </h3>
    </div>
  );
};

export default ScoreBoard;
