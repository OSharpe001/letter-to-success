import PlayerCard from './PlayerCard'

export default function Players(props) {

    console.log("PLAYERS.JS' PROPS: ", props);

  return (
    <ul className="players">
        {props.playerNames.map(player =>
            <li key = {player} className="player">
                <PlayerCard
                    name={player}
                    // score={player.score}
                    // prizes={player.prizes}
                />
            </li>
        )}
    </ul>
  );
};
