import PlayerCard from './PlayerCard'

export default function Players(props) {
  return (
    <>
        <div>Players</div>
        <ul >
            {props.playerNames.map(player =>
                <li key = {player.name}>
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
