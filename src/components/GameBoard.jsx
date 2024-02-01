function GameBoard({ gameBoard, onSymbolClick }) {
 
  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => {
        return (
          <li key={rowIndex}>
            <ol>
              {row.map((playerSymbol, itemIndex) => {
                return (
                  <li key={itemIndex}>
                    <button
                      onClick={() => onSymbolClick(rowIndex, itemIndex)}
                      disabled={playerSymbol !== null}
                    >
                      {playerSymbol}
                    </button>
                  </li>
                );
              })}
            </ol>
          </li>
        );
      })}
    </ol>
  );
}

export default GameBoard;
