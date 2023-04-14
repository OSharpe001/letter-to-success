import PlayerCard from './PlayerCard';
// import { useState } from 'react';

export default function Players(props) {

    // const [playerScore, setPlayerScore] =useState(0);
    // const [playerPrizes, setPlayerPrizes] = useState([]);


    // console.log("PLAYERS.JS' PROPS.PLAYERS: ", props.players);
    console.log("PLAYERS.JS' PROPS: ", props);

  return (
    <ul className="players">
        {props.players.map(player =>
            <li key = {player.name} className={player.name===props.currentPlayer?"player turn":"player"}>
                <PlayerCard
                    name={player.name}
                    score={player.score}
                    prizes={player.prizes}
                />
            </li>
        )}
    </ul>
  );
};
