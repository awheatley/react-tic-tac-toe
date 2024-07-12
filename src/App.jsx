import Player from "./components/Player"
import GameBoard from "./components/GameBoard"
import Log from "./components/Log";
import { useState } from "react"

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

      <GameBoard onSelectSquare={handleSelectSquare} turns={gameTurns} />
    </div>
    <Log turns={gameTurns} />
  </main>
}

export default App
