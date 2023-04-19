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
        <br/>
        <h1>Congratulations, {props.winner.name}!</h1>
        <br/>
        <h2>You have won ${props.winner.score}</h2>
        <br/>
        {props.winner.prizes.length?
          <>
            <h2>and these are your prizes:</h2>
            <br/>
            <ul>
              {props.winner.prizes.map((prize, index) => <><li className="winner's_prizes" key={index}><h3>- A {prize}</h3></li></>)}
            </ul>
          </>
          :
          <><h3>Sorry. You didn't win any prizes, this time.</h3><br/></>
        }
        <br/>
        <button className="button" onClick={playAgain}>Play Again!</button>
        <br/>
        <br/>
        <button className="button" onClick={backHome}>Back to Home</button>
    </div>
  );
};
