import { useState } from 'react'

export default function PlayerCard(props) {

    // const [playerName, setPlayerName] = useState("Player");
    const [playerScore, setPlayerScore] =useState(0);
    const [playerPrizes, setPlayerPrizes] = useState([]);

    // console.log("PLAYERCARD.JS' PROPS: ", props)


  return (
    <div className="players-box">
        <div className="player-name" >{props.name}</div>
        <div className="player-score" >$ {playerScore}</div>
        <div className="player-prizes" >{playerPrizes}</div>
    </div>
  );
};
