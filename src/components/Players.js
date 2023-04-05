import PlayerCard from './PlayerCard'

export default function Players(props) {

    console.log("PLAYERS.JS' PROPS: ", props.playerNames)
  return (
    <>
        <h1>Players</h1>
        <ul className="players">
            {props.playerNames.map(player =>
                <li key = {player.name} >
                    <PlayerCard
                        name={player.name}
                        score={player.score}
                        prizes={player.prizes}
                    />
                </li>
            )}
        </ul>
    </>
  )
}
