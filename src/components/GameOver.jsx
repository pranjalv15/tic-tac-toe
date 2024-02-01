function GamerOver({ winner, onhandleRematch }) {
  return (
    <div id="game-over">
      <h2>Game Over!</h2>
      {winner === null ? <p>It's a draw</p> : <p>{winner} won!</p>}
      <p>
        <button onClick={onhandleRematch}>Rematch!</button>
      </p>
    </div>
  );
}

export default GamerOver;
