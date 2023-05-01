export default function PlayerCard(props) {

  return (

    <div className="players-box">
        <div className="player-name" >{props.name}</div>
        <div className="player-score" >$ {props.score}</div>
        <div className="player-prizes" >
          <ul>
            {props.prizes.map((prize,index) => {
            return <li key={index}>{prize}</li>
            })}
          </ul>
        </div>
    </div>
  );
};
