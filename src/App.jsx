import Player from "./components/Player"
import GameBoard from "./components/GameBoard"
import Log from "./components/Log";
import { useState } from "react"

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [activePlayer, setActivePlayer] = useState('X');

  function handleSelectSquare(rowIndex, columnIndex) {
    setActivePlayer((currentActivePlayer) => currentActivePlayer === 'X' ? 'O' : 'X');
    setGameTurns((previousTurns) => {
      let currentPlayer = 'X';

      if (previousTurns.length > 0 && previousTurns[0].player === 'X') {
        currentPlayer = 'O';
      }

      const updatedTurns = [{ square: { row: rowIndex, column: columnIndex}, player: currentPlayer }, ...previousTurns];

      return updatedTurns;
    });
  }

  return <main>
    <div id="game-container">
      <ol id="players" className="highlight-player">
        <Player name="Player 1" symbol="X" isActive={activePlayer === 'X'} />
        <Player name="Player 2" symbol="O" isActive={activePlayer === 'O'} />
      </ol>

      <GameBoard onSelectSquare={handleSelectSquare} turns={gameTurns} />
    </div>
    <Log turns={gameTurns} />
  </main>
}

export default App
