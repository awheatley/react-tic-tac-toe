import { useState } from "react";

export default function Player({ name, symbol, isActive }) {
  const [playerName, setPlayerName] = useState(name);
  const [isEditing, setIsEditing] = useState(false);

  function handleEditPlayer() {
    setIsEditing((editing) => !editing);
  }

  function handleSetPlayerName(event) {
    setPlayerName(event.target.value);
  }

  let editedPlayerName = isEditing ? <input type="text" required value={playerName} onChange={handleSetPlayerName}/> : <span className="player-name">{playerName}</span>;

  return (
    <li className={isActive ? 'active' : ''}>
      <span className="player">
        {editedPlayerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditPlayer}>{!isEditing ? 'Edit' : 'Save'}</button>
    </li>
  )
}