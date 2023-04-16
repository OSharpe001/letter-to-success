import { useNavigate } from "react-router-dom";


export default function Results(props) {

  const navigate = useNavigate();

  const playAgain = () => {
    props.setWinner("");
    navigate("/settings");
  };

  const backHome = () => {
    props.setWinner("");
    navigate("/");
  };

  // console.log("RESULTS.JS' PROPS: ", props);

  return (
    <div className="results-page">
        <h1>Results</h1>
        <br/>
        <h2>Congratulations, {props.winner.name}!</h2>
        <br/>
        <p>You have won ${props.winner.score}</p>
        <br/>
        {props.winner.prizes.length?
          <>
            <p>and these are your prizes:</p>
            <br/>
            <ul>
              {props.winner.prizes.map((prize, index) => <li className="winner's_prizes" key={prize+index}>A {prize}</li>)}
            </ul>
          </>
          :
          <p>Sorry. You didn't win any prizes, this time.</p>
        }
        <br/>
        <button onClick={playAgain}>Play Again!</button>
        <br/>
        <button onClick={backHome}>Back to Home</button>
    </div>
  );
};
