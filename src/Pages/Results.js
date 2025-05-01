import { useNavigate } from "react-router-dom";

export default function Results({ setWinner, winner }) {

  const navigate = useNavigate();

  const playAgain = () => {
    setWinner("");
    navigate("/settings");
  };

  const backHome = () => {
    setWinner("");
    navigate("/");
  };

  return (
    <div className="results-page">
      {winner.name.indexOf("Computer")<0?
        <>
          <br/>
          <h1>Congratulations, {winner.name}!</h1>
          <br/>
          <h2>You have won ${winner.score}</h2>
          <br/>
          {winner.prizes.length?
            <>
              <h2>and these are your prizes:</h2>
              <br/>
              {winner.prizes.map((prize, index) => <h3 key={index} className="winner's_prizes">- A {prize}</h3>)}
            </>
            :
            <><h3>Sorry. You didn't win any prizes, this time.</h3><br/></>
          }
        </>
        :
        <div className="loss">
          <h1><strong>Sorry, humans. You've Lost!</strong></h1>
        <br/>
          <h1>{winner.name} has won ${winner.score}!</h1>
          <br/>
          {winner.prizes.length?
            <>
              <h2>{winner.name}'s  prizes:</h2>
              <br/>
              {winner.prizes.map((prize, index) => <h3 key={index} className="winner's_prizes">- A {prize}</h3>)}
            </>
            :
            <><h3>{winner.name} didn't win any prizes, this time.</h3><br/></>
          }
        </div>
      }
          <br/>
          <button className="button" onClick={playAgain}>Play Again!</button>
          <br/>
          <br/>
          <button className="button" onClick={backHome}>Back to Home</button>
    </div>
  );
};
