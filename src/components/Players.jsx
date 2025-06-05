import PlayerCard from './PlayerCard';

export default function Players({ players, currentPlayer}) {

  return (

    <ul className="players">
        {players && players.map(player =>
            <li key = {player.name} className={player.name===currentPlayer?"player turn":"player"}>
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
