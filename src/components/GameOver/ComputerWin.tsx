import React from 'react';

export default function ComputerWin({ gameOver }: any) {
  return <div className="game-over">
    <h1 className="game-over-text">Game is over!</h1>
    <h1 className="game-over-text">Try once again!</h1>
    <button className="new-game-button" onClick={gameOver}>Start new game</button>
  </div>
}