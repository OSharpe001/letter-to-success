

import PlayerCard from './PlayerCard';


export default function Players(props) {

    // console.log("PLAYERS.JS' PROPS.PLAYERS: ", props.players);
    // console.log("PLAYERS.JS' PROPS: ", props);

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
