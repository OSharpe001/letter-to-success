import { useState } from 'react'

export default function PlayerCard() {

    const [playerName, setPlayerName] = useState("Player");
    const [playerScore, setPlayerScore] =useState(0);
    const [playerPrizes, setPlayerPrizes] = useState([]);
  return (
    <>
        <div>PlayerCard</div>
        <div className="player-name" >{playerName}</div>
        <div className="player-score" >{playerScore}</div>
        <div className="player-prizes" >{playerPrizes}</div>
    </>
  );
};
