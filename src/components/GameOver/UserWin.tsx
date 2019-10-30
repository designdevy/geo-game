import React from 'react';

export default function UserWin({ gameOver }: any) {
  return <div className="game-over">
  <h1 className="game-over-text">Congratulations!</h1>
  <h1 className="game-over-text">Play once again!</h1>
  <button className="new-game-button" onClick={gameOver}>Start new game</button>
</div>
}