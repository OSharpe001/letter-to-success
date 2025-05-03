export default function PlayerCard({ name, score, prizes }) {

  return (

    <div className="players-box">
        <div className="player-name" >{name}</div>
        <div className="player-score" >$ {score}</div>
        <div className="player-prizes" >
          <ul>
            {prizes.map((prize,index) => {
            return <li key={index}>{prize}</li>
            })}
          </ul>
        </div>
    </div>
  );
};
