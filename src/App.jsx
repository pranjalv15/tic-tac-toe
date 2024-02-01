import { useState } from "react";
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combination";
import GamerOver from "./components/GameOver";

function deriveActPlayer(gamelogs) {
  let currentPlayer = "X";
  if (gamelogs.length > 0 && gamelogs[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}
const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function App() {
  const [players, setPlayers] = useState({
    X: "Player 1",
    O: "Player 2",
  });
  const [gamelogs, setGamelogs] = useState([]);
  let activePlayer = deriveActPlayer(gamelogs);

  let gameBoard = [
    ...initialGameBoard.map((array) => {
      return [...array];
    }),
  ];
  let winner = null;
  for (const log of gamelogs) {
    const row = log.square.row;
    const col = log.square.col;
    const player = log.player;
    gameBoard[row][col] = player;
  }

  for (const combination of WINNING_COMBINATIONS) {
    const firstSqSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSqSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSqSymbol = gameBoard[combination[2].row][combination[2].column];
    if (
      firstSqSymbol &&
      firstSqSymbol === secondSqSymbol &&
      firstSqSymbol === thirdSqSymbol
    ) {
      winner = players[firstSqSymbol];
    }
  }
  let hasDraw = false;
  if (winner === null && gamelogs.length === 9) {
    hasDraw = true;
  }
  function handleSymbolClick(rowIndex, itemIndex) {
    setGamelogs((prevLogs) => {
      const currentPlayer = deriveActPlayer(prevLogs);
      const updatedLogs = [
        { square: { row: rowIndex, col: itemIndex }, player: currentPlayer },
        ...prevLogs,
      ];
      return updatedLogs;
    });
  }
  function handleRematch() {
    setGamelogs([]);
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers((prev) => {
      return { ...prev, [symbol]: newName };
    });
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName="Player 1"
            symbol="X"
            isActive={activePlayer === "X"}
            onPlayerNameChange={handlePlayerNameChange}
          />
          <Player
            initialName="Player 2"
            symbol="O"
            isActive={activePlayer === "O"}
            onPlayerNameChange={handlePlayerNameChange}
          />
        </ol>
        {winner === null && hasDraw === false ? (
          <GameBoard gameBoard={gameBoard} onSymbolClick={handleSymbolClick} />
        ) : (
          <GamerOver winner={winner} onhandleRematch={handleRematch} />
        )}
      </div>
      <Log logs={gamelogs} />
    </main>
  );
}

export default App;
