// import { useState } from 'react'

export default function PlayerCard(props) {

    // const [playerName, setPlayerName] = useState("Player");
    // const [playerScore, setPlayerScore] =useState(0);
    // const [playerPrizes, setPlayerPrizes] = useState([]);
  return (
    <>
        <div>PlayerCard</div>
        <div className="player-name" >{props.name}</div>
        <div className="player-score" >{props.score}</div>
        <div className="player-prizes" >{props.prizes}</div>
    </>
  );
};
