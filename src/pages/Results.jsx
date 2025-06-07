/* eslint-disable no-unused-vars */
import { Footer } from "../components";
import { newCar1, newCar2, newCar3, newCar4, newCar5, nightPlane } from "../assets/images";
import { fireworks } from "../assets/sounds"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export default function Results({ setWinner, winner, sound }) {

  const [currentCar, setCurrentCar] = useState([newCar1, newCar2, newCar3, newCar4, newCar5][Math.floor(Math.random() * 5)]);
  const [blazingFireworks, setBlazingFireworks] = useState(new Audio(fireworks));
  blazingFireworks.volume = .1;

  const navigate = useNavigate();

  const playAgain = () => {
    setWinner("");
    navigate("/settings");
  };

  const backHome = () => {
    setWinner("");
    navigate("/");
  };

  useEffect(() => {
    (sound && (winner && winner.name.indexOf("Computer") < 0)) && blazingFireworks.play();
    !winner && setTimeout(navigate, 100, ("/settings"));
  }, [winner, sound, blazingFireworks, navigate]);

  return (
    <div className="resultsPage">
      <div id="bkgnd" className="resultsPageLeftBkgnd">
        {<img
          className={`resultsPageLeftBkgndCar
            ${winner.prizes && winner.prizes.includes("New Car!") ?
              null
            :
              "hidden"}`}
          src={currentCar}
          alt="A new car"
        />}
      </div>
      <div id="bkgnd" className="resultsPageRightBkgnd">
        {<img
          className={`resultsPageRightBkgndPlane
            ${winner.prizes && winner.prizes.includes("Trip to Jamaica!") ?
              null
            :
              "hidden"}`}
          src={nightPlane}
          alt="An airplane"
        />}
      </div>
      {winner && winner.name.indexOf("Computer") < 0 &&
        <>
          <div className="fireworks1"></div>
          <div className="fireworks2"></div>
          <div className="fireworks3"></div>
        </>
      }
      <div className="results">
        {winner && winner.name.indexOf("Computer") < 0 ?
          <>
            <h1>Congratulations, {winner.name}!</h1>
            <h2>You have won ${winner.score}</h2>
            {winner.prizes && winner.prizes.length ?
              <>
                <h2>and these are your prizes:</h2>
                {winner.prizes.map((prize, index) => <h3 key={index} className="winner's_prizes">- A {prize}</h3>)}
              </>
              :
              <><h3>Sorry. You didn't win any prizes, this time.</h3></>
            }
          </>
          :
          <div className="loss">
            <h1><strong>Sorry, humans. You've Lost!</strong></h1>
            <h1>{winner.name} has won ${winner.score}!</h1>
            {winner.prizes && winner.prizes.length ?
              <>
                <h2>{winner.name}'s  prizes:</h2>
                {winner.prizes.map((prize, index) => <h3 key={index} className="winner's_prizes">- A {prize}</h3>)}
              </>
              :
              <><h3>{winner.name} didn't win any prizes, this time.</h3></>
            }
          </div>
        }
        <div>
          <button className="button" onClick={playAgain}>Play Again!</button>
          <button className="button" onClick={backHome}>Back to Home</button>
        </div>
      </div>
      <Footer />
    </div>
  );
};
