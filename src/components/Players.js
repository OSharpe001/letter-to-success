import PlayerCard from './PlayerCard'

export default function Players(props) {

    const computerPlayerAmount=parseInt(props.computer_player_amount);
    const computerPlayerNames=[];

    for (let i=0; i<computerPlayerAmount; i++) {
        computerPlayerNames.push("Computer"+(i+1))
        console.log("Computer"+(i+1))
    };

    console.log("PLAYERS.JS' PROPS: ", props);
    console.log("PLAYERS.JS' COMPUTERPLAYERAMOUNT: ", computerPlayerAmount);
    console.log("PLAYERS.JS' COMPUTERPLAYERNAMES: ", computerPlayerNames);

  return (
    <ul className="players">
        {props.playerNames.filter(player=>player!=="").map(player =>
            <li key = {player} className="player">
                <PlayerCard
                    name={player}
                    // score={player.score}
                    // prizes={player.prizes}
                />
            </li>
        )}
        {computerPlayerNames.map(player =>
            <li key = {player} className="player">
                <PlayerCard
                    name={player}
                    // score={player.score}
                    // prizes={player.prizes}
                />
            </li>
        )}
    </ul>
  )
}
