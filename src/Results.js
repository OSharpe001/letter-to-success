import { useNavigate } from "react-router-dom";
import cheering_kids from "./assets/sounds/cheering_kids.m4a";
import cheering_crowd from "./assets/sounds/cheering_crowd.m4a";
import aww from "./assets/sounds/aww.m4a";
import { useState, useEffect } from "react";

export default function Results(props) {

  const [winner, setWinner] = useState(props.winner.name);
  const navigate = useNavigate();
  const cheerForMe = useEffect;
  const cheer1 = new Audio(cheering_kids);
  const cheer2 = new Audio(cheering_crowd);
  const sad = new Audio(aww);

  cheerForMe(() => {
    if (winner.indexOf("Computer")<0) {
        const randomNum = Math.random();
        randomNum>.5?cheer2.play():cheer1.play();
      } else {
        sad.play();
      }
  }, [winner]);

  const playAgain = () => {
    setWinner("");
    props.setWinner("");
    navigate("/settings");
  };

  const backHome = () => {
    setWinner("");
    props.setWinner("");
    navigate("/");
  };

  return (
    <div className="results-page">
      {props.winner.name.indexOf("Computer")<0?
        <>
          <br/>
          <h1>Congratulations, {props.winner.name}!</h1>
          <br/>
          <h2>You have won ${props.winner.score}</h2>
          <br/>
          {props.winner.prizes.length?
            <>
              <h2>and these are your prizes:</h2>
              <br/>
              {props.winner.prizes.map((prize, index) => <h3 key={index} className="winner's_prizes">- A {prize}</h3>)}
            </>
            :
            <><h3>Sorry. You didn't win any prizes, this time.</h3><br/></>
          }
        </>
        :
        <div className="loss">
          <h1><strong>Sorry, humans. You've Lost!</strong></h1>
        <br/>
          <h1>{props.winner.name} has won ${props.winner.score}!</h1>
          <br/>
          {props.winner.prizes.length?
            <>
              <h2>{props.winner.name}'s  prizes:</h2>
              <br/>
              {props.winner.prizes.map((prize, index) => <h3 key={index} className="winner's_prizes">- A {prize}</h3>)}
            </>
            :
            <><h3>{props.winner.name} didn't win any prizes, this time.</h3><br/></>
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
