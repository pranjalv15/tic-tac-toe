import { useState } from "react";
function Player({ initialName, symbol, isActive, onPlayerNameChange }) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(initialName);

  function handleClick() {
    setIsEditing((prev) => {
      return !prev;
    });

    if (isEditing) {
      onPlayerNameChange(symbol, name);
    }
  }

  function handeChange(event) {
    setName(event.target.value);
  }

  let playerName = <span className="player-name">{name}</span>;
  if (isEditing) {
    playerName = (
      <input type="text" required value={name} onChange={handeChange} />
    );
  }

  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {playerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleClick}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}

export default Player;
