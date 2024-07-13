import Player from "./components/Player"
import GameBoard from "./components/GameBoard"
import Log from "./components/Log";
import { useState } from "react"
import { WINNING_COMBINATIONS } from "./winning-combinations";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function getActivePlayer(gameTurns) {
  let currentPlayer = 'X';

  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  }

  return currentPlayer;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const currentPlayer = getActivePlayer(gameTurns);

  let gameBoard = initialGameBoard;
  let winner;

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, column } = square;

    gameBoard[row][column] = player;
  }

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
      winner = firstSquareSymbol;
    }
  }
  
  function handleSelectSquare(rowIndex, columnIndex) {
    setGameTurns((previousTurns) => {
      const currentPlayer = getActivePlayer(previousTurns);
      const updatedTurns = [{ square: { row: rowIndex, column: columnIndex }, player: currentPlayer }, ...previousTurns];

      return updatedTurns;
    });
  }

  return <main>
    <div id="game-container">
      <ol id="players" className="highlight-player">
        <Player name="Player 1" symbol="X" isActive={currentPlayer === 'X'} />
        <Player name="Player 2" symbol="O" isActive={currentPlayer === 'O'} />
      </ol>
      {winner && <p>You won, {winner}</p>}
      <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
    </div>
    <Log turns={gameTurns} />
  </main>
}

export default App
